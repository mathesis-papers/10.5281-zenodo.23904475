# Precise results and complete proofs

This chapter follows the manuscript's Theorem 1, Corollary 2 and Corollary 3. The natural-number result is listed separately as the restriction of the greedy-optimality clause of Theorem 1 that has matching formal evidence. It does not replace the full real-time theorem. The original theorem and corollaries share one numbering counter.

## Model and potential

Let $n\geq1$ and $x\in\mathbb R_{\geq0}^n$. A valid merge and its cost are

$$
T_i x=(x_1,\ldots,x_{i-1},\max(x_i,x_{i+1}),x_{i+2},\ldots,x_n),
$$

$$
c_i(x)=|x_i-x_{i+1}|,\qquad 1\leq i<n.
$$

A complete history $H$ makes $n-1$ valid merges; $C_H(x)$ is their total cost. Set $D^{\star}(x)=\min_H C_H(x)$, with value zero on a singleton. The set of histories is finite and nonempty, so this minimum exists. An earliest, or greedy, history chooses at each step a valid $i$ minimizing $\max(x_i,x_{i+1})$, with arbitrary ties.

Write $M(x)=\max_jx_j$ and

$$
P(x)=M(x)+\sum_{j=1}^{n-1}\max(x_j,x_{j+1})-\sum_{j=1}^n x_j.
$$

The identity $2\max(u,v)=u+v+|u-v|$ gives

$$
2P(x)=2M(x)-x_1-x_n+\sum_{j=1}^{n-1}|x_j-x_{j+1}|.
$$

In particular, $P(x)\geq0$, and a singleton has potential zero.

## Every chain length and exact excess cost

::: {.theorem #thm-main title="Real-time optimality and exact slack" status="written-proof" proof="pf-main" doi="10.5281/zenodo.23904476" source="Theorem 1 (Section 2)" request="https://github.com/the-omega-institute/trureturing-requests/issues/183" mathesis="collected:kamin-shchukin-schmidt-van-loock-2023-swap-earliest-dephasing:1:s1"}
For every $n\geq1$ and $x\in\mathbb R_{\geq0}^n$, $D^{\star}(x)=P(x)$, and every complete greedy history attains this value, independently of all tie choices. More generally, let $x^{(0)}=x$, $x^{(s+1)}=T_{i_s}x^{(s)}$ describe any complete history. Then

$$
\begin{aligned}
C_H(x)-P(x)&=\sum_{s=0}^{n-2}\delta_{i_s}(x^{(s)}),\\
\delta_i(x)&\geq0.
\end{aligned}
$$

For the current list, put $a=x_i$, $b=x_{i+1}$ and $m=\max(a,b)$. When present, write the left neighbor as $l=x_{i-1}$ and the right neighbor as $r=x_{i+2}$. The slack is

$$
\delta_i(x)=L_i(x)+R_i(x),
$$

$$
L_i(x)=\max(l,m)-\max(l,a)
$$

when $i>1$, and $L_i(x)=0$ when $i=1$. Similarly,

$$
R_i(x)=\max(m,r)-\max(b,r)
$$

when $i+1<n$, and $R_i(x)=0$ when $i+1=n$.

A complete history is optimal if and only if every one of its merge slacks is zero. For $n=1$ the sum is empty and the statement still holds.
:::

::: {.proof #pf-main}
This is Ma and Zhang's proof of Theorem 1 in Section 2 of the manuscript. A merge preserves the global maximum. The sum of neighboring maxima loses the central term $m$ and gains the neighboring increments $L_i,R_i$, for a total change $-m+\delta_i(x)$. The sum of entries changes by $m-a-b$. Subtracting gives

$$
\begin{aligned}
P(T_i x)-P(x)&=\delta_i(x)+a+b-2m\\
&=\delta_i(x)-|a-b|.
\end{aligned}
$$

Since $m\geq a,b$, both neighboring increments are nonnegative. If $i$ is greedy and a left neighbor exists, comparison with that pair gives $m\leq\max(x_{i-1},a)$. Together with $m\geq a$, this implies $\max(x_{i-1},m)=\max(x_{i-1},a)$. The right comparison likewise makes its two maxima equal. Thus a greedy step has zero slack. These weak inequalities include zero times and ties; absent endpoint terms are defined to be zero.

Sum the one-step identity along a complete history. Intermediate potentials cancel and the final singleton has potential zero, giving the exact excess-cost identity. Every history therefore costs at least $P(x)$. Every finite list of length greater than one has a pair with smallest maximum, and each merge reduces the length by one, so a complete greedy history exists. Its slacks are all zero, and its cost is $P(x)$, proving optimality. Finally, a finite sum of nonnegative numbers is zero exactly when each summand is zero, establishing the characterization of all optimal histories.
:::

## Formal evidence for natural readiness times

::: {.theorem #thm-natural title="Earliest swapping on natural-number lists" lean="D5/S3/Quantum/Optimization/SwapEarliestDephasingOptimality.result" mathesis="collected:kamin-shchukin-schmidt-van-loock-2023-swap-earliest-dephasing:1:s1"}
For every finite list $x$ of natural numbers, including the empty list, and every complete greedy merge history $H$, the total history cost equals the Bellman optimum for the same merge and cost definitions. The Bellman recurrence is zero for lists of length at most one; otherwise it takes the minimum, over valid first merges, of step cost plus the remaining optimum. All greedy tie choices are allowed.
:::

::: proof
The [pinned formal source](lean:D5/S3/Quantum/Optimization/SwapEarliestDephasingOptimality.result) gives a kernel proof of this natural-number statement. It identifies both the Bellman value and each complete greedy history's cost with an integer-valued potential, then equates them. Each valid merge shortens the list by one, so length-many Bellman iterations starting from the zero function suffice. Natural numbers include zero; empty and singleton lists both have cost zero.

On nonempty natural-number lists, this environment is precisely the restriction of the preceding theorem's greedy-optimality clause. The preceding environment additionally includes the real domain, explicit slack and the characterization of all optimal histories. The probability results below add further statements, with their written proofs supplied separately.
:::

## Random readiness and retention factors

::: {.corollary #cor-attenuation title="Pathwise optimality and expected retention" status="written-proof" proof="pf-attenuation" doi="10.5281/zenodo.23904476" source="Corollary 2 (Section 3)" request="https://github.com/the-omega-institute/trureturing-requests/issues/184" mathesis="collected:kamin-shchukin-schmidt-van-loock-2023-swap-earliest-dephasing:1:s2"}
Fix $n\geq1$. Let $X$ have any joint distribution on $\mathbb R_{\geq0}^n$. Compare complete histories using the same realized readiness vector, allowing a competing policy extra randomness; policies and their costs are selected measurably. For every $\alpha\geq0$,

$$
C_{\mathrm{greedy}}(X)=P(X)\leq C_H(X),
$$

$$
\mathbb E e^{-\alpha C_{\mathrm{greedy}}(X)}
\geq\mathbb E e^{-\alpha C_H(X)}.
$$

When costs are integrable, also $\mathbb E C_{\mathrm{greedy}}(X)\leq\mathbb E C_H(X)$. The exponential comparison needs no cost integrability, independence or identical distribution assumption.
:::

::: {.proof #pf-attenuation}
This is Corollary 2 in Section 3 of the manuscript. Fix the readiness vector and any extra policy random choices. Theorem 1 applies to every complete history so selected. For $\alpha\geq0$, the function $t\mapsto e^{-\alpha t}$ is nonincreasing; applying it reverses the cost inequality, after which we take expectations. Costs are nonnegative, so exponential factors lie in $[0,1]$ and their expectations exist. When costs are integrable, taking expectations directly in the cost inequality gives the final comparison. At $\alpha=0$ both factors equal one; at $n=1$ both costs are zero.
:::

## Geometric readiness times {#geometric-times}

::: {.corollary #cor-mean title="Mean optimum for independent geometric times" status="written-proof" proof="pf-mean" doi="10.5281/zenodo.23904476" source="Corollary 3 (Section 3)" request="https://github.com/the-omega-institute/trureturing-requests/issues/185" mathesis="collected:kamin-shchukin-schmidt-van-loock-2023-swap-earliest-dephasing:1:s3"}
Let $n\geq1$, and let $X_1,\ldots,X_n$ be independent geometric variables on $\{1,2,\ldots\}$ with common success probability $p\in(0,1]$. Put $q=1-p$. Then

$$
A_n(p)=\sum_{j=1}^{n}\frac{(-1)^{j+1}\binom nj}{1-q^j},
$$

$$
\mathbb E D^{\star}(X)=A_n(p)+\frac{n-2}{p}-\frac{n-1}{p(2-p)}.
$$

:::

::: {.proof #pf-mean}
This is the calculation in Corollary 3, Section 3 of the manuscript. Use $q^0=1$, including when $q=0$. For integers $k\geq0$, $\Pr(X_i>k)=q^k$, and independence gives $\Pr(M\leq k)=(1-q^k)^n$. The mean of a nonnegative integer variable is the sum of its tail probabilities, so

$$
\mathbb E M=\sum_{k=0}^{\infty}[1-(1-q^k)^n].
$$

Expand by the binomial theorem. Only $j=1,\ldots,n$ occur, and every geometric series converges because $0\leq q<1$. Interchanging a finite sum with these convergent series gives

$$
\mathbb E M=\sum_{j=1}^n(-1)^{j+1}\binom nj\sum_{k=0}^{\infty}q^{kj}=A_n(p).
$$

Also $\mathbb E X_i=1/p$. For two independent coordinates, $\Pr(\min(X_1,X_2)>k)=q^{2k}$, hence

$$
\mathbb E\min(X_1,X_2)=\frac{1}{1-q^2}=\frac{1}{p(2-p)},
$$

$$
\mathbb E\max(X_1,X_2)=\frac{2}{p}-\frac{1}{p(2-p)}.
$$

Take expectations in the potential: the maximum contributes $A_n(p)$, the $n-1$ neighboring pairs contribute the last expression, and the $n$ coordinates contribute $-n/p$. Simplification gives the formula. Integrability follows from $M\leq\sum_iX_i$ and finitely many integrable terms. For $n=1$ there is no neighboring-pair term and the answer is zero; at $p=1$ all times equal one and the formula again gives zero.
:::

## Normalization and limits of the model

The variation expression shows that the roughness $\sum|x_j-x_{j+1}|$ and endpoint waiting term $2M-x_1-x_n$ in Goodenough, Coopmans and Towsley's Section 3.1 sum to $2P(x)$. Keeping roughness alone changes the objective. For example, on a monotone list both roughness and endpoint contribution equal the largest time minus the smallest, so $P$ equals that range.

Within the same fixed-readiness recurrence, these deductions answer the mean-dephasing versus exponential-retention question in Kamin et al., Section IV D 5. Optimal secret-key rates across distribution or measurement schemes, memory cutoffs and probabilistic swaps change the readiness law, storage convention or objective and do not follow from these results.
