# Earliest swapping for every chain length: Kamin et al. (2023), Section IV D 1, Eq. (41)

**Authors:** Haobo Ma, Wenlin Zhang

The all-length earliest-swapping conjecture in Section IV D 1, Eq. (41), of Kamin, Shchukin, Schmidt and van Loock (2023) states that repeatedly merging an adjacent pair with smallest maximum ready time minimizes total dephasing. We give a self-contained potential proof for arbitrary nonnegative real ready times and every tie choice. The optimum is the largest ready time plus the sum of adjacent maxima minus the sum of ready times. An exact nonnegative slack formula characterizes all optimal histories. The pathwise inequality also answers the exponential-dephasing question in Section IV D 5, for the same fixed-readiness swapping model: earliest swapping simultaneously minimizes expected dephasing and maximizes every expected exponential attenuation factor.

- PDF: [frozen public file](paper.pdf)
- DOI: [https://doi.org/10.5281/zenodo.23904476](https://doi.org/10.5281/zenodo.23904476)
- Concept DOI: [https://doi.org/10.5281/zenodo.23904475](https://doi.org/10.5281/zenodo.23904475)
- License: CC-BY-4.0
- Version: 1
- Mathesis record: [kamin-shchukin-schmidt-van-loock-2023-swap-earliest-dephasing](https://mathesis-omega-research.apps.chrono-ai.fun/papers/kamin-shchukin-schmidt-van-loock-2023-swap-earliest-dephasing?version=1)

## How to cite

Haobo Ma, Wenlin Zhang (2026). Earliest swapping for every chain length: Kamin et al. (2023), Section IV D 1, Eq. (41). Mathesis, version 1. https://doi.org/10.5281/zenodo.23904476

## Statement progress

| Statement | Formalization status | Source | Verification basis |
|---|---|---|---|
| Theorem (s1) | needs_attention | [Lean source](https://github.com/the-omega-institute/trureturing/blob/83b70a1d0d6a58bb32521c741805d845d401c5f8/D5/S3/Quantum/Optimization/SwapEarliestDephasingOptimality.lean) | No public receipt |
| Corollary (s2) | needs_attention | [Lean source](https://github.com/the-omega-institute/trureturing/blob/83b70a1d0d6a58bb32521c741805d845d401c5f8/D5/S3/Quantum/Optimization/SwapEarliestDephasingOptimality.lean) | No public receipt |
| Corollary (s3) | needs_attention | [Lean source](https://github.com/the-omega-institute/trureturing/blob/83b70a1d0d6a58bb32521c741805d845d401c5f8/D5/S3/Quantum/Optimization/SwapEarliestDephasingOptimality.lean) | No public receipt |

## Contributions

Original authors are listed above. Formalization contributors and attribution are retained in `formalization/nodes.json`; repository pull requests do not confer verification or credit. Submit formalization attempts through the Mathesis attempt path described in [CONTRIBUTING.md](CONTRIBUTING.md).
