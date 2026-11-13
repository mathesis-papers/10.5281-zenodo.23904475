import argparse
from fractions import Fraction
from functools import cache
from itertools import permutations, product
import json
from pathlib import Path


def merge(values, index):
    return values[:index] + (max(values[index:index + 2]),) + values[index + 2:]


def potential(values):
    if not values:
        return 0
    return max(values) + sum(max(left, right) for left, right in zip(values, values[1:])) - sum(values)


def variation_formula(values):
    if not values:
        return 0
    return Fraction(2 * max(values) - values[0] - values[-1] +
                    sum(abs(left - right) for left, right in zip(values, values[1:]))) / 2


def slack(values, index):
    left, right = values[index:index + 2]
    maximum = max(left, right)
    increment = 0
    if index:
        neighbor = values[index - 1]
        increment += max(neighbor, maximum) - max(neighbor, left)
    if index + 2 < len(values):
        neighbor = values[index + 2]
        increment += max(maximum, neighbor) - max(right, neighbor)
    return increment


@cache
def bellman_and_greedy(values):
    if len(values) < 2:
        return (0, 0, 0)
    earliest = min(max(values[index:index + 2]) for index in range(len(values) - 1))
    totals = []
    greedy_lows = []
    greedy_highs = []
    for index in range(len(values) - 1):
        immediate = abs(values[index] - values[index + 1])
        optimum, low, high = bellman_and_greedy(merge(values, index))
        totals.append(immediate + optimum)
        if max(values[index:index + 2]) == earliest:
            greedy_lows.append(immediate + low)
            greedy_highs.append(immediate + high)
    return min(totals), min(greedy_lows), max(greedy_highs)


def check_vector(values):
    expected = potential(values)
    optimum, greedy_low, greedy_high = bellman_and_greedy(values)
    assert optimum == greedy_low == greedy_high == expected, values
    assert 2 * expected == 2 * variation_formula(values), values
    assert expected >= 0, values
    for index in range(len(values) - 1):
        reduced = merge(values, index)
        immediate = abs(values[index] - values[index + 1])
        increment = slack(values, index)
        assert increment >= 0, (values, index)
        assert immediate + potential(reduced) - expected == increment, (values, index)
        assert (immediate + bellman_and_greedy(reduced)[0] == optimum) == (increment == 0)
    return max(len(values) - 1, 0)


def finite_suite(label, alphabet, maximum_length):
    vector_count = 0
    transition_count = 0
    for length in range(maximum_length + 1):
        for values in product(alphabet, repeat=length):
            transition_count += check_vector(values)
            vector_count += 1
    details = {
        'name': label,
        'alphabet': [str(value) for value in alphabet],
        'maximum_length': maximum_length,
        'vectors': vector_count,
        'first_merge_transitions': transition_count,
        'status': 'pass',
    }
    bellman_and_greedy.cache_clear()
    return details


def check_geometric_mean():
    checks = []
    for length in range(1, 7):
        for probability in (Fraction(1, 3), Fraction(1, 2), Fraction(1)):
            failure = 1 - probability
            maximum_mean = sum(
                Fraction((-1) ** (index + 1) * binomial(length, index), 1) /
                (1 - failure ** index) for index in range(1, length + 1)
            )
            formula = maximum_mean + (length - 2) / probability - (length - 1) / (probability * (2 - probability))
            prefix = 80
            direct_maximum = sum(1 - (1 - failure ** time) ** length for time in range(prefix))
            direct_single = sum(failure ** time for time in range(prefix))
            direct_pair_minimum = sum(failure ** (2 * time) for time in range(prefix))
            direct_mean = direct_maximum + (length - 2) * direct_single - (length - 1) * direct_pair_minimum
            tail_bound = (
                (length + abs(length - 2)) * failure ** prefix / probability +
                (length - 1) * failure ** (2 * prefix) / (1 - failure ** 2)
            )
            assert abs(formula - direct_mean) <= tail_bound
            assert formula >= 0
            checks.append({'length': length, 'p': str(probability), 'expected_cost': str(formula)})
    return {'status': 'pass', 'exact_rational_comparisons': len(checks),
            'tail_terms': 80, 'values': checks}


def binomial(total, chosen):
    from math import comb
    return comb(total, chosen)


def main():
    parser = argparse.ArgumentParser(description='Exact finite checks of adjacent-merge dephasing identities.')
    parser.add_argument('--output', type=Path)
    arguments = parser.parse_args()
    suites = [
        finite_suite('integer ties', (0, 1, 2, 3), 8),
        finite_suite('rational ready times', (Fraction(0), Fraction(1, 3), Fraction(1, 2), Fraction(2)), 6),
    ]
    transitions = 0
    vectors = 0
    for values in permutations(range(8)):
        transitions += check_vector(values)
        vectors += 1
    suites.append({'name': 'eight distinct readiness ranks', 'vectors': vectors,
                   'first_merge_transitions': transitions, 'status': 'pass'})
    bellman_and_greedy.cache_clear()
    example = (1, 2, 4, 3)
    assert max(example[2:]) > min(max(example[index:index + 2]) for index in range(3))
    assert abs(example[2] - example[3]) + bellman_and_greedy(merge(example, 2))[0] == potential(example) == 4
    result = {
        'schema_version': 1,
        'statement': 'Finite exact checks of the Bellman optimum, every greedy tie continuation, the variation formula, and every first-merge slack.',
        'arithmetic': 'integer and fractions.Fraction throughout',
        'suites': suites,
        'geometric_mean': check_geometric_mean(),
        'non_greedy_optimal_example': {'ready_times': list(example), 'first_pair_zero_based': 2, 'cost': 4},
        'coverage': 'The general real-time theorem and its probabilistic corollaries are established by the written proofs in note.pdf. These enumerations check the listed finite domains.',
    }
    text = json.dumps(result, indent=2) + '\n'
    if arguments.output:
        arguments.output.write_text(text)
    print(text, end='')


if __name__ == '__main__':
    main()
