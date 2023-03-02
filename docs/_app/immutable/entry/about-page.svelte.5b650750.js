import {
	S as D,
	i as F,
	s as G,
	k as l,
	a as _,
	q as c,
	O as I,
	l as r,
	h as a,
	c as w,
	m as d,
	r as h,
	n as E,
	F as e,
	b as Y,
	G as M
} from '../chunks/index.66fa1388.js';
function O(C) {
	let n, y, t, u, T, k, i, b, p, x, A, S, m, P, q, v, H;
	return {
		c() {
			(n = l('meta')),
				(y = _()),
				(t = l('div')),
				(u = l('h1')),
				(T = c('About this app')),
				(k = _()),
				(i = l('p')),
				(b = c('This is a ')),
				(p = l('a')),
				(x = c('SvelteKit')),
				(A = c(` app. You can make your own by typing the
		following into your command line and following the prompts:`)),
				(S = _()),
				(m = l('pre')),
				(P = c('npm create svelte@latest')),
				(q = _()),
				(v = l('p')),
				(H =
					c(`The page you're looking at is purely static HTML, with no client-side interactivity needed.
		Because of that, we don't need to load any JavaScript. Try viewing the page's source, or opening
		the devtools network panel and reloading.`)),
				this.h();
		},
		l(o) {
			const f = I('svelte-1ds1qyu', document.head);
			(n = r(f, 'META', { name: !0, content: !0 })),
				f.forEach(a),
				(y = w(o)),
				(t = r(o, 'DIV', { class: !0 }));
			var s = d(t);
			u = r(s, 'H1', {});
			var B = d(u);
			(T = h(B, 'About this app')), B.forEach(a), (k = w(s)), (i = r(s, 'P', {}));
			var g = d(i);
			(b = h(g, 'This is a ')), (p = r(g, 'A', { href: !0 }));
			var J = d(p);
			(x = h(J, 'SvelteKit')),
				J.forEach(a),
				(A = h(
					g,
					` app. You can make your own by typing the
		following into your command line and following the prompts:`
				)),
				g.forEach(a),
				(S = w(s)),
				(m = r(s, 'PRE', {}));
			var K = d(m);
			(P = h(K, 'npm create svelte@latest')), K.forEach(a), (q = w(s)), (v = r(s, 'P', {}));
			var L = d(v);
			(H = h(
				L,
				`The page you're looking at is purely static HTML, with no client-side interactivity needed.
		Because of that, we don't need to load any JavaScript. Try viewing the page's source, or opening
		the devtools network panel and reloading.`
			)),
				L.forEach(a),
				s.forEach(a),
				this.h();
		},
		h() {
			(document.title = 'About'),
				E(n, 'name', 'description'),
				E(n, 'content', 'About this app'),
				E(p, 'href', 'https://kit.svelte.dev'),
				E(t, 'class', 'text-column');
		},
		m(o, f) {
			e(document.head, n),
				Y(o, y, f),
				Y(o, t, f),
				e(t, u),
				e(u, T),
				e(t, k),
				e(t, i),
				e(i, b),
				e(i, p),
				e(p, x),
				e(i, A),
				e(t, S),
				e(t, m),
				e(m, P),
				e(t, q),
				e(t, v),
				e(v, H);
		},
		p: M,
		i: M,
		o: M,
		d(o) {
			a(n), o && a(y), o && a(t);
		}
	};
}
class V extends D {
	constructor(n) {
		super(), F(this, n, null, O, G, {});
	}
}
export { V as default };
