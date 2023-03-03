function w() {}
function G(t, e) {
	for (const n in e) t[n] = e[n];
	return t;
}
function I(t) {
	return !!t && (typeof t == 'object' || typeof t == 'function') && typeof t.then == 'function';
}
function B(t) {
	return t();
}
function M() {
	return Object.create(null);
}
function g(t) {
	t.forEach(B);
}
function H(t) {
	return typeof t == 'function';
}
function ft(t, e) {
	return t != t ? e == e : t !== e || (t && typeof t == 'object') || typeof t == 'function';
}
let b;
function _t(t, e) {
	return b || (b = document.createElement('a')), (b.href = e), t === b.href;
}
function J(t) {
	return Object.keys(t).length === 0;
}
function K(t, ...e) {
	if (t == null) return w;
	const n = t.subscribe(...e);
	return n.unsubscribe ? () => n.unsubscribe() : n;
}
function dt(t, e, n) {
	t.$$.on_destroy.push(K(e, n));
}
function ht(t, e, n, r) {
	if (t) {
		const c = L(t, e, n, r);
		return t[0](c);
	}
}
function L(t, e, n, r) {
	return t[1] && r ? G(n.ctx.slice(), t[1](r(e))) : n.ctx;
}
function mt(t, e, n, r) {
	if (t[2] && r) {
		const c = t[2](r(n));
		if (e.dirty === void 0) return c;
		if (typeof c == 'object') {
			const s = [],
				i = Math.max(e.dirty.length, c.length);
			for (let o = 0; o < i; o += 1) s[o] = e.dirty[o] | c[o];
			return s;
		}
		return e.dirty | c;
	}
	return e.dirty;
}
function pt(t, e, n, r, c, s) {
	if (c) {
		const i = L(e, n, r, s);
		t.p(i, c);
	}
}
function yt(t) {
	if (t.ctx.length > 32) {
		const e = [],
			n = t.ctx.length / 32;
		for (let r = 0; r < n; r++) e[r] = -1;
		return e;
	}
	return -1;
}
let v = !1;
function Q() {
	v = !0;
}
function W() {
	v = !1;
}
function U(t, e, n, r) {
	for (; t < e; ) {
		const c = t + ((e - t) >> 1);
		n(c) <= r ? (t = c + 1) : (e = c);
	}
	return t;
}
function V(t) {
	if (t.hydrate_init) return;
	t.hydrate_init = !0;
	let e = t.childNodes;
	if (t.nodeName === 'HEAD') {
		const l = [];
		for (let u = 0; u < e.length; u++) {
			const f = e[u];
			f.claim_order !== void 0 && l.push(f);
		}
		e = l;
	}
	const n = new Int32Array(e.length + 1),
		r = new Int32Array(e.length);
	n[0] = -1;
	let c = 0;
	for (let l = 0; l < e.length; l++) {
		const u = e[l].claim_order,
			f = (c > 0 && e[n[c]].claim_order <= u ? c + 1 : U(1, c, (d) => e[n[d]].claim_order, u)) - 1;
		r[l] = n[f] + 1;
		const a = f + 1;
		(n[a] = l), (c = Math.max(a, c));
	}
	const s = [],
		i = [];
	let o = e.length - 1;
	for (let l = n[c] + 1; l != 0; l = r[l - 1]) {
		for (s.push(e[l - 1]); o >= l; o--) i.push(e[o]);
		o--;
	}
	for (; o >= 0; o--) i.push(e[o]);
	s.reverse(), i.sort((l, u) => l.claim_order - u.claim_order);
	for (let l = 0, u = 0; l < i.length; l++) {
		for (; u < s.length && i[l].claim_order >= s[u].claim_order; ) u++;
		const f = u < s.length ? s[u] : null;
		t.insertBefore(i[l], f);
	}
}
function X(t, e) {
	if (v) {
		for (
			V(t),
				(t.actual_end_child === void 0 ||
					(t.actual_end_child !== null && t.actual_end_child.parentNode !== t)) &&
					(t.actual_end_child = t.firstChild);
			t.actual_end_child !== null && t.actual_end_child.claim_order === void 0;

		)
			t.actual_end_child = t.actual_end_child.nextSibling;
		e !== t.actual_end_child
			? (e.claim_order !== void 0 || e.parentNode !== t) && t.insertBefore(e, t.actual_end_child)
			: (t.actual_end_child = e.nextSibling);
	} else (e.parentNode !== t || e.nextSibling !== null) && t.appendChild(e);
}
function gt(t, e, n) {
	v && !n ? X(t, e) : (e.parentNode !== t || e.nextSibling != n) && t.insertBefore(e, n || null);
}
function Y(t) {
	t.parentNode && t.parentNode.removeChild(t);
}
function bt(t, e) {
	for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e);
}
function Z(t) {
	return document.createElement(t);
}
function tt(t) {
	return document.createElementNS('http://www.w3.org/2000/svg', t);
}
function A(t) {
	return document.createTextNode(t);
}
function xt() {
	return A(' ');
}
function $t() {
	return A('');
}
function wt(t, e, n, r) {
	return t.addEventListener(e, n, r), () => t.removeEventListener(e, n, r);
}
function vt(t, e, n) {
	n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function et(t) {
	return Array.from(t.childNodes);
}
function nt(t) {
	t.claim_info === void 0 && (t.claim_info = { last_index: 0, total_claimed: 0 });
}
function O(t, e, n, r, c = !1) {
	nt(t);
	const s = (() => {
		for (let i = t.claim_info.last_index; i < t.length; i++) {
			const o = t[i];
			if (e(o)) {
				const l = n(o);
				return l === void 0 ? t.splice(i, 1) : (t[i] = l), c || (t.claim_info.last_index = i), o;
			}
		}
		for (let i = t.claim_info.last_index - 1; i >= 0; i--) {
			const o = t[i];
			if (e(o)) {
				const l = n(o);
				return (
					l === void 0 ? t.splice(i, 1) : (t[i] = l),
					c ? l === void 0 && t.claim_info.last_index-- : (t.claim_info.last_index = i),
					o
				);
			}
		}
		return r();
	})();
	return (s.claim_order = t.claim_info.total_claimed), (t.claim_info.total_claimed += 1), s;
}
function P(t, e, n, r) {
	return O(
		t,
		(c) => c.nodeName === e,
		(c) => {
			const s = [];
			for (let i = 0; i < c.attributes.length; i++) {
				const o = c.attributes[i];
				n[o.name] || s.push(o.name);
			}
			s.forEach((i) => c.removeAttribute(i));
		},
		() => r(e)
	);
}
function Et(t, e, n) {
	return P(t, e, n, Z);
}
function kt(t, e, n) {
	return P(t, e, n, tt);
}
function rt(t, e) {
	return O(
		t,
		(n) => n.nodeType === 3,
		(n) => {
			const r = '' + e;
			if (n.data.startsWith(r)) {
				if (n.data.length !== r.length) return n.splitText(r.length);
			} else n.data = r;
		},
		() => A(e),
		!0
	);
}
function Nt(t) {
	return rt(t, ' ');
}
function At(t, e) {
	(e = '' + e), t.wholeText !== e && (t.data = e);
}
function St(t, e, n, r) {
	n === null ? t.style.removeProperty(e) : t.style.setProperty(e, n, r ? 'important' : '');
}
function jt(t, e) {
	const n = [];
	let r = 0;
	for (const c of e.childNodes)
		if (c.nodeType === 8) {
			const s = c.textContent.trim();
			s === `HEAD_${t}_END`
				? ((r -= 1), n.push(c))
				: s === `HEAD_${t}_START` && ((r += 1), n.push(c));
		} else r > 0 && n.push(c);
	return n;
}
function Ct(t, e) {
	return new t(e);
}
let y;
function _(t) {
	y = t;
}
function S() {
	if (!y) throw new Error('Function called outside component initialization');
	return y;
}
function Tt(t) {
	S().$$.on_mount.push(t);
}
function Mt(t) {
	S().$$.after_update.push(t);
}
const p = [],
	D = [],
	x = [],
	q = [],
	z = Promise.resolve();
let k = !1;
function F() {
	k || ((k = !0), z.then(j));
}
function Dt() {
	return F(), z;
}
function N(t) {
	x.push(t);
}
const E = new Set();
let m = 0;
function j() {
	if (m !== 0) return;
	const t = y;
	do {
		try {
			for (; m < p.length; ) {
				const e = p[m];
				m++, _(e), ct(e.$$);
			}
		} catch (e) {
			throw ((p.length = 0), (m = 0), e);
		}
		for (_(null), p.length = 0, m = 0; D.length; ) D.pop()();
		for (let e = 0; e < x.length; e += 1) {
			const n = x[e];
			E.has(n) || (E.add(n), n());
		}
		x.length = 0;
	} while (p.length);
	for (; q.length; ) q.pop()();
	(k = !1), E.clear(), _(t);
}
function ct(t) {
	if (t.fragment !== null) {
		t.update(), g(t.before_update);
		const e = t.dirty;
		(t.dirty = [-1]), t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(N);
	}
}
const $ = new Set();
let h;
function it() {
	h = { r: 0, c: [], p: h };
}
function lt() {
	h.r || g(h.c), (h = h.p);
}
function R(t, e) {
	t && t.i && ($.delete(t), t.i(e));
}
function ut(t, e, n, r) {
	if (t && t.o) {
		if ($.has(t)) return;
		$.add(t),
			h.c.push(() => {
				$.delete(t), r && (n && t.d(1), r());
			}),
			t.o(e);
	} else r && r();
}
function qt(t, e) {
	const n = (e.token = {});
	function r(c, s, i, o) {
		if (e.token !== n) return;
		e.resolved = o;
		let l = e.ctx;
		i !== void 0 && ((l = l.slice()), (l[i] = o));
		const u = c && (e.current = c)(l);
		let f = !1;
		e.block &&
			(e.blocks
				? e.blocks.forEach((a, d) => {
						d !== s &&
							a &&
							(it(),
							ut(a, 1, 1, () => {
								e.blocks[d] === a && (e.blocks[d] = null);
							}),
							lt());
				  })
				: e.block.d(1),
			u.c(),
			R(u, 1),
			u.m(e.mount(), e.anchor),
			(f = !0)),
			(e.block = u),
			e.blocks && (e.blocks[s] = u),
			f && j();
	}
	if (I(t)) {
		const c = S();
		if (
			(t.then(
				(s) => {
					_(c), r(e.then, 1, e.value, s), _(null);
				},
				(s) => {
					if ((_(c), r(e.catch, 2, e.error, s), _(null), !e.hasCatch)) throw s;
				}
			),
			e.current !== e.pending)
		)
			return r(e.pending, 0), !0;
	} else {
		if (e.current !== e.then) return r(e.then, 1, e.value, t), !0;
		e.resolved = t;
	}
}
function Bt(t, e, n) {
	const r = e.slice(),
		{ resolved: c } = t;
	t.current === t.then && (r[t.value] = c),
		t.current === t.catch && (r[t.error] = c),
		t.block.p(r, n);
}
function Ht(t) {
	t && t.c();
}
function Lt(t, e) {
	t && t.l(e);
}
function st(t, e, n, r) {
	const { fragment: c, after_update: s } = t.$$;
	c && c.m(e, n),
		r ||
			N(() => {
				const i = t.$$.on_mount.map(B).filter(H);
				t.$$.on_destroy ? t.$$.on_destroy.push(...i) : g(i), (t.$$.on_mount = []);
			}),
		s.forEach(N);
}
function ot(t, e) {
	const n = t.$$;
	n.fragment !== null &&
		(g(n.on_destroy),
		n.fragment && n.fragment.d(e),
		(n.on_destroy = n.fragment = null),
		(n.ctx = []));
}
function at(t, e) {
	t.$$.dirty[0] === -1 && (p.push(t), F(), t.$$.dirty.fill(0)),
		(t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function Ot(t, e, n, r, c, s, i, o = [-1]) {
	const l = y;
	_(t);
	const u = (t.$$ = {
		fragment: null,
		ctx: [],
		props: s,
		update: w,
		not_equal: c,
		bound: M(),
		on_mount: [],
		on_destroy: [],
		on_disconnect: [],
		before_update: [],
		after_update: [],
		context: new Map(e.context || (l ? l.$$.context : [])),
		callbacks: M(),
		dirty: o,
		skip_bound: !1,
		root: e.target || l.$$.root
	});
	i && i(u.root);
	let f = !1;
	if (
		((u.ctx = n
			? n(t, e.props || {}, (a, d, ...C) => {
					const T = C.length ? C[0] : d;
					return (
						u.ctx &&
							c(u.ctx[a], (u.ctx[a] = T)) &&
							(!u.skip_bound && u.bound[a] && u.bound[a](T), f && at(t, a)),
						d
					);
			  })
			: []),
		u.update(),
		(f = !0),
		g(u.before_update),
		(u.fragment = r ? r(u.ctx) : !1),
		e.target)
	) {
		if (e.hydrate) {
			Q();
			const a = et(e.target);
			u.fragment && u.fragment.l(a), a.forEach(Y);
		} else u.fragment && u.fragment.c();
		e.intro && R(t.$$.fragment), st(t, e.target, e.anchor, e.customElement), W(), j();
	}
	_(l);
}
class Pt {
	$destroy() {
		ot(this, 1), (this.$destroy = w);
	}
	$on(e, n) {
		if (!H(n)) return w;
		const r = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
		return (
			r.push(n),
			() => {
				const c = r.indexOf(n);
				c !== -1 && r.splice(c, 1);
			}
		);
	}
	$set(e) {
		this.$$set && !J(e) && ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
	}
}
export {
	st as A,
	ot as B,
	tt as C,
	kt as D,
	_t as E,
	X as F,
	w as G,
	dt as H,
	ht as I,
	pt as J,
	yt as K,
	mt as L,
	wt as M,
	g as N,
	jt as O,
	qt as P,
	Bt as Q,
	bt as R,
	Pt as S,
	xt as a,
	gt as b,
	Nt as c,
	ut as d,
	$t as e,
	lt as f,
	R as g,
	Y as h,
	Ot as i,
	Mt as j,
	Z as k,
	Et as l,
	et as m,
	vt as n,
	Tt as o,
	St as p,
	A as q,
	rt as r,
	ft as s,
	Dt as t,
	At as u,
	it as v,
	D as w,
	Ct as x,
	Ht as y,
	Lt as z
};