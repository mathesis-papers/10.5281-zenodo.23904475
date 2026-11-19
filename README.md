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

<!-- Mathesis generated repository guide; refresh with paper.py front. -->

## Reading and materials

[Paper site](https://papers.trureturing.org/10.5281-zenodo.23904475/) · [Frozen PDF](paper.pdf) · [Citation](CITATION.cff)

[中文阅读](https://papers.trureturing.org/10.5281-zenodo.23904475/kamin-shchukin-schmidt-van-loock-2023-swap-earliest-dephasing/zh/) · [Read in English](https://papers.trureturing.org/10.5281-zenodo.23904475/kamin-shchukin-schmidt-van-loock-2023-swap-earliest-dephasing/en/)

[Slides](https://papers.trureturing.org/10.5281-zenodo.23904475/kamin-shchukin-schmidt-van-loock-2023-swap-earliest-dephasing/slides/) ([sources](books/kamin-shchukin-schmidt-van-loock-2023-swap-earliest-dephasing/slides/)) · [Videos](https://papers.trureturing.org/10.5281-zenodo.23904475/kamin-shchukin-schmidt-van-loock-2023-swap-earliest-dephasing/films/) ([sources](books/kamin-shchukin-schmidt-van-loock-2023-swap-earliest-dephasing/films/))

These are publication routes; available built materials are inventoried in [mathesis-materials.json](https://papers.trureturing.org/10.5281-zenodo.23904475/mathesis-materials.json).

## Book and formalization

Catalog formalization status above is separate from the statement comparisons below. A nearby declaration does not verify the complete written result.

| Book result | Comparison with formal base | Compared declaration |
|---|---|---|
| `thm-main` | special case | `D5/S3/Quantum/Optimization/SwapEarliestDephasingOptimality.result` |
| `thm-natural` | same | `D5/S3/Quantum/Optimization/SwapEarliestDephasingOptimality.result` |
| `cor-attenuation` | none | — |
| `cor-mean` | none | — |

Book stage: **complete**; 0 pending claims. [Statement comparisons](.mathesis/REVIEW.md).

## Repository map

| Zone | Location |
|---|---|
| Paper record | `paper.json`, `CITATION.cff`, `paper.pdf`, `manuscript/`, `formalization/nodes.json`, `LICENSES/`, `.mathesis/` |
| Content | `books/kamin-shchukin-schmidt-van-loock-2023-swap-earliest-dephasing/`: Chinese/English text, figures, visualizations, videos, slides, assets |
| Machinery | Upstream and layer managed paths; update with `tbook template update` |
| Repository front | This README, changelog, contribution guide, licence, project/site/pin configuration, `template.d/` |

See [the enforced layout](docs/layer-mathesis/LAYOUT.md). Preparation run records and built outputs stay outside the committed tree.
