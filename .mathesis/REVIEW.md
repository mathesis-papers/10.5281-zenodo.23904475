# 逐项陈述比较

检查提交为完整钉版 `8a24ea4e79de962725aab9d9b49cc605fcc211d8`。实际读取公开 Lean 源码、对应 Blueprint 与 Golden/Frozen/state；声明 `result` 的种类为 theorem，模块 statement_id 为 `sha256:c16720c4f167131679c49832730a11fa931e701180637006b0f2f43b57f14197`。通过公共树搜索 swap、dephasing、attenuation、geometric 相关模块，未找到覆盖更广陈述的匹配声明；不是用旧锁缺少条目来推断缺证。通过已安装 pin --refresh 在同一提交解析书中引用。

| Result | Verdict | Compared declaration | Commit | Scope |
|---|---|---|---|---|
| thm-main | special case | D5/S3/Quantum/Optimization/SwapEarliestDephasingOptimality.result | 8a24ea4e79de962725aab9d9b49cc605fcc211d8 | 原稿 Theorem 1（第二节）是所有 n≥1、非负实数时刻的 D*=P、所有并列贪心历史、显式非负松弛量、任意历史额外成本恒等式及最优 iff。公开 result 只量化 List ℕ 与完整 IsGreedyRun，结论 runCost=dstar。实际自然数域的私有势函数引理也不能覆盖实数域或完整显式 slack/iff；故声明仅覆盖原稿一个限制子句。书面证明与请求 #183 保留全部原稿内容。 |
| thm-natural | same | D5/S3/Quantum/Optimization/SwapEarliestDephasingOptimality.result | 8a24ea4e79de962725aab9d9b49cc605fcc211d8 | 与 result : claim 相同。claim 展开为对所有 x : List ℕ、hs : List ℕ，IsGreedyRun x hs → runCost x hs = dstar x。IsGreedyStep 要求零基有效索引和对所有有效对的最大值弱最小性；foldr 递归检查每一步并要求末态 length≤1；bellman 在 length≤1 时为零，否则对所有有效首步取 inf；dstar 为从零函数开始的 length 次迭代。合并用 take/max/drop，成本 max−min 等于绝对差。包含空列表、单元素、零时刻、任意并列。与 thm-main 共用 s1，仅表示其自然数贪心最优子句；不把这行当作完整 s1 的覆盖。 |
| cor-attenuation | none | — | 8a24ea4e79de962725aab9d9b49cc605fcc211d8 | 原稿 Corollary 2（第三节，共用计数器）涉及任意联合实数分布、同一实现及额外策略随机性、所有 α≥0 的指数期望，以及可积成本均值。公开自然数 result 无概率空间、可测性、实数域或期望结论；没有匹配声明。数学上由逐实现定理及单调性推出，请求 #184 复用 #183，不重复请求合并构造。 |
| cor-mean | none | — | 8a24ea4e79de962725aab9d9b49cc605fcc211d8 | 原稿 Corollary 3（第三节）涉及 n≥1、p∈(0,1] 的独立同参数几何变量（支集正整数）及精确期望公式。公开 result 没有几何分布、尾和或期望计算；没有匹配声明。所需前提是势函数恒等式，不依赖 cor-attenuation；请求 #185 复用该前提。检查 n=1、p=1、q^0=1、有限 j 求和与收敛几何级数的换序。 |

版本 DOI 为 `10.5281/zenodo.23904476`；概念 DOI `10.5281/zenodo.23904475` 不替代本版引文。原稿第一段形式源码的历史提交为 `83b70a1d0d6a58bb32521c741805d845d401c5f8`，保留冻结记录；当前书引用按以上完整钉版检查。Lean 源中私有引理不作为猜造的公共 GID。上述对应关系来自源码检查，不提升平台回执或 frozen catalog 状态。
