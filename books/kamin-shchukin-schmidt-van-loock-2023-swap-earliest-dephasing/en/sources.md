# Sources and further exploration

## This note and the original question

This explanation concerns Haobo Ma and Wenlin Zhang, *Earliest swapping for every chain length: Kamin et al. (2023), Section IV D 1, Eq. (41)*, version 1 (2026). [Version DOI: 10.5281/zenodo.23904476](https://doi.org/10.5281/zenodo.23904476). Licence: CC BY 4.0. Haobo Ma is affiliated with Chrono AI, Singapore; Wenlin Zhang with the National University of Singapore and Chrono AI, Singapore. Authors' recorded names are retained.

The original question is in L. Kamin, E. Shchukin, F. Schmidt and P. van Loock, *Exact rate analysis for quantum repeaters with imperfect memories and entanglement swapping as soon as possible*, Physical Review Research **5**, 023086 (2023), [DOI](https://doi.org/10.1103/PhysRevResearch.5.023086), [arXiv version](https://arxiv.org/abs/2203.10318v1). Section IV D 1, Eqs. (38)–(39), defines the recurrences; Eq. (41), p. 023086-13, asks the all-length question. Section IV D 5, p. 023086-16, discusses mean cost and exponential attenuation.

Related noise formulas appear in K. Goodenough, T. Coopmans and D. Towsley, *On noise in swap ASAP repeater chains: exact analytics, distributions and tight approximations*, Quantum **9**, 1744 (2025), [DOI](https://doi.org/10.22331/q-2025-05-15-1744), [arXiv version](https://arxiv.org/abs/2404.07146v5), Section 3.1. Their roughness plus endpoint term corresponds to $2P$ here.

## What can be checked, and what comes next

The [Lean source for natural readiness times](https://github.com/the-omega-institute/trureturing/blob/8a24ea4e79de962725aab9d9b49cc605fcc211d8/D5/S3/Quantum/Optimization/SwapEarliestDephasingOptimality.lean#L279) proves that every complete earliest history achieves the Bellman optimum, including arbitrary ties, zero times and the empty list. The full real-time potential and exact-slack statement, and the two probability corollaries, are supported by the manuscript's written proofs reproduced in this explanation.

The remaining formalizations are registered in the shared public coordination queue:

- [Real-time potential and exact optimal-history slack](https://github.com/the-omega-institute/trureturing-requests/issues/183): reuse the natural-number proof mechanism, extend the domain to real times and expose the full zero-slack characterization.
- [Pathwise comparison and expected retention](https://github.com/the-omega-institute/trureturing-requests/issues/184): build measurable policies and expectation comparisons on that result.
- [Mean optimum for independent geometric times](https://github.com/the-omega-institute/trureturing-requests/issues/185): reuse the potential formula and formalize its tail-sum calculation; the exponential corollary is not a prerequisite.

To contribute a formalization, coordinate its precise scope on the matching request, develop a focused branch in your own fork and submit directly to upstream dev under the [upstream contribution rules](https://github.com/the-omega-institute/trureturing/blob/dev/docs/CONTRIBUTING.md). The requests link the exact public manuscript and existing prerequisites.

For a pencil-and-paper exploration, compute the left and right slack for every possible first move of $(1,2,4,3)$. Which first moves can lead to an optimum even though they are not earliest? The characterization in [Precise results](statements.md) checks your answer.
