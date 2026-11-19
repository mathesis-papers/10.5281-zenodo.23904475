<style>pre:has(> code[class*="typst"]) { display: none; }</style>

# 来源与继续探索

## 本文与原始问题

本讲解对应 Haobo Ma、Wenlin Zhang 的 *Earliest swapping for every chain length: Kamin et al. (2023), Section IV D 1, Eq. (41)*，第 1 版，2026。[版本 DOI：10.5281/zenodo.23904476](https://doi.org/10.5281/zenodo.23904476)。许可为 CC BY 4.0。Haobo Ma 的机构为 Chrono AI（Singapore）；Wenlin Zhang 的机构为 National University of Singapore 与 Chrono AI（Singapore）。保留作者记录中的姓名。

原始问题见 L. Kamin、E. Shchukin、F. Schmidt、P. van Loock，*Exact rate analysis for quantum repeaters with imperfect memories and entanglement swapping as soon as possible*，Physical Review Research **5**, 023086 (2023)，[DOI](https://doi.org/10.1103/PhysRevResearch.5.023086)，[arXiv 版本](https://arxiv.org/abs/2203.10318v1)。第四节 D 1 的式 (38)–(39) 给出递推，式 (41)、第 023086-13 页提出所有链长的猜想；第四节 D 5、第 023086-16 页讨论平均成本与指数因子。

相关噪声公式见 K. Goodenough、T. Coopmans、D. Towsley，*On noise in swap ASAP repeater chains: exact analytics, distributions and tight approximations*，Quantum **9**, 1744 (2025)，[DOI](https://doi.org/10.22331/q-2025-05-15-1744)，[arXiv 版本](https://arxiv.org/abs/2404.07146v5)，第三节 3.1。其粗糙度与端点项之和对应这里的 $2P$。

## 可以检查什么，接着做什么

[自然数结论的 Lean 源码](https://github.com/the-omega-institute/trureturing/blob/8a24ea4e79de962725aab9d9b49cc605fcc211d8/D5/S3/Quantum/Optimization/SwapEarliestDephasingOptimality.lean#L279)证明每个完整最早历史达到 Bellman 最优值，包含任意并列选择、零时刻及空列表。完整实数势函数与精确松弛量结论，以及两个概率推论，由本讲解逐项给出的原稿书面证明支持。

剩余形式化分别在同一个公共协作队列登记：

- [实数势函数与最优历史的精确松弛量](https://github.com/the-omega-institute/trureturing-requests/issues/183)：复用自然数证明机制，推广到实数并给出全部零松弛量条件。
- [逐实现比较与期望保留因子](https://github.com/the-omega-institute/trureturing-requests/issues/184)：在上述结论上建立可测策略和期望比较。
- [独立几何时刻的平均最优成本](https://github.com/the-omega-institute/trureturing-requests/issues/185)：复用势函数公式并形式化尾和计算；不依赖指数因子推论。

若愿意贡献形式化，可在对应请求中协调具体范围，在自己的 fork 中建立聚焦分支，按[上游贡献规则](https://github.com/the-omega-institute/trureturing/blob/dev/docs/CONTRIBUTING.md)向上游 dev 提交 PR。请求列有确切公开原稿和已有前提。

一个适合先用纸笔探索的问题是：对 $(1,2,4,3)$ 的每个可能第一步，算出左右松弛量。哪些第一步虽然不是最早，却仍能接上最优历史？[精确结论](statements.md)中的充要条件可以检查你的答案。

```{=typst}
#pagebreak()
```
