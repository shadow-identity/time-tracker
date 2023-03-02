import {
	S as I,
	i as L,
	s as H,
	k as g,
	q as D,
	a as O,
	e as V,
	l as b,
	m as T,
	r as R,
	h as m,
	c as q,
	n as y,
	b as W,
	F as p,
	u as P,
	G as U,
	y as Q,
	z as X,
	A as Z,
	M,
	g as x,
	d as $,
	B as tt,
	N as et,
	o as st,
	O as at
} from '../chunks/index.66fa1388.js';
import { d as Y } from '../chunks/environment.9aa685ef.js';
import {
	S as J,
	a as F,
	r as rt,
	b as ot,
	c as nt,
	D as K,
	P as B,
	g as lt,
	d as it,
	e as ct
} from '../chunks/workRecords.963190ac.js';
function ut(c) {
	let e,
		s = c[0] === F.Working ? 'Working' : 'Chilling',
		r,
		t,
		o,
		i,
		l,
		n,
		a,
		u;
	return {
		c() {
			(e = g('h1')),
				(r = D(s)),
				(t = O()),
				(o = g('span')),
				(i = D(c[1])),
				(l = O()),
				(n = g('h3')),
				(a = D('Totally worked today: ')),
				(u = D(c[2])),
				this.h();
		},
		l(_) {
			e = b(_, 'H1', { class: !0 });
			var d = T(e);
			(r = R(d, s)), (t = q(d)), (o = b(d, 'SPAN', { class: !0 }));
			var k = T(o);
			(i = R(k, c[1])), k.forEach(m), d.forEach(m), (l = q(_)), (n = b(_, 'H3', { class: !0 }));
			var S = T(n);
			(a = R(S, 'Totally worked today: ')), (u = R(S, c[2])), S.forEach(m), this.h();
		},
		h() {
			y(o, 'class', 'svelte-38u9ef'),
				y(e, 'class', 'svelte-38u9ef'),
				y(n, 'class', 'svelte-38u9ef');
		},
		m(_, d) {
			W(_, e, d), p(e, r), p(e, t), p(e, o), p(o, i), W(_, l, d), W(_, n, d), p(n, a), p(n, u);
		},
		p(_, d) {
			d & 1 && s !== (s = _[0] === F.Working ? 'Working' : 'Chilling') && P(r, s),
				d & 2 && P(i, _[1]),
				d & 4 && P(u, _[2]);
		},
		d(_) {
			_ && m(e), _ && m(l), _ && m(n);
		}
	};
}
function ft(c) {
	let e, s;
	return {
		c() {
			(e = g('h1')), (s = D('Time to start working!'));
		},
		l(r) {
			e = b(r, 'H1', {});
			var t = T(e);
			(s = R(t, 'Time to start working!')), t.forEach(m);
		},
		m(r, t) {
			W(r, e, t), p(e, s);
		},
		p: U,
		d(r) {
			r && m(e);
		}
	};
}
function mt(c) {
	let e,
		s = J[c[0]] + '',
		r,
		t,
		o;
	function i(a, u) {
		return a[0] === F.NotStarted ? ft : ut;
	}
	let l = i(c),
		n = l(c);
	return {
		c() {
			(e = g('span')), (r = D(s)), (t = O()), n.c(), (o = V()), this.h();
		},
		l(a) {
			e = b(a, 'SPAN', { 'aria-hidden': !0, class: !0 });
			var u = T(e);
			(r = R(u, s)), u.forEach(m), (t = q(a)), n.l(a), (o = V()), this.h();
		},
		h() {
			y(e, 'aria-hidden', 'true'), y(e, 'class', 'state-symbol svelte-38u9ef');
		},
		m(a, u) {
			W(a, e, u), p(e, r), W(a, t, u), n.m(a, u), W(a, o, u);
		},
		p(a, [u]) {
			u & 1 && s !== (s = J[a[0]] + '') && P(r, s),
				l === (l = i(a)) && n
					? n.p(a, u)
					: (n.d(1), (n = l(a)), n && (n.c(), n.m(o.parentNode, o)));
		},
		i: U,
		o: U,
		d(a) {
			a && m(e), a && m(t), n.d(a), a && m(o);
		}
	};
}
function _t(c, e, s) {
	let { state: r } = e,
		{ currentDuration: t } = e,
		{ totallyWorked: o } = e;
	return (
		(c.$$set = (i) => {
			'state' in i && s(0, (r = i.state)),
				'currentDuration' in i && s(1, (t = i.currentDuration)),
				'totallyWorked' in i && s(2, (o = i.totallyWorked));
		}),
		[r, t, o]
	);
}
class dt extends I {
	constructor(e) {
		super(), L(this, e, _t, mt, H, { state: 0, currentDuration: 1, totallyWorked: 2 });
	}
}
function ht(c) {
	let e,
		s,
		r,
		t,
		o,
		i = c[0] ? 'Pause' : 'Work',
		l,
		n,
		a,
		u,
		_,
		d,
		k,
		S = c[5] ? 'Share' : 'Save',
		A,
		h,
		N,
		w;
	return (
		(s = new dt({ props: { state: c[3], currentDuration: c[1], totallyWorked: c[2] } })),
		{
			c() {
				(e = g('main')),
					Q(s.$$.fragment),
					(r = O()),
					(t = g('footer')),
					(o = g('button')),
					(l = D(i)),
					(n = O()),
					(a = g('section')),
					(u = g('button')),
					(_ = D('Reset')),
					(d = O()),
					(k = g('button')),
					(A = D(S)),
					this.h();
			},
			l(f) {
				e = b(f, 'MAIN', { class: !0 });
				var v = T(e);
				X(s.$$.fragment, v), v.forEach(m), (r = q(f)), (t = b(f, 'FOOTER', { class: !0 }));
				var E = T(t);
				o = b(E, 'BUTTON', { class: !0 });
				var j = T(o);
				(l = R(j, i)), j.forEach(m), (n = q(E)), (a = b(E, 'SECTION', { class: !0 }));
				var C = T(a);
				u = b(C, 'BUTTON', { class: !0 });
				var z = T(u);
				(_ = R(z, 'Reset')), z.forEach(m), (d = q(C)), (k = b(C, 'BUTTON', { class: !0 }));
				var G = T(k);
				(A = R(G, S)), G.forEach(m), C.forEach(m), E.forEach(m), this.h();
			},
			h() {
				y(e, 'class', 'svelte-h8raqb'),
					y(o, 'class', 'svelte-h8raqb'),
					y(u, 'class', 'outline warning svelte-h8raqb'),
					y(k, 'class', 'outline svelte-h8raqb'),
					y(a, 'class', 'svelte-h8raqb'),
					y(t, 'class', 'svelte-h8raqb');
			},
			m(f, v) {
				W(f, e, v),
					Z(s, e, null),
					W(f, r, v),
					W(f, t, v),
					p(t, o),
					p(o, l),
					p(t, n),
					p(t, a),
					p(a, u),
					p(u, _),
					p(a, d),
					p(a, k),
					p(k, A),
					(h = !0),
					N || ((w = [M(o, 'click', c[4]), M(u, 'click', c[7]), M(k, 'click', c[6])]), (N = !0));
			},
			p(f, [v]) {
				const E = {};
				v & 8 && (E.state = f[3]),
					v & 2 && (E.currentDuration = f[1]),
					v & 4 && (E.totallyWorked = f[2]),
					s.$set(E),
					(!h || v & 1) && i !== (i = f[0] ? 'Pause' : 'Work') && P(l, i);
			},
			i(f) {
				h || (x(s.$$.fragment, f), (h = !0));
			},
			o(f) {
				$(s.$$.fragment, f), (h = !1);
			},
			d(f) {
				f && m(e), tt(s), f && m(r), f && m(t), (N = !1), et(w);
			}
		}
	);
}
function pt(c, e, s) {
	var A;
	let r = !1,
		t = [],
		o = '',
		i = '';
	const l = async () => {
		var h;
		s(8, (t = rt(await ot()))),
			t.length && s(0, (r = ((h = t.at(-1)) == null ? void 0 : h.isWorking) ?? !1));
	};
	st(() => {
		l();
	});
	const n = () => {
			s(0, (r = !r)), s(8, (t = nt(t, r)));
		},
		a = !!((A = navigator.canShare) != null && A.call(navigator, { text: '' })),
		u = () => {
			var f;
			const h = (f = t.find((v) => v.isWorking)) == null ? void 0 : f.timestamp.toFormat(B),
				N = t.findLast((v) => v.isWorking),
				w = ct(t);
			return `${h}	${N.timestamp.toFormat(B)}			${w}`;
		},
		_ = async () => {
			var N;
			const h = u();
			if ((N = navigator.canShare) != null && N.call(navigator, { text: h }))
				try {
					await navigator.share({ title: 'Share all barcodes', text: h }), console.log('shared', h);
				} catch (w) {
					console.error(w);
				}
			else {
				const w = document.createElement('a'),
					f = K.now().toFormat('yyyy-mm-dd');
				(w.href = window.URL.createObjectURL(
					new File([h], `report_${f}.txt`, { type: 'text/plain' })
				)),
					(w.download = f),
					w.click();
			}
		},
		d = () => {
			if (t.length) {
				const h = K.now();
				if (t[0].timestamp.day !== h.day) {
					S();
					return;
				}
				s(1, (o = h.diff(t.at(-1).timestamp).toFormat(B))), s(2, (i = lt(t)));
			}
			window.requestAnimationFrame(d);
		};
	window.requestAnimationFrame(d);
	let k;
	const S = () => {
		s(8, (t = [])), s(0, (r = !1)), it();
	};
	return (
		(c.$$.update = () => {
			c.$$.dirty & 257 &&
				(t.length
					? r
						? s(3, (k = F.Working))
						: s(3, (k = F.Chilling))
					: s(3, (k = F.NotStarted)));
		}),
		[r, o, i, k, n, a, _, S, t]
	);
}
class kt extends I {
	constructor(e) {
		super(), L(this, e, pt, ht, H, {});
	}
}
function vt(c) {
	let e, s, r, t, o, i;
	return (
		(document.title = e = Y + 'Time Tracker'),
		(o = new kt({})),
		{
			c() {
				(s = g('meta')), (r = O()), (t = g('div')), Q(o.$$.fragment), this.h();
			},
			l(l) {
				const n = at('svelte-jdu6ao', document.head);
				(s = b(n, 'META', { name: !0, content: !0 })),
					n.forEach(m),
					(r = q(l)),
					(t = b(l, 'DIV', { class: !0 }));
				var a = T(t);
				X(o.$$.fragment, a), a.forEach(m), this.h();
			},
			h() {
				y(s, 'name', 'description'),
					y(s, 'content', 'App to track working and rest time'),
					y(t, 'class', 'svelte-u4fm4p');
			},
			m(l, n) {
				p(document.head, s), W(l, r, n), W(l, t, n), Z(o, t, null), (i = !0);
			},
			p(l, [n]) {
				(!i || n & 0) && e !== (e = Y + 'Time Tracker') && (document.title = e);
			},
			i(l) {
				i || (x(o.$$.fragment, l), (i = !0));
			},
			o(l) {
				$(o.$$.fragment, l), (i = !1);
			},
			d(l) {
				m(s), l && m(r), l && m(t), tt(o);
			}
		}
	);
}
class Tt extends I {
	constructor(e) {
		super(), L(this, e, null, vt, H, {});
	}
}
export { Tt as default };
