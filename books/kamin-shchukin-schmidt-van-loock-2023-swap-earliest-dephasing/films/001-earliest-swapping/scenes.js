/* 最早交换：使用共享引擎，画面只由当前场景时间决定。 */
'use strict';

function heading(en, zh) {
  txt(en, 100, 205, {size: 48, fam: F.disp, w: 700, c: C.white});
  txt(zh, 100, 251, {size: 28, fam: F.zh, c: C.dim});
}
function chain(values, cx, y, a = 1, focus = -1, gap = 120, width = 84) {
  const start = cx - (values.length - 1) * gap / 2;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = C.dim; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(start, y + 28); ctx.lineTo(start + (values.length - 1) * gap, y + 28); ctx.stroke(); ctx.restore();
  values.forEach((v,j) => chip(start + j * gap - width / 2, y, width, 58, String(v), j === focus || j === focus + 1 && focus >= 0 ? C.now : C.cyan, a, 32, F.math));
}
function formula(s, x, y, size = 39, c = C.white, a = 1) {
  txt(s, x, y, {size, fam: F.math, align:'center', c, a});
}
function label(s, x, y, c = C.dim, a = 1) {
  txt(s, x, y, {size:27, fam:F.disp, align:'center', c, a});
}

SCENES.model = S => {
  badgeQ(S, [[0, null, 'argued'], [1, 'one and two', 'computed'], [2, 'minimizes total cost', 'argued']]);
  heading('JOIN NEIGHBORS. PAY FOR WAITING.', '相邻才能合并；等待产生损耗');
  panel(150, 300, 1620, 460, 1, C.cyan);
  const a = at(S, 1, 0.8);
  chain([1, 2], 610, 410, 1, 0, 210, 130);
  formula('→', 950, 455, 70, C.cyan, a);
  chain([2], 1260, 410, a, -1, 120, 130);
  formula('ready at max(1, 2) = 2', 960, 585, 42);
  formula('waiting cost |1 − 2| = 1', 960, 660, 42);
  label('Fixed readiness • deterministic, instantaneous swaps', 960, 820, C.argued, at(S, 2, 0.8));
};

SCENES.orders = S => {
  badgeQ(S, [[0, null, 'computed']]);
  heading('THE SAME FOUR LINKS', '同一准备向量，不同合并顺序');
  panel(100, 300, 830, 505, 1, C.cyan);
  panel(990, 300, 830, 505, 1, C.cyan);
  label('EARLIEST', 515, 352, C.cyan);
  label('MIDDLE PAIR FIRST', 1405, 352, C.cyan);
  chain([1,2,4,3], 515, 385, 1, 0);
  chain([1,2,4,3], 1405, 385, 1, 1);
  const a=at(S,1,0.8), b=at(S,2,0.8);
  chain([2,4,3], 515, 485, a, 1);
  chain([2,4], 515, 580, a, 0);
  chain([4], 515, 675, a);
  chain([1,4,3], 1405, 485, b, 1);
  chain([1,4], 1405, 580, b, 0);
  chain([4], 1405, 675, b);
  formula('1 + 1 + 2 = 4', 515, 782, 38, C.cyan, a);
  formula('2 + 1 + 3 = 6', 1405, 782, 38, C.cyan, b);
};

SCENES.ledger = S => {
  badgeQ(S, [[0, null, 'argued'], [1, 'four plus ten minus ten', 'computed']]);
  heading('A LEDGER FOR FUTURE COST', '势函数：已付加未来成本');
  formula('P = largest time + neighboring maxima − sum of times', 960, 325, 36);
  panel(110, 365, 1070, 440, 1, C.cyan);
  label('LIST', 405, 415); label('PAID', 820, 415); label('P', 1040, 415);
  const rows=[[[1,2,4,3],0,4],[[2,4,3],1,3],[[2,4],2,2],[[4],4,0]];
  rows.forEach((r,i)=>{
    const a=i===0?1:at(S,1,0.7,(i-1)*1.5);
    chain(r[0],405,455+i*82,a,-1,100,66);
    formula(String(r[1]),820,498+i*82,34,C.cyan,a);
    formula(String(r[2]),1040,498+i*82,34,C.cyan,a);
  });
  panel(1230,365,580,440,1,C.argued);
  formula('P(1,2,4,3)',1520,435,35);
  formula('= 4 + 10 − 10 = 4',1520,490,32,C.cyan,at(S,1,0.7));
  formula('paid + P = 4',1520,580,40,C.cyan,at(S,1,0.7));
  const a=at(S,2,0.7);
  label('Worse first move',1520,670,C.dim,a);
  formula('2 + 4 = 6',1520,735,47,C.argued,a);
};

SCENES.neighbors = S => {
  badgeQ(S, [[0, null, 'argued']]);
  heading('ONLY THE NEIGHBORS CAN ADD EXCESS', '合并只会改变相邻最大值');
  panel(100,300,1720,490,1,C.argued);
  chain(['l','a','b','r'],960,350,1,1,235,130);
  formula('m = max(a, b)',960,500,43,C.now);
  const a=at(S,1,0.7), b=at(S,2,0.7), c=at(S,3,0.7);
  formula('left increase = max(l, m) − max(l, a) ≥ 0',960,580,39,C.argued,a);
  formula('earliest: m ≤ max(l, a)  ⇒  left increase = 0',960,655,39,C.argued,b);
  formula('cost + P(after) = P(before) + δ',960,745,43,C.white,c);
  label('Right neighbor: same argument. Missing neighbor: zero.',960,837,C.dim,b);
};

SCENES.sum = S => {
  badgeQ(S, [[0, null, 'argued'], [2, 'total cost of four', 'computed']]);
  heading('ADD THE STEPS. CANCEL THE POTENTIALS.', '逐步相加，中间势函数抵消');
  panel(100,300,1720,490,1,C.argued);
  formula('c₁ + P₁ − P₀ = δ₁', 960,380,43);
  formula('c₂ + P₂ − P₁ = δ₂', 960,445,43);
  formula('…          final P = 0', 960,510,38,C.dim);
  formula('total cost = initial P + sum of slacks',960,610,49,C.argued,at(S,0,1.0,2));
  formula('optimal  ⇔  every slack is zero',960,700,44,C.argued,at(S,1,0.8));
  label('Not earliest, still optimal: (1,2,4,3) → (1,2,4) → (2,4) → (4)',960,840,C.cyan,at(S,2,0.8));
};

SCENES.random = S => {
  badgeQ(S, [[0, null, 'argued']]);
  heading('COMPARE EACH REALIZATION, THEN AVERAGE', '逐实现比较，比只比较平均成本更强');
  panel(100,310,1720,480,1,C.argued);
  label('SAME REALIZED READINESS VECTOR X',960,380,C.cyan);
  formula('C(earliest, X) ≤ C(other, X)',960,475,52);
  const a=at(S,1,0.8);
  formula('α ≥ 0:  exp(−α C(earliest)) ≥ exp(−α C(other))',960,585,39,C.argued,a);
  formula('E exp(−α C(earliest)) ≥ E exp(−α C(other))',960,690,42,C.argued,a);
  label('Fixed swap model • not all distribution schemes or key rates',960,840,C.dim,at(S,2,0.8));
};

SCENES.scope = S => {
  badgeQ(S, [[0, null, 'lean'], [1, 'written proofs', 'argued']]);
  heading('ONE QUESTION, PRECISE EVIDENCE', '原始问题与证明范围');
  panel(100,300,1720,490,1,C.cyan);
  label('NATURAL READINESS TIMES',960,375,C.lean);
  formula('every complete earliest history has optimal cost',960,435,40);
  label('Including zero times, empty lists and all ties',960,485,C.dim);
  const a=at(S,1,0.8);
  label('REAL TIMES • EXACT SLACK • PROBABILITY',960,585,C.argued,a);
  label('Written proofs: Haobo Ma and Wenlin Zhang (2026)',960,640,C.white,a);
  label('Question: L. Kamin, E. Shchukin, F. Schmidt, P. van Loock (2023)',960,730,C.dim,at(S,2,0.8));
  label('Version DOI: 10.5281/zenodo.23904476',960,840,C.cyan);
};

/* 海报重用实际场景与暂定时间轴，不构造另一个与内容无关的封面。 */
FILM.poster = () => {
  const sc=TL.scenes.find(s=>s.id==='orders');
  const u=sc.duration?sc.duration*0.84:(sc.end-sc.start)*0.84;
  const t=(sc.start||0)+u;
  renderAt(t);
};
