import {
	S as ne,
	i as ue,
	s as ce,
	k as v,
	a as B,
	C as M,
	q as Y,
	l as p,
	m as i,
	h as u,
	c as D,
	D as V,
	r as ee,
	E as te,
	n as e,
	b as oe,
	F as a,
	G as se,
	H as ie,
	I as ve,
	y as pe,
	z as _e,
	A as de,
	J as he,
	K as fe,
	L as me,
	g as ae,
	d as re,
	B as ge
} from '../chunks/index.66fa1388.js';
import { p as $e } from '../chunks/stores.141ecdb8.js';
import { e as le } from '../chunks/singletons.231985ca.js';
const Ee = '' + new URL('../assets/svelte-logo.87df40b8.svg', import.meta.url).href,
	ze = '' + new URL('../assets/github.1ea8d62e.svg', import.meta.url).href;
function be(_) {
	let t, l, o, r, h, c, s, n, I, k, f, m, z, q, j, J, g, b, R, C, S, $, w, U, A, L, y, x;
	return {
		c() {
			(t = v('header')),
				(l = v('div')),
				(o = v('a')),
				(r = v('img')),
				(c = B()),
				(s = v('nav')),
				(n = M('svg')),
				(I = M('path')),
				(k = B()),
				(f = v('ul')),
				(m = v('li')),
				(z = v('a')),
				(q = Y('Home')),
				(J = B()),
				(g = v('li')),
				(b = v('a')),
				(R = Y('Journal')),
				(S = B()),
				($ = M('svg')),
				(w = M('path')),
				(U = B()),
				(A = v('div')),
				(L = v('a')),
				(y = v('img')),
				this.h();
		},
		l(E) {
			t = p(E, 'HEADER', { class: !0 });
			var d = i(t);
			l = p(d, 'DIV', { class: !0 });
			var K = i(l);
			o = p(K, 'A', { href: !0, class: !0 });
			var Z = i(o);
			(r = p(Z, 'IMG', { src: !0, alt: !0, class: !0 })),
				Z.forEach(u),
				K.forEach(u),
				(c = D(d)),
				(s = p(d, 'NAV', { class: !0 }));
			var H = i(s);
			n = V(H, 'svg', { viewBox: !0, 'aria-hidden': !0, class: !0 });
			var F = i(n);
			(I = V(F, 'path', { d: !0, class: !0 })),
				i(I).forEach(u),
				F.forEach(u),
				(k = D(H)),
				(f = p(H, 'UL', { class: !0 }));
			var G = i(f);
			m = p(G, 'LI', { 'aria-current': !0, class: !0 });
			var N = i(m);
			z = p(N, 'A', { href: !0, class: !0 });
			var O = i(z);
			(q = ee(O, 'Home')),
				O.forEach(u),
				N.forEach(u),
				(J = D(G)),
				(g = p(G, 'LI', { 'aria-current': !0, class: !0 }));
			var P = i(g);
			b = p(P, 'A', { href: !0, class: !0 });
			var Q = i(b);
			(R = ee(Q, 'Journal')),
				Q.forEach(u),
				P.forEach(u),
				G.forEach(u),
				(S = D(H)),
				($ = V(H, 'svg', { viewBox: !0, 'aria-hidden': !0, class: !0 }));
			var T = i($);
			(w = V(T, 'path', { d: !0, class: !0 })),
				i(w).forEach(u),
				T.forEach(u),
				H.forEach(u),
				(U = D(d)),
				(A = p(d, 'DIV', { class: !0 }));
			var W = i(A);
			L = p(W, 'A', { href: !0, class: !0 });
			var X = i(L);
			(y = p(X, 'IMG', { src: !0, alt: !0, class: !0 })),
				X.forEach(u),
				W.forEach(u),
				d.forEach(u),
				this.h();
		},
		h() {
			te(r.src, (h = Ee)) || e(r, 'src', h),
				e(r, 'alt', 'SvelteKit'),
				e(r, 'class', 'svelte-1u9z1tp'),
				e(o, 'href', 'https://kit.svelte.dev'),
				e(o, 'class', 'svelte-1u9z1tp'),
				e(l, 'class', 'corner svelte-1u9z1tp'),
				e(I, 'd', 'M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z'),
				e(I, 'class', 'svelte-1u9z1tp'),
				e(n, 'viewBox', '0 0 2 3'),
				e(n, 'aria-hidden', 'true'),
				e(n, 'class', 'svelte-1u9z1tp'),
				e(z, 'href', le + '/'),
				e(z, 'class', 'svelte-1u9z1tp'),
				e(m, 'aria-current', (j = _[0].url.pathname === '/' ? 'page' : void 0)),
				e(m, 'class', 'svelte-1u9z1tp'),
				e(b, 'href', le + '/journal'),
				e(b, 'class', 'svelte-1u9z1tp'),
				e(g, 'aria-current', (C = _[0].url.pathname === '/journal' ? 'page' : void 0)),
				e(g, 'class', 'svelte-1u9z1tp'),
				e(f, 'class', 'svelte-1u9z1tp'),
				e(w, 'd', 'M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z'),
				e(w, 'class', 'svelte-1u9z1tp'),
				e($, 'viewBox', '0 0 2 3'),
				e($, 'aria-hidden', 'true'),
				e($, 'class', 'svelte-1u9z1tp'),
				e(s, 'class', 'svelte-1u9z1tp'),
				te(y.src, (x = ze)) || e(y, 'src', x),
				e(y, 'alt', 'GitHub'),
				e(y, 'class', 'svelte-1u9z1tp'),
				e(L, 'href', 'https://github.com/sveltejs/kit'),
				e(L, 'class', 'svelte-1u9z1tp'),
				e(A, 'class', 'corner svelte-1u9z1tp'),
				e(t, 'class', 'svelte-1u9z1tp');
		},
		m(E, d) {
			oe(E, t, d),
				a(t, l),
				a(l, o),
				a(o, r),
				a(t, c),
				a(t, s),
				a(s, n),
				a(n, I),
				a(s, k),
				a(s, f),
				a(f, m),
				a(m, z),
				a(z, q),
				a(f, J),
				a(f, g),
				a(g, b),
				a(b, R),
				a(s, S),
				a(s, $),
				a($, w),
				a(t, U),
				a(t, A),
				a(A, L),
				a(L, y);
		},
		p(E, [d]) {
			d & 1 && j !== (j = E[0].url.pathname === '/' ? 'page' : void 0) && e(m, 'aria-current', j),
				d & 1 &&
					C !== (C = E[0].url.pathname === '/journal' ? 'page' : void 0) &&
					e(g, 'aria-current', C);
		},
		i: se,
		o: se,
		d(E) {
			E && u(t);
		}
	};
}
function Le(_, t, l) {
	let o;
	return ie(_, $e, (r) => l(0, (o = r))), [o];
}
class ye extends ne {
	constructor(t) {
		super(), ue(this, t, Le, be, ce, {});
	}
}
function Ie(_) {
	let t, l, o, r;
	l = new ye({});
	const h = _[1].default,
		c = ve(h, _, _[0], null);
	return {
		c() {
			(t = v('div')), pe(l.$$.fragment), (o = B()), c && c.c(), this.h();
		},
		l(s) {
			t = p(s, 'DIV', { class: !0 });
			var n = i(t);
			_e(l.$$.fragment, n), (o = D(n)), c && c.l(n), n.forEach(u), this.h();
		},
		h() {
			e(t, 'class', 'app svelte-1nlf2hb');
		},
		m(s, n) {
			oe(s, t, n), de(l, t, null), a(t, o), c && c.m(t, null), (r = !0);
		},
		p(s, [n]) {
			c && c.p && (!r || n & 1) && he(c, h, s, s[0], r ? me(h, s[0], n, null) : fe(s[0]), null);
		},
		i(s) {
			r || (ae(l.$$.fragment, s), ae(c, s), (r = !0));
		},
		o(s) {
			re(l.$$.fragment, s), re(c, s), (r = !1);
		},
		d(s) {
			s && u(t), ge(l), c && c.d(s);
		}
	};
}
function we(_, t, l) {
	let { $$slots: o = {}, $$scope: r } = t;
	return (
		(_.$$set = (h) => {
			'$$scope' in h && l(0, (r = h.$$scope));
		}),
		[r, o]
	);
}
class De extends ne {
	constructor(t) {
		super(), ue(this, t, we, Ie, ce, {});
	}
}
export { De as default };
