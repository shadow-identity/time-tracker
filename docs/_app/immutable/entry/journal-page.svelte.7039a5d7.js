import {
	S as he,
	i as ue,
	s as _e,
	P as fe,
	k as p,
	a as P,
	q as E,
	O as me,
	l as v,
	h as u,
	c as T,
	m as g,
	r as S,
	n as A,
	F as o,
	b as w,
	Q as de,
	G as b,
	e as te,
	R as ce
} from '../chunks/index.66fa1388.js';
import { d as le } from '../chunks/environment.9aa685ef.js';
import {
	f as pe,
	S as ae,
	a as ne,
	g as ve,
	e as ke,
	D as ge,
	P as be
} from '../chunks/workRecords.963190ac.js';
function re(n, e, a) {
	const l = n.slice();
	return (l[1] = e[a]), (l[3] = a), l;
}
function se(n, e, a) {
	const l = n.slice();
	return (l[4] = e[a]), (l[3] = a), l;
}
function Ee(n) {
	return { c: b, l: b, m: b, p: b, d: b };
}
function Se(n) {
	let e,
		a = n[0].reverse(),
		l = [];
	for (let t = 0; t < a.length; t += 1) l[t] = ie(re(n, a, t));
	return {
		c() {
			for (let t = 0; t < l.length; t += 1) l[t].c();
			e = te();
		},
		l(t) {
			for (let c = 0; c < l.length; c += 1) l[c].l(t);
			e = te();
		},
		m(t, c) {
			for (let r = 0; r < l.length; r += 1) l[r].m(t, c);
			w(t, e, c);
		},
		p(t, c) {
			if (c & 0) {
				a = t[0].reverse();
				let r;
				for (r = 0; r < a.length; r += 1) {
					const i = re(t, a, r);
					l[r] ? l[r].p(i, c) : ((l[r] = ie(i)), l[r].c(), l[r].m(e.parentNode, e));
				}
				for (; r < l.length; r += 1) l[r].d(1);
				l.length = a.length;
			}
		},
		d(t) {
			ce(l, t), t && u(e);
		}
	};
}
function ye(n) {
	let e,
		a = n[1][1][n[3] + 1].timestamp.diff(n[1][1][n[3]].timestamp).toFormat(be) + '',
		l;
	return {
		c() {
			(e = p('p')), (l = E(a)), this.h();
		},
		l(t) {
			e = v(t, 'P', { class: !0, 'aria-label': !0 });
			var c = g(e);
			(l = S(c, a)), c.forEach(u), this.h();
		},
		h() {
			A(e, 'class', 'duration svelte-5klewo'),
				A(e, 'aria-label', n[4].isWorking ? 'work duration' : 'pause duration');
		},
		m(t, c) {
			w(t, e, c), o(e, l);
		},
		p: b,
		d(t) {
			t && u(e);
		}
	};
}
function oe(n) {
	let e,
		a,
		l = n[4].timestamp.toLocaleString(ge.TIME_SIMPLE) + '',
		t,
		c,
		r,
		i = n[3] < n[1][1].length - 1 && ye(n);
	return {
		c() {
			(e = p('li')), (a = p('span')), (t = E(l)), (c = P()), i && i.c(), (r = P()), this.h();
		},
		l(h) {
			e = v(h, 'LI', { 'data-type': !0, 'aria-label': !0, class: !0 });
			var s = g(e);
			a = v(s, 'SPAN', {});
			var _ = g(a);
			(t = S(_, l)), _.forEach(u), (c = T(s)), i && i.l(s), (r = T(s)), s.forEach(u), this.h();
		},
		h() {
			A(e, 'data-type', n[4].isWorking ? 'work' : 'chill'),
				A(e, 'aria-label', n[4].isWorking ? 'work started' : 'pause started'),
				A(e, 'class', 'svelte-5klewo');
		},
		m(h, s) {
			w(h, e, s), o(e, a), o(a, t), o(e, c), i && i.m(e, null), o(e, r);
		},
		p(h, s) {
			h[3] < h[1][1].length - 1 && i.p(h, s);
		},
		d(h) {
			h && u(e), i && i.d();
		}
	};
}
function ie(n) {
	let e,
		a,
		l = n[1][0] + '',
		t,
		c,
		r,
		i,
		h,
		s,
		_,
		y,
		I = ae[ne.Working] + '',
		J,
		O,
		V = ve(n[1][1]) + '',
		F,
		U,
		D,
		X = ae[ne.Chilling] + '',
		q,
		G,
		Z = ke(n[1][1]) + '',
		Y,
		z,
		N,
		B,
		Q,
		L,
		j,
		W = n[1][1],
		d = [];
	for (let m = 0; m < W.length; m += 1) d[m] = oe(se(n, W, m));
	return {
		c() {
			(e = p('details')),
				(a = p('summary')),
				(t = E(l)),
				(c = P()),
				(r = p('hgroup')),
				(i = p('h5')),
				(h = E('Summary')),
				(s = P()),
				(_ = p('p')),
				(y = p('span')),
				(J = E(I)),
				(O = E(' Worked: ')),
				(F = E(V)),
				(U = P()),
				(D = p('span')),
				(q = E(X)),
				(G = E(' Chilled: ')),
				(Y = E(Z)),
				(z = P()),
				(N = p('h5')),
				(B = E('Details')),
				(Q = P()),
				(L = p('ul'));
			for (let m = 0; m < d.length; m += 1) d[m].c();
			(j = P()), this.h();
		},
		l(m) {
			e = v(m, 'DETAILS', { class: !0 });
			var k = g(e);
			a = v(k, 'SUMMARY', {});
			var f = g(a);
			(t = S(f, l)), f.forEach(u), (c = T(k)), (r = v(k, 'HGROUP', {}));
			var M = g(r);
			i = v(M, 'H5', {});
			var $ = g(i);
			(h = S($, 'Summary')), $.forEach(u), (s = T(M)), (_ = v(M, 'P', {}));
			var C = g(_);
			y = v(C, 'SPAN', {});
			var R = g(y);
			(J = S(R, I)),
				(O = S(R, ' Worked: ')),
				(F = S(R, V)),
				R.forEach(u),
				(U = T(C)),
				(D = v(C, 'SPAN', {}));
			var H = g(D);
			(q = S(H, X)),
				(G = S(H, ' Chilled: ')),
				(Y = S(H, Z)),
				H.forEach(u),
				C.forEach(u),
				M.forEach(u),
				(z = T(k)),
				(N = v(k, 'H5', {}));
			var x = g(N);
			(B = S(x, 'Details')), x.forEach(u), (Q = T(k)), (L = v(k, 'UL', {}));
			var ee = g(L);
			for (let K = 0; K < d.length; K += 1) d[K].l(ee);
			ee.forEach(u), (j = T(k)), k.forEach(u), this.h();
		},
		h() {
			(e.open = !n[3]), A(e, 'class', 'svelte-5klewo');
		},
		m(m, k) {
			w(m, e, k),
				o(e, a),
				o(a, t),
				o(e, c),
				o(e, r),
				o(r, i),
				o(i, h),
				o(r, s),
				o(r, _),
				o(_, y),
				o(y, J),
				o(y, O),
				o(y, F),
				o(_, U),
				o(_, D),
				o(D, q),
				o(D, G),
				o(D, Y),
				o(e, z),
				o(e, N),
				o(N, B),
				o(e, Q),
				o(e, L);
			for (let f = 0; f < d.length; f += 1) d[f].m(L, null);
			o(e, j);
		},
		p(m, k) {
			if (k & 0) {
				W = m[1][1];
				let f;
				for (f = 0; f < W.length; f += 1) {
					const M = se(m, W, f);
					d[f] ? d[f].p(M, k) : ((d[f] = oe(M)), d[f].c(), d[f].m(L, null));
				}
				for (; f < d.length; f += 1) d[f].d(1);
				d.length = W.length;
			}
		},
		d(m) {
			m && u(e), ce(d, m);
		}
	};
}
function Pe(n) {
	return { c: b, l: b, m: b, p: b, d: b };
}
function Te(n) {
	let e, a, l, t, c, r, i;
	document.title = e = le + ' Time Tracker: Journal';
	let h = {
		ctx: n,
		current: null,
		token: null,
		hasCatch: !1,
		pending: Pe,
		then: Se,
		catch: Ee,
		value: 0
	};
	return (
		fe(pe(), h),
		{
			c() {
				(a = p('meta')),
					(l = P()),
					(t = p('h1')),
					(c = E('Journal')),
					(r = P()),
					(i = p('main')),
					h.block.c(),
					this.h();
			},
			l(s) {
				const _ = me('svelte-1gybv1z', document.head);
				(a = v(_, 'META', { name: !0, content: !0 })),
					_.forEach(u),
					(l = T(s)),
					(t = v(s, 'H1', {}));
				var y = g(t);
				(c = S(y, 'Journal')), y.forEach(u), (r = T(s)), (i = v(s, 'MAIN', { class: !0 }));
				var I = g(i);
				h.block.l(I), I.forEach(u), this.h();
			},
			h() {
				A(a, 'name', 'description'),
					A(a, 'content', 'List of all the time stamps'),
					A(i, 'class', 'svelte-5klewo');
			},
			m(s, _) {
				o(document.head, a),
					w(s, l, _),
					w(s, t, _),
					o(t, c),
					w(s, r, _),
					w(s, i, _),
					h.block.m(i, (h.anchor = null)),
					(h.mount = () => i),
					(h.anchor = null);
			},
			p(s, [_]) {
				(n = s),
					_ & 0 && e !== (e = le + ' Time Tracker: Journal') && (document.title = e),
					de(h, n, _);
			},
			i: b,
			o: b,
			d(s) {
				u(a), s && u(l), s && u(t), s && u(r), s && u(i), h.block.d(), (h.token = null), (h = null);
			}
		}
	);
}
class Me extends he {
	constructor(e) {
		super(), ue(this, e, null, Te, _e, {});
	}
}
export { Me as default };
