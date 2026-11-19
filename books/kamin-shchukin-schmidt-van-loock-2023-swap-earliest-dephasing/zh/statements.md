# 精确结论与完整证明

本章按原稿的 Theorem 1、Corollary 2、Corollary 3 说明结果。下面的自然数结论是 Theorem 1 中贪心最优性部分的限制版本，单独列出以精确说明形式证据；它不替代完整实数结论。原稿各结果共用同一编号计数器。

## 模型与势函数

设 $n\geq1$，$x\in\mathbb R_{\geq0}^n$。允许的第 $i$ 个合并及其成本为

$$
T_i x=(x_1,\ldots,x_{i-1},\max(x_i,x_{i+1}),x_{i+2},\ldots,x_n),
$$

$$
c_i(x)=|x_i-x_{i+1}|,\qquad 1\leq i<n.
$$

完整历史 $H$ 由 $n-1$ 个有效合并构成；$C_H(x)$ 是它们的成本之和。令 $D^{\star}(x)=\min_H C_H(x)$，单元素列表时为零。历史的选择集合有限且非空，故最小值存在。最早（贪心）历史每步选择使 $\max(x_i,x_{i+1})$ 最小的有效 $i$，并列任选。

记 $M(x)=\max_jx_j$，以及

$$
P(x)=M(x)+\sum_{j=1}^{n-1}\max(x_j,x_{j+1})-\sum_{j=1}^n x_j.
$$

由 $2\max(u,v)=u+v+|u-v|$，有

$$
2P(x)=2M(x)-x_1-x_n+\sum_{j=1}^{n-1}|x_j-x_{j+1}|.
$$

这也说明 $P(x)\geq0$，单元素时为零。

## 所有链长与精确额外成本

::: {.theorem #thm-main title="实数准备时刻的最优性与松弛量" status="written-proof" proof="pf-main" doi="10.5281/zenodo.23904476" source="Theorem 1 (Section 2)" request="https://github.com/the-omega-institute/trureturing-requests/issues/183" mathesis="collected:kamin-shchukin-schmidt-van-loock-2023-swap-earliest-dephasing:1:s1"}
对每个 $n\geq1$ 和 $x\in\mathbb R_{\geq0}^n$，都有 $D^{\star}(x)=P(x)$，且每个完整贪心历史均达到此值，与并列选择无关。更一般地，设 $x^{(0)}=x$、$x^{(s+1)}=T_{i_s}x^{(s)}$ 是任意完整历史，则

$$
\begin{aligned}
C_H(x)-P(x)&=\sum_{s=0}^{n-2}\delta_{i_s}(x^{(s)}),\\
\delta_i(x)&\geq0.
\end{aligned}
$$

对当前列表，写 $a=x_i$、$b=x_{i+1}$、$m=\max(a,b)$。左邻居存在时记为 $l=x_{i-1}$，右邻居存在时记为 $r=x_{i+2}$。松弛量为

$$
\delta_i(x)=L_i(x)+R_i(x),
$$

$$
L_i(x)=\max(l,m)-\max(l,a)
$$

用于 $i>1$；$i=1$ 时令 $L_i(x)=0$。同样，

$$
R_i(x)=\max(m,r)-\max(b,r)
$$

用于 $i+1<n$；$i+1=n$ 时令 $R_i(x)=0$。

一个完整历史最优，当且仅当其每一步松弛量都为零。$n=1$ 时求和为空，结论仍成立。
:::

::: {.proof #pf-main}
这是 Ma 与 Zhang 原稿第二节 Theorem 1 的证明。合并保持全局最大值。相邻最大值之和去掉中央项 $m$，左、右邻项的改变量分别是 $L_i,R_i$，所以总改变量为 $-m+\delta_i(x)$。各项之和的改变量是 $m-a-b$。两者相减得到

$$
\begin{aligned}
P(T_i x)-P(x)&=\delta_i(x)+a+b-2m\\
&=\delta_i(x)-|a-b|.
\end{aligned}
$$

因为 $m\geq a,b$，两个邻项差都非负。若 $i$ 为贪心选择，存在左邻居时，与左边那一对比较得 $m\leq\max(x_{i-1},a)$；再用 $m\geq a$，可知 $\max(x_{i-1},m)=\max(x_{i-1},a)$。同理右边的两个最大值相等。因此贪心步的松弛量为零。这些是弱不等式，零时刻及并列均无例外；缺失邻居的端点项定义为零。

将一步恒等式沿历史求和，所有中间势函数抵消，终端单元素的势函数为零，于是得到精确额外成本等式。每个历史成本至少为 $P(x)$。每个长度大于一的有限列表都有相邻对最大值的最小者，每次合并使长度减一，所以总能构成完整贪心历史；它每步松弛量为零，成本等于 $P(x)$。故该值是最优值。有限个非负数之和为零当且仅当每个数都为零，给出最优历史的充要条件。
:::

## 自然数结论的形式证据

::: {.theorem #thm-natural title="自然数列表上的最早交换" lean="D5/S3/Quantum/Optimization/SwapEarliestDephasingOptimality.result" mathesis="collected:kamin-shchukin-schmidt-van-loock-2023-swap-earliest-dephasing:1:s1"}
对任意有限自然数列表 $x$（允许空列表）以及任意完整贪心合并历史 $H$，历史总成本等于以同一合并与成本定义的 Bellman 最优值。Bellman 递推对长度至多一的列表取零，其余列表取所有有效第一步的“本步成本加剩余最优值”的最小值。任意并列选择均被允许。
:::

::: proof
[所钉形式源码](lean:D5/S3/Quantum/Optimization/SwapEarliestDephasingOptimality.result)对上述自然数命题给出内核证明：用整数值势函数分别表示 Bellman 值和任意完整贪心历史成本，再令二者相等。每个有效合并使列表长度减一，因此从零函数开始、迭代列表长度次的 Bellman 定义已足够。自然数包含零；空列表和单元素列表的成本均为零。

对于非空自然数列表，此环境正好是前一个实数结论中贪心最优性部分的限制。前一个环境还包含实数域、显式松弛量和最优历史的充要条件；后面的概率结论也有额外内容，它们的书面证明分别列出。
:::

## 随机准备时刻与保留因子

::: {.corollary #cor-attenuation title="逐实现最优性与期望保留因子" status="written-proof" proof="pf-attenuation" doi="10.5281/zenodo.23904476" source="Corollary 2 (Section 3)" request="https://github.com/the-omega-institute/trureturing-requests/issues/184" mathesis="collected:kamin-shchukin-schmidt-van-loock-2023-swap-earliest-dephasing:1:s2"}
固定 $n\geq1$。令 $X$ 在 $\mathbb R_{\geq0}^n$ 上具有任意联合分布。比较同一实现的完整历史，允许竞争策略使用额外随机性；策略与成本按可测方式选择。对每个 $\alpha\geq0$，

$$
C_{\mathrm{greedy}}(X)=P(X)\leq C_H(X),
$$

$$
\mathbb E e^{-\alpha C_{\mathrm{greedy}}(X)}
\geq\mathbb E e^{-\alpha C_H(X)}.
$$

成本可积时，还有 $\mathbb E C_{\mathrm{greedy}}(X)\leq\mathbb E C_H(X)$。指数因子比较不需要成本可积，也不要求各时刻独立或同分布。
:::

::: {.proof #pf-attenuation}
这是原稿第三节 Corollary 2 的推论。固定准备时刻及策略的额外随机选择后，Theorem 1 对选出的每个完整历史都成立。函数 $t\mapsto e^{-\alpha t}$ 在 $\alpha\geq0$ 时单调不增，应用它后不等号反向，再取期望。由于成本非负，指数因子属于 $[0,1]$，所以期望存在。可积时直接对成本不等式取期望，得到最后的比较。$\alpha=0$ 时两个因子都等于一；$n=1$ 时两个成本都等于零。
:::

## 几何准备时间 {#geometric-times}

::: {.corollary #cor-mean title="独立几何准备时刻的平均最优成本" status="written-proof" proof="pf-mean" doi="10.5281/zenodo.23904476" source="Corollary 3 (Section 3)" request="https://github.com/the-omega-institute/trureturing-requests/issues/185" mathesis="collected:kamin-shchukin-schmidt-van-loock-2023-swap-earliest-dephasing:1:s3"}
设 $n\geq1$，$X_1,\ldots,X_n$ 独立，且均为成功概率 $p\in(0,1]$、支集 $\{1,2,\ldots\}$ 的几何随机变量。令 $q=1-p$，则

$$
A_n(p)=\sum_{j=1}^{n}\frac{(-1)^{j+1}\binom nj}{1-q^j},
$$

$$
\mathbb E D^{\star}(X)=A_n(p)+\frac{n-2}{p}-\frac{n-1}{p(2-p)}.
$$

:::

::: {.proof #pf-mean}
这是原稿第三节 Corollary 3 的计算。约定 $q^0=1$，包括 $q=0$。对整数 $k\geq0$，$\Pr(X_i>k)=q^k$；独立性给出 $\Pr(M\leq k)=(1-q^k)^n$。非负整数随机变量的均值等于其尾概率之和，因此

$$
\mathbb E M=\sum_{k=0}^{\infty}[1-(1-q^k)^n].
$$

二项式展开括号，得到 $j=1,\ldots,n$ 的有限和。因 $0\leq q<1$，每个几何级数收敛，有限求和可与级数互换，故

$$
\mathbb E M=\sum_{j=1}^n(-1)^{j+1}\binom nj\sum_{k=0}^{\infty}q^{kj}=A_n(p).
$$

此外 $\mathbb E X_i=1/p$。对两个独立坐标，尾概率为 $\Pr(\min(X_1,X_2)>k)=q^{2k}$，所以

$$
\mathbb E\min(X_1,X_2)=\frac{1}{1-q^2}=\frac{1}{p(2-p)},
$$

$$
\mathbb E\max(X_1,X_2)=\frac{2}{p}-\frac{1}{p(2-p)}.
$$

最后对势函数取期望：最大值贡献 $A_n(p)$，$n-1$ 对邻居贡献上式，$n$ 个坐标贡献 $-n/p$，整理即得结论。可积性由 $M\leq\sum_iX_i$ 及有限个可积项保证。$n=1$ 时没有邻居项，均值为零；$p=1$ 时所有准备时刻为一，公式也为零。
:::

## 归一化与适用边界

势函数的变差表达式表明，Goodenough、Coopmans 与 Towsley 在其第三节 3.1 中给出的粗糙度项 $\sum|x_j-x_{j+1}|$ 加上端点等待项 $2M-x_1-x_n$ 恰为 $2P(x)$。只保留粗糙度会改变目标函数。例如单调列表的粗糙度为最大值减最小值，端点项也为同一个数，从而 $P$ 是这个范围。

上述推导回答 Kamin 等人第四节 D 5 在同一准备时刻递推内提出的平均退相干与指数保留因子问题。不同分发或测量方案的最优密钥率、记忆截止、概率交换等，还改变了准备时刻分布、存储方式或目标，不由这些结论推出。
