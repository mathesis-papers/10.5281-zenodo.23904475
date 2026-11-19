# Why earliest swapping is optimal

The short links in a quantum communication chain do not all become ready together. Once two neighboring links are ready, they can be joined. The earlier link must wait, and waiting damages the stored quantum information. **Does always joining the neighboring pair that can be joined earliest minimize the total damage?** For deterministic, instantaneous swaps with fixed readiness times, Haobo Ma and Wenlin Zhang answer yes: every chain length and every nonnegative real readiness vector is covered, with any choice among ties. A formula gives the minimum cost and measures exactly how much other merge orders waste.

The question comes from L. Kamin, E. Shchukin, F. Schmidt and P. van Loock's 2023 paper, Section IV D 1, Eq. (41). We will first turn it into a problem about a list of numbers, then see why a local choice gives a global optimum. [Precise results](statements.md) contains the full statements and proofs; [Sources and further exploration](sources.md) credits the literature and explains the formal evidence.

## Four numbers make a chain

Write four links in order as $(1,2,4,3)$. Each number is the time its link becomes ready, in a common unit. **The order matters: only neighboring links may merge.** A pair ready at times $a,b$ can first merge at $\max(a,b)$, incurs waiting cost $|a-b|$, and becomes one link ready at $\max(a,b)$. Thus merging $(1,2)$ replaces it by $2$ and costs $1$.

This is the paper's normalization of dephasing cost. The optimization below needs only waiting differences; no knowledge of quantum states or measurement theory is required. The physical model assumes that swaps succeed deterministically and take no time. It does not add failed-swap retries, memory cutoffs or extra scheduling costs.

“Earliest” compares the **larger readiness time** of each neighboring pair. It does not mean the smallest difference or the two smallest numbers anywhere in the list. For $(1,2,4,3)$, the three pair readiness times are $2,4,4$, so the earliest rule first merges the left pair.

| Current list | Pair merged | Step cost | Cost so far |
|---|---|---:|---:|
| $(1,2,4,3)$ | $(1,2)\to2$ | $1$ | $1$ |
| $(2,4,3)$ | $(4,3)\to4$ | $1$ | $2$ |
| $(2,4)$ | $(2,4)\to4$ | $2$ | $4$ |

In the second row both pairs can merge at time $4$. Choosing $(2,4)$ instead gives subsequent costs $2,1$, again totaling $4$. This explains what arbitrary tie choices mean; it is not yet a general proof.

Suppose instead that the first merge is the middle pair $(2,4)$. We pay $2$ and obtain $(1,4,3)$. Merging $(4,3)$ and then $(1,4)$ costs another $1,3$, for a total of $6$. Why did we waste $2$? We can answer without listing every possible order.

## A ledger for future cost

For a nonempty list $x=(x_1,\ldots,x_n)$, let $M(x)=\max_jx_j$ and define

$$
P(x)=M(x)+\sum_{j=1}^{n-1}\max(x_j,x_{j+1})-\sum_{j=1}^{n}x_j.
$$

This is called a potential. Think of it initially as a ledger of the cost that still has to be paid. The paper proves that **the minimum total cost is exactly $P(x)$**. In our example, the largest time is $4$, the neighboring maxima sum to $2+4+4=10$, and the entries also sum to $10$. Thus $P(1,2,4,3)=4$.

Watch the ledger along the earliest order:

| Current list | $P$ | Cost already paid plus $P$ |
|---|---:|---:|
| $(1,2,4,3)$ | $4$ | $0+4=4$ |
| $(2,4,3)$ | $3$ | $1+3=4$ |
| $(2,4)$ | $2$ | $2+2=4$ |
| $(4)$ | $0$ | $4+0=4$ |

A single remaining link needs no further merge, so its ledger is zero. Each earliest merge removes precisely its own cost from the future ledger. The final total therefore equals the initial $P$.

For the worse first move, $P(1,4,3)=4$, while we have already paid $2$. Paid cost plus future cost jumps from $4$ to $6$. That move creates an excess that cannot be undone.

## Why no move can make the ledger cheaper

Merge $a,b$ into $m=\max(a,b)$. The global maximum stays fixed. In the sum of neighboring maxima, only the merged pair and its immediate neighbors can change. Removing the central term and accounting for the change in the sum of entries gives

$$
|a-b|+P(\text{after})=P(\text{before})+\delta.
$$

Here $\delta$ is the sum of increases contributed by the left and right neighbors. For a left neighbor $l$, its contribution is $\max(l,m)-\max(l,a)$. Since $m\geq a$, this difference cannot be negative. The right side works in the same way; an absent endpoint neighbor contributes nothing.

Thus **cost already paid plus remaining potential can never decrease**, whatever pair we choose. For the worse first move above, the left contribution is $\max(1,4)-\max(1,2)=2$, and the right contribution is zero. This explains exactly the extra $2$.

Why does the earliest rule create no excess? If there is a left neighbor $l$, earliest readiness gives $m\leq\max(l,a)$: otherwise that neighboring pair could have merged earlier. Replacing $a$ by $m$ therefore leaves the left maximum unchanged. The right maximum is unchanged for the same reason. Hence an earliest step has $\delta=0$. Only weak inequalities were used, so ties cause no exception.

Add the one-step equations. Each intermediate potential occurs once with each sign and cancels. This cancellation is the whole mechanism: **every complete order costs $P+\sum\delta$, while every earliest order has all $\delta=0$**. There are finitely many merges; no limit or guess from short chains is needed.

The film follows the same example and its cost ledger.

::: {.film src="001-earliest-swapping"}
From waiting in a four-link chain to the potential and the zero-excess earliest rule, with English narration and aligned Chinese/English subtitles.
:::

## An optimum need not be unique

The earliest rule is sufficient for optimality, but it is not necessary. Merge the last pair of $(1,2,4,3)$ first: this costs $1$ and leaves $(1,2,4)$. The remaining costs can be $1+2$, again totaling $4$. That first move was not earliest, but it created no excess. In general, **a complete order is optimal if and only if every step has zero slack $\delta$**.

These are comparisons of contraction orders in the recurrence. Earliest orders themselves can also be implemented chronologically. After a merge at time $m$, unchanged pair readiness times are at least $m$, and newly formed pairs contain $m$, so they too cannot be ready earlier. Successive earliest times never go backwards; tied times allow consecutive instantaneous swaps.

Another useful check is a list of monotonically ordered times. Its neighboring absolute differences add up to the largest time minus the smallest, and the optimum is exactly that range. A singleton costs zero, as does any list whose times are all equal.

## Why random readiness times benefit too

Readiness times are often random. Fix all times in one trial. The earliest rule is already no more expensive than any complete competing order in that trial. We can therefore compare trial by trial and then average, even if different links' times are correlated.

A smaller dephasing cost corresponds to a larger retention factor $e^{-\alpha C}$, where $\alpha\geq0$. This function decreases with $C$, so the trial-by-trial cost inequality also compares average retention factors. A smaller average cost alone would not usually settle such a nonlinear comparison; the strength here is **optimality for each realization**. Retention factors lie in $[0,1]$, so this expectation comparison needs no finite mean-cost assumption.

If each link independently succeeds in each round with probability $p$, its readiness round has a geometric distribution on $1,2,\ldots$. The paper also gives a finite-sum formula for the mean optimum. It follows by computing the tail probabilities of the largest time and the mean maximum of two neighbors; [Geometric readiness times](statements.md#geometric-times) gives the full calculation.

These conclusions compare **the same realized times under the same deterministic instantaneous-swap model**. Changing the distribution scheme, storage convention, swap success probability or secret-key-rate objective changes the optimization problem. The result does not directly optimize secret-key rates across all repeater schemes.

The seminar follows the same argument, with precise formulas and proof details in its appendix.

::: {.slides src="seminar"}
Aligned Chinese and English academic slides, with speaker notes, precise results and the scope of formal verification.
:::
