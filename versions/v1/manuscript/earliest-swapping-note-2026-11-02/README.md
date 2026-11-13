# Earliest swapping for every chain length

This package gives a complete proof of the earliest-swapping conjecture in
Kamin et al. (2023), Section IV D 1, Eq. (41), for every chain length and
every greedy tie choice. It also proves the real-time extension, an exact
history-slack identity, a geometric-mean formula, and the fixed-readiness
exponential-attenuation consequence in Section IV D 5.

## Contents

- `note.tex`: self-contained LaTeX with an embedded bibliography.
- `note.pdf`: readable mathematical note.
- `metadata.json`: scientific metadata and exact problem identifier.
- `verify.py`: exact finite comparisons using only the Python standard library.
- `verification.json`: the finite checks and their ranges.
- `LICENSE.txt`: licensing information.

## Build

Use Tectonic 0.17.0:

```sh
tectonic --untrusted note.tex
```

Alternatively, use a LaTeX installation containing `geometry`, `lmodern`,
`amsmath`, `amssymb`, `amsthm`, `booktabs`, `array`, `xurl`, and `hyperref`:

```sh
pdflatex -no-shell-escape note.tex
pdflatex -no-shell-escape note.tex
```

The bibliography is embedded; BibTeX is not required. Run the finite checks
with Python 3.10 or later:

```sh
python3 verify.py --output verification.json
```

Expected coverage: 87,381 integer vectors, 5,461 rational vectors, all 40,320
permutations of eight distinct ranks, and 18 exact rational comparisons of
the geometric-mean formula with bounded-remainder tail sums. Every suite
has `status: "pass"`.

## Proof coverage

The declaration
`D5.S3.Quantum.Optimization.SwapEarliestDephasingOptimality.result`
in the pinned formal source proves natural-number optimality for every
complete greedy history, including arbitrary ties. Its private lemmas
`dstar_potential` and `greedy_cost_potential` identify the optimal and greedy
costs with the potential. Source:

https://github.com/the-omega-institute/trureturing/blob/83b70a1d0d6a58bb32521c741805d845d401c5f8/D5/S3/Quantum/Optimization/SwapEarliestDephasingOptimality.lean

The real-time, exact-slack and probabilistic statements are supported by
the written proofs in `note.pdf`. The program checks the finite domains
listed above; it is not a replacement for the general proof. Comparisons
between distribution schedules, memory cutoffs, or probabilistic swaps
use different models.

## Creators and license

Haobo Ma (ChronoAI Pte Ltd, Singapore), followed by Wenlin Zhang
(National University of Singapore; ChronoAI Pte Ltd, Singapore).
CC BY 4.0 (`cc-by-4.0`), as specified in `LICENSE.txt`.
