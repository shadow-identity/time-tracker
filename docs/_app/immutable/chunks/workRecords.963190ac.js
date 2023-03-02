class P extends Error {}
class Cr extends P {
	constructor(e) {
		super(`Invalid DateTime: ${e.toMessage()}`);
	}
}
class Vr extends P {
	constructor(e) {
		super(`Invalid Interval: ${e.toMessage()}`);
	}
}
class Lr extends P {
	constructor(e) {
		super(`Invalid Duration: ${e.toMessage()}`);
	}
}
class ie extends P {}
class Nt extends P {
	constructor(e) {
		super(`Invalid unit ${e}`);
	}
}
class I extends P {}
class $ extends P {
	constructor() {
		super('Zone is an abstract class');
	}
}
const c = 'numeric',
	L = 'short',
	N = 'long',
	Oe = { year: c, month: c, day: c },
	Dt = { year: c, month: L, day: c },
	Ar = { year: c, month: L, day: c, weekday: L },
	It = { year: c, month: N, day: c },
	xt = { year: c, month: N, day: c, weekday: N },
	bt = { hour: c, minute: c },
	Ft = { hour: c, minute: c, second: c },
	Ct = { hour: c, minute: c, second: c, timeZoneName: L },
	Vt = { hour: c, minute: c, second: c, timeZoneName: N },
	Lt = { hour: c, minute: c, hourCycle: 'h23' },
	At = { hour: c, minute: c, second: c, hourCycle: 'h23' },
	Zt = { hour: c, minute: c, second: c, hourCycle: 'h23', timeZoneName: L },
	$t = { hour: c, minute: c, second: c, hourCycle: 'h23', timeZoneName: N },
	Wt = { year: c, month: c, day: c, hour: c, minute: c },
	Rt = { year: c, month: c, day: c, hour: c, minute: c, second: c },
	zt = { year: c, month: L, day: c, hour: c, minute: c },
	Ut = { year: c, month: L, day: c, hour: c, minute: c, second: c },
	Zr = { year: c, month: L, day: c, weekday: L, hour: c, minute: c },
	qt = { year: c, month: N, day: c, hour: c, minute: c, timeZoneName: L },
	Ht = { year: c, month: N, day: c, hour: c, minute: c, second: c, timeZoneName: L },
	Yt = { year: c, month: N, day: c, weekday: N, hour: c, minute: c, timeZoneName: N },
	Pt = { year: c, month: N, day: c, weekday: N, hour: c, minute: c, second: c, timeZoneName: N };
class le {
	get type() {
		throw new $();
	}
	get name() {
		throw new $();
	}
	get ianaName() {
		return this.name;
	}
	get isUniversal() {
		throw new $();
	}
	offsetName(e, t) {
		throw new $();
	}
	formatOffset(e, t) {
		throw new $();
	}
	offset(e) {
		throw new $();
	}
	equals(e) {
		throw new $();
	}
	get isValid() {
		throw new $();
	}
}
let be = null;
class Ee extends le {
	static get instance() {
		return be === null && (be = new Ee()), be;
	}
	get type() {
		return 'system';
	}
	get name() {
		return new Intl.DateTimeFormat().resolvedOptions().timeZone;
	}
	get isUniversal() {
		return !1;
	}
	offsetName(e, { format: t, locale: n }) {
		return _t(e, t, n);
	}
	formatOffset(e, t) {
		return ue(this.offset(e), t);
	}
	offset(e) {
		return -new Date(e).getTimezoneOffset();
	}
	equals(e) {
		return e.type === 'system';
	}
	get isValid() {
		return !0;
	}
}
let pe = {};
function $r(r) {
	return (
		pe[r] ||
			(pe[r] = new Intl.DateTimeFormat('en-US', {
				hour12: !1,
				timeZone: r,
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				era: 'short'
			})),
		pe[r]
	);
}
const Wr = { year: 0, month: 1, day: 2, era: 3, hour: 4, minute: 5, second: 6 };
function Rr(r, e) {
	const t = r.format(e).replace(/\u200E/g, ''),
		n = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(t),
		[, s, a, i, o, u, l, h] = n;
	return [i, s, a, o, u, l, h];
}
function zr(r, e) {
	const t = r.formatToParts(e),
		n = [];
	for (let s = 0; s < t.length; s++) {
		const { type: a, value: i } = t[s],
			o = Wr[a];
		a === 'era' ? (n[o] = i) : y(o) || (n[o] = parseInt(i, 10));
	}
	return n;
}
let me = {};
class Z extends le {
	static create(e) {
		return me[e] || (me[e] = new Z(e)), me[e];
	}
	static resetCache() {
		(me = {}), (pe = {});
	}
	static isValidSpecifier(e) {
		return this.isValidZone(e);
	}
	static isValidZone(e) {
		if (!e) return !1;
		try {
			return new Intl.DateTimeFormat('en-US', { timeZone: e }).format(), !0;
		} catch {
			return !1;
		}
	}
	constructor(e) {
		super(), (this.zoneName = e), (this.valid = Z.isValidZone(e));
	}
	get type() {
		return 'iana';
	}
	get name() {
		return this.zoneName;
	}
	get isUniversal() {
		return !1;
	}
	offsetName(e, { format: t, locale: n }) {
		return _t(e, t, n, this.name);
	}
	formatOffset(e, t) {
		return ue(this.offset(e), t);
	}
	offset(e) {
		const t = new Date(e);
		if (isNaN(t)) return NaN;
		const n = $r(this.name);
		let [s, a, i, o, u, l, h] = n.formatToParts ? zr(n, t) : Rr(n, t);
		o === 'BC' && (s = -Math.abs(s) + 1);
		const S = _e({
			year: s,
			month: a,
			day: i,
			hour: u === 24 ? 0 : u,
			minute: l,
			second: h,
			millisecond: 0
		});
		let d = +t;
		const O = d % 1e3;
		return (d -= O >= 0 ? O : 1e3 + O), (S - d) / (60 * 1e3);
	}
	equals(e) {
		return e.type === 'iana' && e.name === this.name;
	}
	get isValid() {
		return this.valid;
	}
}
let tt = {};
function Ur(r, e = {}) {
	const t = JSON.stringify([r, e]);
	let n = tt[t];
	return n || ((n = new Intl.ListFormat(r, e)), (tt[t] = n)), n;
}
let Re = {};
function ze(r, e = {}) {
	const t = JSON.stringify([r, e]);
	let n = Re[t];
	return n || ((n = new Intl.DateTimeFormat(r, e)), (Re[t] = n)), n;
}
let Ue = {};
function qr(r, e = {}) {
	const t = JSON.stringify([r, e]);
	let n = Ue[t];
	return n || ((n = new Intl.NumberFormat(r, e)), (Ue[t] = n)), n;
}
let qe = {};
function Hr(r, e = {}) {
	const { base: t, ...n } = e,
		s = JSON.stringify([r, n]);
	let a = qe[s];
	return a || ((a = new Intl.RelativeTimeFormat(r, e)), (qe[s] = a)), a;
}
let ae = null;
function Yr() {
	return ae || ((ae = new Intl.DateTimeFormat().resolvedOptions().locale), ae);
}
function Pr(r) {
	const e = r.indexOf('-x-');
	e !== -1 && (r = r.substring(0, e));
	const t = r.indexOf('-u-');
	if (t === -1) return [r];
	{
		let n, s;
		try {
			(n = ze(r).resolvedOptions()), (s = r);
		} catch {
			const u = r.substring(0, t);
			(n = ze(u).resolvedOptions()), (s = u);
		}
		const { numberingSystem: a, calendar: i } = n;
		return [s, a, i];
	}
}
function Gr(r, e, t) {
	return (
		(t || e) && (r.includes('-u-') || (r += '-u'), t && (r += `-ca-${t}`), e && (r += `-nu-${e}`)),
		r
	);
}
function _r(r) {
	const e = [];
	for (let t = 1; t <= 12; t++) {
		const n = f.utc(2016, t, 1);
		e.push(r(n));
	}
	return e;
}
function Jr(r) {
	const e = [];
	for (let t = 1; t <= 7; t++) {
		const n = f.utc(2016, 11, 13 + t);
		e.push(r(n));
	}
	return e;
}
function ye(r, e, t, n, s) {
	const a = r.listingMode(t);
	return a === 'error' ? null : a === 'en' ? n(e) : s(e);
}
function jr(r) {
	return r.numberingSystem && r.numberingSystem !== 'latn'
		? !1
		: r.numberingSystem === 'latn' ||
				!r.locale ||
				r.locale.startsWith('en') ||
				new Intl.DateTimeFormat(r.intl).resolvedOptions().numberingSystem === 'latn';
}
class Br {
	constructor(e, t, n) {
		(this.padTo = n.padTo || 0), (this.floor = n.floor || !1);
		const { padTo: s, floor: a, ...i } = n;
		if (!t || Object.keys(i).length > 0) {
			const o = { useGrouping: !1, ...n };
			n.padTo > 0 && (o.minimumIntegerDigits = n.padTo), (this.inf = qr(e, o));
		}
	}
	format(e) {
		if (this.inf) {
			const t = this.floor ? Math.floor(e) : e;
			return this.inf.format(t);
		} else {
			const t = this.floor ? Math.floor(e) : Ge(e, 3);
			return k(t, this.padTo);
		}
	}
}
class Kr {
	constructor(e, t, n) {
		this.opts = n;
		let s;
		if (e.zone.isUniversal) {
			const i = -1 * (e.offset / 60),
				o = i >= 0 ? `Etc/GMT+${i}` : `Etc/GMT${i}`;
			e.offset !== 0 && Z.create(o).valid
				? ((s = o), (this.dt = e))
				: ((s = 'UTC'),
				  n.timeZoneName
						? (this.dt = e)
						: (this.dt = e.offset === 0 ? e : f.fromMillis(e.ts + e.offset * 60 * 1e3)));
		} else e.zone.type === 'system' ? (this.dt = e) : ((this.dt = e), (s = e.zone.name));
		const a = { ...this.opts };
		(a.timeZone = a.timeZone || s), (this.dtf = ze(t, a));
	}
	format() {
		return this.dtf.format(this.dt.toJSDate());
	}
	formatToParts() {
		return this.dtf.formatToParts(this.dt.toJSDate());
	}
	resolvedOptions() {
		return this.dtf.resolvedOptions();
	}
}
class Qr {
	constructor(e, t, n) {
		(this.opts = { style: 'long', ...n }), !t && Gt() && (this.rtf = Hr(e, n));
	}
	format(e, t) {
		return this.rtf
			? this.rtf.format(e, t)
			: gn(t, e, this.opts.numeric, this.opts.style !== 'long');
	}
	formatToParts(e, t) {
		return this.rtf ? this.rtf.formatToParts(e, t) : [];
	}
}
class T {
	static fromOpts(e) {
		return T.create(e.locale, e.numberingSystem, e.outputCalendar, e.defaultToEN);
	}
	static create(e, t, n, s = !1) {
		const a = e || v.defaultLocale,
			i = a || (s ? 'en-US' : Yr()),
			o = t || v.defaultNumberingSystem,
			u = n || v.defaultOutputCalendar;
		return new T(i, o, u, a);
	}
	static resetCache() {
		(ae = null), (Re = {}), (Ue = {}), (qe = {});
	}
	static fromObject({ locale: e, numberingSystem: t, outputCalendar: n } = {}) {
		return T.create(e, t, n);
	}
	constructor(e, t, n, s) {
		const [a, i, o] = Pr(e);
		(this.locale = a),
			(this.numberingSystem = t || i || null),
			(this.outputCalendar = n || o || null),
			(this.intl = Gr(this.locale, this.numberingSystem, this.outputCalendar)),
			(this.weekdaysCache = { format: {}, standalone: {} }),
			(this.monthsCache = { format: {}, standalone: {} }),
			(this.meridiemCache = null),
			(this.eraCache = {}),
			(this.specifiedLocale = s),
			(this.fastNumbersCached = null);
	}
	get fastNumbers() {
		return (
			this.fastNumbersCached == null && (this.fastNumbersCached = jr(this)), this.fastNumbersCached
		);
	}
	listingMode() {
		const e = this.isEnglish(),
			t =
				(this.numberingSystem === null || this.numberingSystem === 'latn') &&
				(this.outputCalendar === null || this.outputCalendar === 'gregory');
		return e && t ? 'en' : 'intl';
	}
	clone(e) {
		return !e || Object.getOwnPropertyNames(e).length === 0
			? this
			: T.create(
					e.locale || this.specifiedLocale,
					e.numberingSystem || this.numberingSystem,
					e.outputCalendar || this.outputCalendar,
					e.defaultToEN || !1
			  );
	}
	redefaultToEN(e = {}) {
		return this.clone({ ...e, defaultToEN: !0 });
	}
	redefaultToSystem(e = {}) {
		return this.clone({ ...e, defaultToEN: !1 });
	}
	months(e, t = !1, n = !0) {
		return ye(this, e, n, Bt, () => {
			const s = t ? { month: e, day: 'numeric' } : { month: e },
				a = t ? 'format' : 'standalone';
			return (
				this.monthsCache[a][e] || (this.monthsCache[a][e] = _r((i) => this.extract(i, s, 'month'))),
				this.monthsCache[a][e]
			);
		});
	}
	weekdays(e, t = !1, n = !0) {
		return ye(this, e, n, Xt, () => {
			const s = t ? { weekday: e, year: 'numeric', month: 'long', day: 'numeric' } : { weekday: e },
				a = t ? 'format' : 'standalone';
			return (
				this.weekdaysCache[a][e] ||
					(this.weekdaysCache[a][e] = Jr((i) => this.extract(i, s, 'weekday'))),
				this.weekdaysCache[a][e]
			);
		});
	}
	meridiems(e = !0) {
		return ye(
			this,
			void 0,
			e,
			() => er,
			() => {
				if (!this.meridiemCache) {
					const t = { hour: 'numeric', hourCycle: 'h12' };
					this.meridiemCache = [f.utc(2016, 11, 13, 9), f.utc(2016, 11, 13, 19)].map((n) =>
						this.extract(n, t, 'dayperiod')
					);
				}
				return this.meridiemCache;
			}
		);
	}
	eras(e, t = !0) {
		return ye(this, e, t, tr, () => {
			const n = { era: e };
			return (
				this.eraCache[e] ||
					(this.eraCache[e] = [f.utc(-40, 1, 1), f.utc(2017, 1, 1)].map((s) =>
						this.extract(s, n, 'era')
					)),
				this.eraCache[e]
			);
		});
	}
	extract(e, t, n) {
		const s = this.dtFormatter(e, t),
			a = s.formatToParts(),
			i = a.find((o) => o.type.toLowerCase() === n);
		return i ? i.value : null;
	}
	numberFormatter(e = {}) {
		return new Br(this.intl, e.forceSimple || this.fastNumbers, e);
	}
	dtFormatter(e, t = {}) {
		return new Kr(e, this.intl, t);
	}
	relFormatter(e = {}) {
		return new Qr(this.intl, this.isEnglish(), e);
	}
	listFormatter(e = {}) {
		return Ur(this.intl, e);
	}
	isEnglish() {
		return (
			this.locale === 'en' ||
			this.locale.toLowerCase() === 'en-us' ||
			new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith('en-us')
		);
	}
	equals(e) {
		return (
			this.locale === e.locale &&
			this.numberingSystem === e.numberingSystem &&
			this.outputCalendar === e.outputCalendar
		);
	}
}
let Fe = null;
class E extends le {
	static get utcInstance() {
		return Fe === null && (Fe = new E(0)), Fe;
	}
	static instance(e) {
		return e === 0 ? E.utcInstance : new E(e);
	}
	static parseSpecifier(e) {
		if (e) {
			const t = e.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
			if (t) return new E(De(t[1], t[2]));
		}
		return null;
	}
	constructor(e) {
		super(), (this.fixed = e);
	}
	get type() {
		return 'fixed';
	}
	get name() {
		return this.fixed === 0 ? 'UTC' : `UTC${ue(this.fixed, 'narrow')}`;
	}
	get ianaName() {
		return this.fixed === 0 ? 'Etc/UTC' : `Etc/GMT${ue(-this.fixed, 'narrow')}`;
	}
	offsetName() {
		return this.name;
	}
	formatOffset(e, t) {
		return ue(this.fixed, t);
	}
	get isUniversal() {
		return !0;
	}
	offset() {
		return this.fixed;
	}
	equals(e) {
		return e.type === 'fixed' && e.fixed === this.fixed;
	}
	get isValid() {
		return !0;
	}
}
class Xr extends le {
	constructor(e) {
		super(), (this.zoneName = e);
	}
	get type() {
		return 'invalid';
	}
	get name() {
		return this.zoneName;
	}
	get isUniversal() {
		return !1;
	}
	offsetName() {
		return null;
	}
	formatOffset() {
		return '';
	}
	offset() {
		return NaN;
	}
	equals() {
		return !1;
	}
	get isValid() {
		return !1;
	}
}
function z(r, e) {
	if (y(r) || r === null) return e;
	if (r instanceof le) return r;
	if (en(r)) {
		const t = r.toLowerCase();
		return t === 'default'
			? e
			: t === 'local' || t === 'system'
			? Ee.instance
			: t === 'utc' || t === 'gmt'
			? E.utcInstance
			: E.parseSpecifier(t) || Z.create(r);
	} else
		return Y(r)
			? E.instance(r)
			: typeof r == 'object' && r.offset && typeof r.offset == 'number'
			? r
			: new Xr(r);
}
let rt = () => Date.now(),
	nt = 'system',
	st = null,
	it = null,
	at = null,
	ot = 60,
	ut;
class v {
	static get now() {
		return rt;
	}
	static set now(e) {
		rt = e;
	}
	static set defaultZone(e) {
		nt = e;
	}
	static get defaultZone() {
		return z(nt, Ee.instance);
	}
	static get defaultLocale() {
		return st;
	}
	static set defaultLocale(e) {
		st = e;
	}
	static get defaultNumberingSystem() {
		return it;
	}
	static set defaultNumberingSystem(e) {
		it = e;
	}
	static get defaultOutputCalendar() {
		return at;
	}
	static set defaultOutputCalendar(e) {
		at = e;
	}
	static get twoDigitCutoffYear() {
		return ot;
	}
	static set twoDigitCutoffYear(e) {
		ot = e % 100;
	}
	static get throwOnInvalid() {
		return ut;
	}
	static set throwOnInvalid(e) {
		ut = e;
	}
	static resetCaches() {
		T.resetCache(), Z.resetCache();
	}
}
function y(r) {
	return typeof r > 'u';
}
function Y(r) {
	return typeof r == 'number';
}
function Ne(r) {
	return typeof r == 'number' && r % 1 === 0;
}
function en(r) {
	return typeof r == 'string';
}
function tn(r) {
	return Object.prototype.toString.call(r) === '[object Date]';
}
function Gt() {
	try {
		return typeof Intl < 'u' && !!Intl.RelativeTimeFormat;
	} catch {
		return !1;
	}
}
function rn(r) {
	return Array.isArray(r) ? r : [r];
}
function lt(r, e, t) {
	if (r.length !== 0)
		return r.reduce((n, s) => {
			const a = [e(s), s];
			return n && t(n[0], a[0]) === n[0] ? n : a;
		}, null)[1];
}
function nn(r, e) {
	return e.reduce((t, n) => ((t[n] = r[n]), t), {});
}
function j(r, e) {
	return Object.prototype.hasOwnProperty.call(r, e);
}
function A(r, e, t) {
	return Ne(r) && r >= e && r <= t;
}
function sn(r, e) {
	return r - e * Math.floor(r / e);
}
function k(r, e = 2) {
	const t = r < 0;
	let n;
	return t ? (n = '-' + ('' + -r).padStart(e, '0')) : (n = ('' + r).padStart(e, '0')), n;
}
function R(r) {
	if (!(y(r) || r === null || r === '')) return parseInt(r, 10);
}
function q(r) {
	if (!(y(r) || r === null || r === '')) return parseFloat(r);
}
function Pe(r) {
	if (!(y(r) || r === null || r === '')) {
		const e = parseFloat('0.' + r) * 1e3;
		return Math.floor(e);
	}
}
function Ge(r, e, t = !1) {
	const n = 10 ** e;
	return (t ? Math.trunc : Math.round)(r * n) / n;
}
function ce(r) {
	return r % 4 === 0 && (r % 100 !== 0 || r % 400 === 0);
}
function oe(r) {
	return ce(r) ? 366 : 365;
}
function ve(r, e) {
	const t = sn(e - 1, 12) + 1,
		n = r + (e - t) / 12;
	return t === 2 ? (ce(n) ? 29 : 28) : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t - 1];
}
function _e(r) {
	let e = Date.UTC(r.year, r.month - 1, r.day, r.hour, r.minute, r.second, r.millisecond);
	return (
		r.year < 100 && r.year >= 0 && ((e = new Date(e)), e.setUTCFullYear(e.getUTCFullYear() - 1900)),
		+e
	);
}
function ke(r) {
	const e = (r + Math.floor(r / 4) - Math.floor(r / 100) + Math.floor(r / 400)) % 7,
		t = r - 1,
		n = (t + Math.floor(t / 4) - Math.floor(t / 100) + Math.floor(t / 400)) % 7;
	return e === 4 || n === 3 ? 53 : 52;
}
function He(r) {
	return r > 99 ? r : r > v.twoDigitCutoffYear ? 1900 + r : 2e3 + r;
}
function _t(r, e, t, n = null) {
	const s = new Date(r),
		a = {
			hourCycle: 'h23',
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit'
		};
	n && (a.timeZone = n);
	const i = { timeZoneName: e, ...a },
		o = new Intl.DateTimeFormat(t, i)
			.formatToParts(s)
			.find((u) => u.type.toLowerCase() === 'timezonename');
	return o ? o.value : null;
}
function De(r, e) {
	let t = parseInt(r, 10);
	Number.isNaN(t) && (t = 0);
	const n = parseInt(e, 10) || 0,
		s = t < 0 || Object.is(t, -0) ? -n : n;
	return t * 60 + s;
}
function Jt(r) {
	const e = Number(r);
	if (typeof r == 'boolean' || r === '' || Number.isNaN(e)) throw new I(`Invalid unit value ${r}`);
	return e;
}
function Me(r, e) {
	const t = {};
	for (const n in r)
		if (j(r, n)) {
			const s = r[n];
			if (s == null) continue;
			t[e(n)] = Jt(s);
		}
	return t;
}
function ue(r, e) {
	const t = Math.trunc(Math.abs(r / 60)),
		n = Math.trunc(Math.abs(r % 60)),
		s = r >= 0 ? '+' : '-';
	switch (e) {
		case 'short':
			return `${s}${k(t, 2)}:${k(n, 2)}`;
		case 'narrow':
			return `${s}${t}${n > 0 ? `:${n}` : ''}`;
		case 'techie':
			return `${s}${k(t, 2)}${k(n, 2)}`;
		default:
			throw new RangeError(`Value format ${e} is out of range for property format`);
	}
}
function Ie(r) {
	return nn(r, ['hour', 'minute', 'second', 'millisecond']);
}
const an = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	],
	jt = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	on = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
function Bt(r) {
	switch (r) {
		case 'narrow':
			return [...on];
		case 'short':
			return [...jt];
		case 'long':
			return [...an];
		case 'numeric':
			return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
		case '2-digit':
			return ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
		default:
			return null;
	}
}
const Kt = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
	Qt = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	un = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
function Xt(r) {
	switch (r) {
		case 'narrow':
			return [...un];
		case 'short':
			return [...Qt];
		case 'long':
			return [...Kt];
		case 'numeric':
			return ['1', '2', '3', '4', '5', '6', '7'];
		default:
			return null;
	}
}
const er = ['AM', 'PM'],
	ln = ['Before Christ', 'Anno Domini'],
	cn = ['BC', 'AD'],
	fn = ['B', 'A'];
function tr(r) {
	switch (r) {
		case 'narrow':
			return [...fn];
		case 'short':
			return [...cn];
		case 'long':
			return [...ln];
		default:
			return null;
	}
}
function dn(r) {
	return er[r.hour < 12 ? 0 : 1];
}
function hn(r, e) {
	return Xt(e)[r.weekday - 1];
}
function mn(r, e) {
	return Bt(e)[r.month - 1];
}
function yn(r, e) {
	return tr(e)[r.year < 0 ? 0 : 1];
}
function gn(r, e, t = 'always', n = !1) {
	const s = {
			years: ['year', 'yr.'],
			quarters: ['quarter', 'qtr.'],
			months: ['month', 'mo.'],
			weeks: ['week', 'wk.'],
			days: ['day', 'day', 'days'],
			hours: ['hour', 'hr.'],
			minutes: ['minute', 'min.'],
			seconds: ['second', 'sec.']
		},
		a = ['hours', 'minutes', 'seconds'].indexOf(r) === -1;
	if (t === 'auto' && a) {
		const p = r === 'days';
		switch (e) {
			case 1:
				return p ? 'tomorrow' : `next ${s[r][0]}`;
			case -1:
				return p ? 'yesterday' : `last ${s[r][0]}`;
			case 0:
				return p ? 'today' : `this ${s[r][0]}`;
		}
	}
	const i = Object.is(e, -0) || e < 0,
		o = Math.abs(e),
		u = o === 1,
		l = s[r],
		h = n ? (u ? l[1] : l[2] || l[1]) : u ? s[r][0] : r;
	return i ? `${o} ${h} ago` : `in ${o} ${h}`;
}
function ct(r, e) {
	let t = '';
	for (const n of r) n.literal ? (t += n.val) : (t += e(n.val));
	return t;
}
const wn = {
	D: Oe,
	DD: Dt,
	DDD: It,
	DDDD: xt,
	t: bt,
	tt: Ft,
	ttt: Ct,
	tttt: Vt,
	T: Lt,
	TT: At,
	TTT: Zt,
	TTTT: $t,
	f: Wt,
	ff: zt,
	fff: qt,
	ffff: Yt,
	F: Rt,
	FF: Ut,
	FFF: Ht,
	FFFF: Pt
};
class M {
	static create(e, t = {}) {
		return new M(e, t);
	}
	static parseFormat(e) {
		let t = null,
			n = '',
			s = !1;
		const a = [];
		for (let i = 0; i < e.length; i++) {
			const o = e.charAt(i);
			o === "'"
				? (n.length > 0 && a.push({ literal: s, val: n }), (t = null), (n = ''), (s = !s))
				: s || o === t
				? (n += o)
				: (n.length > 0 && a.push({ literal: !1, val: n }), (n = o), (t = o));
		}
		return n.length > 0 && a.push({ literal: s, val: n }), a;
	}
	static macroTokenToFormatOpts(e) {
		return wn[e];
	}
	constructor(e, t) {
		(this.opts = t), (this.loc = e), (this.systemLoc = null);
	}
	formatWithSystemDefault(e, t) {
		return (
			this.systemLoc === null && (this.systemLoc = this.loc.redefaultToSystem()),
			this.systemLoc.dtFormatter(e, { ...this.opts, ...t }).format()
		);
	}
	formatDateTime(e, t = {}) {
		return this.loc.dtFormatter(e, { ...this.opts, ...t }).format();
	}
	formatDateTimeParts(e, t = {}) {
		return this.loc.dtFormatter(e, { ...this.opts, ...t }).formatToParts();
	}
	formatInterval(e, t = {}) {
		return this.loc
			.dtFormatter(e.start, { ...this.opts, ...t })
			.dtf.formatRange(e.start.toJSDate(), e.end.toJSDate());
	}
	resolvedOptions(e, t = {}) {
		return this.loc.dtFormatter(e, { ...this.opts, ...t }).resolvedOptions();
	}
	num(e, t = 0) {
		if (this.opts.forceSimple) return k(e, t);
		const n = { ...this.opts };
		return t > 0 && (n.padTo = t), this.loc.numberFormatter(n).format(e);
	}
	formatDateTimeFromString(e, t) {
		const n = this.loc.listingMode() === 'en',
			s = this.loc.outputCalendar && this.loc.outputCalendar !== 'gregory',
			a = (d, O) => this.loc.extract(e, d, O),
			i = (d) =>
				e.isOffsetFixed && e.offset === 0 && d.allowZ
					? 'Z'
					: e.isValid
					? e.zone.formatOffset(e.ts, d.format)
					: '',
			o = () => (n ? dn(e) : a({ hour: 'numeric', hourCycle: 'h12' }, 'dayperiod')),
			u = (d, O) => (n ? mn(e, d) : a(O ? { month: d } : { month: d, day: 'numeric' }, 'month')),
			l = (d, O) =>
				n
					? hn(e, d)
					: a(O ? { weekday: d } : { weekday: d, month: 'long', day: 'numeric' }, 'weekday'),
			h = (d) => {
				const O = M.macroTokenToFormatOpts(d);
				return O ? this.formatWithSystemDefault(e, O) : d;
			},
			p = (d) => (n ? yn(e, d) : a({ era: d }, 'era')),
			S = (d) => {
				switch (d) {
					case 'S':
						return this.num(e.millisecond);
					case 'u':
					case 'SSS':
						return this.num(e.millisecond, 3);
					case 's':
						return this.num(e.second);
					case 'ss':
						return this.num(e.second, 2);
					case 'uu':
						return this.num(Math.floor(e.millisecond / 10), 2);
					case 'uuu':
						return this.num(Math.floor(e.millisecond / 100));
					case 'm':
						return this.num(e.minute);
					case 'mm':
						return this.num(e.minute, 2);
					case 'h':
						return this.num(e.hour % 12 === 0 ? 12 : e.hour % 12);
					case 'hh':
						return this.num(e.hour % 12 === 0 ? 12 : e.hour % 12, 2);
					case 'H':
						return this.num(e.hour);
					case 'HH':
						return this.num(e.hour, 2);
					case 'Z':
						return i({ format: 'narrow', allowZ: this.opts.allowZ });
					case 'ZZ':
						return i({ format: 'short', allowZ: this.opts.allowZ });
					case 'ZZZ':
						return i({ format: 'techie', allowZ: this.opts.allowZ });
					case 'ZZZZ':
						return e.zone.offsetName(e.ts, { format: 'short', locale: this.loc.locale });
					case 'ZZZZZ':
						return e.zone.offsetName(e.ts, { format: 'long', locale: this.loc.locale });
					case 'z':
						return e.zoneName;
					case 'a':
						return o();
					case 'd':
						return s ? a({ day: 'numeric' }, 'day') : this.num(e.day);
					case 'dd':
						return s ? a({ day: '2-digit' }, 'day') : this.num(e.day, 2);
					case 'c':
						return this.num(e.weekday);
					case 'ccc':
						return l('short', !0);
					case 'cccc':
						return l('long', !0);
					case 'ccccc':
						return l('narrow', !0);
					case 'E':
						return this.num(e.weekday);
					case 'EEE':
						return l('short', !1);
					case 'EEEE':
						return l('long', !1);
					case 'EEEEE':
						return l('narrow', !1);
					case 'L':
						return s ? a({ month: 'numeric', day: 'numeric' }, 'month') : this.num(e.month);
					case 'LL':
						return s ? a({ month: '2-digit', day: 'numeric' }, 'month') : this.num(e.month, 2);
					case 'LLL':
						return u('short', !0);
					case 'LLLL':
						return u('long', !0);
					case 'LLLLL':
						return u('narrow', !0);
					case 'M':
						return s ? a({ month: 'numeric' }, 'month') : this.num(e.month);
					case 'MM':
						return s ? a({ month: '2-digit' }, 'month') : this.num(e.month, 2);
					case 'MMM':
						return u('short', !1);
					case 'MMMM':
						return u('long', !1);
					case 'MMMMM':
						return u('narrow', !1);
					case 'y':
						return s ? a({ year: 'numeric' }, 'year') : this.num(e.year);
					case 'yy':
						return s ? a({ year: '2-digit' }, 'year') : this.num(e.year.toString().slice(-2), 2);
					case 'yyyy':
						return s ? a({ year: 'numeric' }, 'year') : this.num(e.year, 4);
					case 'yyyyyy':
						return s ? a({ year: 'numeric' }, 'year') : this.num(e.year, 6);
					case 'G':
						return p('short');
					case 'GG':
						return p('long');
					case 'GGGGG':
						return p('narrow');
					case 'kk':
						return this.num(e.weekYear.toString().slice(-2), 2);
					case 'kkkk':
						return this.num(e.weekYear, 4);
					case 'W':
						return this.num(e.weekNumber);
					case 'WW':
						return this.num(e.weekNumber, 2);
					case 'o':
						return this.num(e.ordinal);
					case 'ooo':
						return this.num(e.ordinal, 3);
					case 'q':
						return this.num(e.quarter);
					case 'qq':
						return this.num(e.quarter, 2);
					case 'X':
						return this.num(Math.floor(e.ts / 1e3));
					case 'x':
						return this.num(e.ts);
					default:
						return h(d);
				}
			};
		return ct(M.parseFormat(t), S);
	}
	formatDurationFromString(e, t) {
		const n = (u) => {
				switch (u[0]) {
					case 'S':
						return 'millisecond';
					case 's':
						return 'second';
					case 'm':
						return 'minute';
					case 'h':
						return 'hour';
					case 'd':
						return 'day';
					case 'w':
						return 'week';
					case 'M':
						return 'month';
					case 'y':
						return 'year';
					default:
						return null;
				}
			},
			s = (u) => (l) => {
				const h = n(l);
				return h ? this.num(u.get(h), l.length) : l;
			},
			a = M.parseFormat(t),
			i = a.reduce((u, { literal: l, val: h }) => (l ? u : u.concat(h)), []),
			o = e.shiftTo(...i.map(n).filter((u) => u));
		return ct(a, s(o));
	}
}
class V {
	constructor(e, t) {
		(this.reason = e), (this.explanation = t);
	}
	toMessage() {
		return this.explanation ? `${this.reason}: ${this.explanation}` : this.reason;
	}
}
const rr = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
function K(...r) {
	const e = r.reduce((t, n) => t + n.source, '');
	return RegExp(`^${e}$`);
}
function Q(...r) {
	return (e) =>
		r
			.reduce(
				([t, n, s], a) => {
					const [i, o, u] = a(e, s);
					return [{ ...t, ...i }, o || n, u];
				},
				[{}, null, 1]
			)
			.slice(0, 2);
}
function X(r, ...e) {
	if (r == null) return [null, null];
	for (const [t, n] of e) {
		const s = t.exec(r);
		if (s) return n(s);
	}
	return [null, null];
}
function nr(...r) {
	return (e, t) => {
		const n = {};
		let s;
		for (s = 0; s < r.length; s++) n[r[s]] = R(e[t + s]);
		return [n, null, t + s];
	};
}
const sr = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/,
	Tn = `(?:${sr.source}?(?:\\[(${rr.source})\\])?)?`,
	Je = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,
	ir = RegExp(`${Je.source}${Tn}`),
	je = RegExp(`(?:T${ir.source})?`),
	pn = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,
	Sn = /(\d{4})-?W(\d\d)(?:-?(\d))?/,
	On = /(\d{4})-?(\d{3})/,
	vn = nr('weekYear', 'weekNumber', 'weekDay'),
	kn = nr('year', 'ordinal'),
	Mn = /(\d{4})-(\d\d)-(\d\d)/,
	ar = RegExp(`${Je.source} ?(?:${sr.source}|(${rr.source}))?`),
	En = RegExp(`(?: ${ar.source})?`);
function J(r, e, t) {
	const n = r[e];
	return y(n) ? t : R(n);
}
function Nn(r, e) {
	return [{ year: J(r, e), month: J(r, e + 1, 1), day: J(r, e + 2, 1) }, null, e + 3];
}
function ee(r, e) {
	return [
		{
			hours: J(r, e, 0),
			minutes: J(r, e + 1, 0),
			seconds: J(r, e + 2, 0),
			milliseconds: Pe(r[e + 3])
		},
		null,
		e + 4
	];
}
function fe(r, e) {
	const t = !r[e] && !r[e + 1],
		n = De(r[e + 1], r[e + 2]),
		s = t ? null : E.instance(n);
	return [{}, s, e + 3];
}
function de(r, e) {
	const t = r[e] ? Z.create(r[e]) : null;
	return [{}, t, e + 1];
}
const Dn = RegExp(`^T?${Je.source}$`),
	In =
		/^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function xn(r) {
	const [e, t, n, s, a, i, o, u, l] = r,
		h = e[0] === '-',
		p = u && u[0] === '-',
		S = (d, O = !1) => (d !== void 0 && (O || (d && h)) ? -d : d);
	return [
		{
			years: S(q(t)),
			months: S(q(n)),
			weeks: S(q(s)),
			days: S(q(a)),
			hours: S(q(i)),
			minutes: S(q(o)),
			seconds: S(q(u), u === '-0'),
			milliseconds: S(Pe(l), p)
		}
	];
}
const bn = {
	GMT: 0,
	EDT: -4 * 60,
	EST: -5 * 60,
	CDT: -5 * 60,
	CST: -6 * 60,
	MDT: -6 * 60,
	MST: -7 * 60,
	PDT: -7 * 60,
	PST: -8 * 60
};
function Be(r, e, t, n, s, a, i) {
	const o = {
		year: e.length === 2 ? He(R(e)) : R(e),
		month: jt.indexOf(t) + 1,
		day: R(n),
		hour: R(s),
		minute: R(a)
	};
	return (
		i && (o.second = R(i)),
		r && (o.weekday = r.length > 3 ? Kt.indexOf(r) + 1 : Qt.indexOf(r) + 1),
		o
	);
}
const Fn =
	/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function Cn(r) {
	const [, e, t, n, s, a, i, o, u, l, h, p] = r,
		S = Be(e, s, n, t, a, i, o);
	let d;
	return u ? (d = bn[u]) : l ? (d = 0) : (d = De(h, p)), [S, new E(d)];
}
function Vn(r) {
	return r
		.replace(/\([^()]*\)|[\n\t]/g, ' ')
		.replace(/(\s\s+)/g, ' ')
		.trim();
}
const Ln =
		/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,
	An =
		/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,
	Zn =
		/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function ft(r) {
	const [, e, t, n, s, a, i, o] = r;
	return [Be(e, s, n, t, a, i, o), E.utcInstance];
}
function $n(r) {
	const [, e, t, n, s, a, i, o] = r;
	return [Be(e, o, t, n, s, a, i), E.utcInstance];
}
const Wn = K(pn, je),
	Rn = K(Sn, je),
	zn = K(On, je),
	Un = K(ir),
	or = Q(Nn, ee, fe, de),
	qn = Q(vn, ee, fe, de),
	Hn = Q(kn, ee, fe, de),
	Yn = Q(ee, fe, de);
function Pn(r) {
	return X(r, [Wn, or], [Rn, qn], [zn, Hn], [Un, Yn]);
}
function Gn(r) {
	return X(Vn(r), [Fn, Cn]);
}
function _n(r) {
	return X(r, [Ln, ft], [An, ft], [Zn, $n]);
}
function Jn(r) {
	return X(r, [In, xn]);
}
const jn = Q(ee);
function Bn(r) {
	return X(r, [Dn, jn]);
}
const Kn = K(Mn, En),
	Qn = K(ar),
	Xn = Q(ee, fe, de);
function es(r) {
	return X(r, [Kn, or], [Qn, Xn]);
}
const ts = 'Invalid Duration',
	ur = {
		weeks: {
			days: 7,
			hours: 7 * 24,
			minutes: 7 * 24 * 60,
			seconds: 7 * 24 * 60 * 60,
			milliseconds: 7 * 24 * 60 * 60 * 1e3
		},
		days: { hours: 24, minutes: 24 * 60, seconds: 24 * 60 * 60, milliseconds: 24 * 60 * 60 * 1e3 },
		hours: { minutes: 60, seconds: 60 * 60, milliseconds: 60 * 60 * 1e3 },
		minutes: { seconds: 60, milliseconds: 60 * 1e3 },
		seconds: { milliseconds: 1e3 }
	},
	rs = {
		years: {
			quarters: 4,
			months: 12,
			weeks: 52,
			days: 365,
			hours: 365 * 24,
			minutes: 365 * 24 * 60,
			seconds: 365 * 24 * 60 * 60,
			milliseconds: 365 * 24 * 60 * 60 * 1e3
		},
		quarters: {
			months: 3,
			weeks: 13,
			days: 91,
			hours: 91 * 24,
			minutes: 91 * 24 * 60,
			seconds: 91 * 24 * 60 * 60,
			milliseconds: 91 * 24 * 60 * 60 * 1e3
		},
		months: {
			weeks: 4,
			days: 30,
			hours: 30 * 24,
			minutes: 30 * 24 * 60,
			seconds: 30 * 24 * 60 * 60,
			milliseconds: 30 * 24 * 60 * 60 * 1e3
		},
		...ur
	},
	D = 146097 / 400,
	G = 146097 / 4800,
	ns = {
		years: {
			quarters: 4,
			months: 12,
			weeks: D / 7,
			days: D,
			hours: D * 24,
			minutes: D * 24 * 60,
			seconds: D * 24 * 60 * 60,
			milliseconds: D * 24 * 60 * 60 * 1e3
		},
		quarters: {
			months: 3,
			weeks: D / 28,
			days: D / 4,
			hours: (D * 24) / 4,
			minutes: (D * 24 * 60) / 4,
			seconds: (D * 24 * 60 * 60) / 4,
			milliseconds: (D * 24 * 60 * 60 * 1e3) / 4
		},
		months: {
			weeks: G / 7,
			days: G,
			hours: G * 24,
			minutes: G * 24 * 60,
			seconds: G * 24 * 60 * 60,
			milliseconds: G * 24 * 60 * 60 * 1e3
		},
		...ur
	},
	H = [
		'years',
		'quarters',
		'months',
		'weeks',
		'days',
		'hours',
		'minutes',
		'seconds',
		'milliseconds'
	],
	ss = H.slice(0).reverse();
function W(r, e, t = !1) {
	const n = {
		values: t ? e.values : { ...r.values, ...(e.values || {}) },
		loc: r.loc.clone(e.loc),
		conversionAccuracy: e.conversionAccuracy || r.conversionAccuracy,
		matrix: e.matrix || r.matrix
	};
	return new m(n);
}
function is(r) {
	return r < 0 ? Math.floor(r) : Math.ceil(r);
}
function lr(r, e, t, n, s) {
	const a = r[s][t],
		i = e[t] / a,
		o = Math.sign(i) === Math.sign(n[s]),
		u = !o && n[s] !== 0 && Math.abs(i) <= 1 ? is(i) : Math.trunc(i);
	(n[s] += u), (e[t] -= u * a);
}
function as(r, e) {
	ss.reduce((t, n) => (y(e[n]) ? t : (t && lr(r, e, t, e, n), n)), null);
}
function os(r) {
	const e = {};
	for (const [t, n] of Object.entries(r)) n !== 0 && (e[t] = n);
	return e;
}
class m {
	constructor(e) {
		const t = e.conversionAccuracy === 'longterm' || !1;
		let n = t ? ns : rs;
		e.matrix && (n = e.matrix),
			(this.values = e.values),
			(this.loc = e.loc || T.create()),
			(this.conversionAccuracy = t ? 'longterm' : 'casual'),
			(this.invalid = e.invalid || null),
			(this.matrix = n),
			(this.isLuxonDuration = !0);
	}
	static fromMillis(e, t) {
		return m.fromObject({ milliseconds: e }, t);
	}
	static fromObject(e, t = {}) {
		if (e == null || typeof e != 'object')
			throw new I(
				`Duration.fromObject: argument expected to be an object, got ${
					e === null ? 'null' : typeof e
				}`
			);
		return new m({
			values: Me(e, m.normalizeUnit),
			loc: T.fromObject(t),
			conversionAccuracy: t.conversionAccuracy,
			matrix: t.matrix
		});
	}
	static fromDurationLike(e) {
		if (Y(e)) return m.fromMillis(e);
		if (m.isDuration(e)) return e;
		if (typeof e == 'object') return m.fromObject(e);
		throw new I(`Unknown duration argument ${e} of type ${typeof e}`);
	}
	static fromISO(e, t) {
		const [n] = Jn(e);
		return n
			? m.fromObject(n, t)
			: m.invalid('unparsable', `the input "${e}" can't be parsed as ISO 8601`);
	}
	static fromISOTime(e, t) {
		const [n] = Bn(e);
		return n
			? m.fromObject(n, t)
			: m.invalid('unparsable', `the input "${e}" can't be parsed as ISO 8601`);
	}
	static invalid(e, t = null) {
		if (!e) throw new I('need to specify a reason the Duration is invalid');
		const n = e instanceof V ? e : new V(e, t);
		if (v.throwOnInvalid) throw new Lr(n);
		return new m({ invalid: n });
	}
	static normalizeUnit(e) {
		const t = {
			year: 'years',
			years: 'years',
			quarter: 'quarters',
			quarters: 'quarters',
			month: 'months',
			months: 'months',
			week: 'weeks',
			weeks: 'weeks',
			day: 'days',
			days: 'days',
			hour: 'hours',
			hours: 'hours',
			minute: 'minutes',
			minutes: 'minutes',
			second: 'seconds',
			seconds: 'seconds',
			millisecond: 'milliseconds',
			milliseconds: 'milliseconds'
		}[e && e.toLowerCase()];
		if (!t) throw new Nt(e);
		return t;
	}
	static isDuration(e) {
		return (e && e.isLuxonDuration) || !1;
	}
	get locale() {
		return this.isValid ? this.loc.locale : null;
	}
	get numberingSystem() {
		return this.isValid ? this.loc.numberingSystem : null;
	}
	toFormat(e, t = {}) {
		const n = { ...t, floor: t.round !== !1 && t.floor !== !1 };
		return this.isValid ? M.create(this.loc, n).formatDurationFromString(this, e) : ts;
	}
	toHuman(e = {}) {
		const t = H.map((n) => {
			const s = this.values[n];
			return y(s)
				? null
				: this.loc
						.numberFormatter({ style: 'unit', unitDisplay: 'long', ...e, unit: n.slice(0, -1) })
						.format(s);
		}).filter((n) => n);
		return this.loc
			.listFormatter({ type: 'conjunction', style: e.listStyle || 'narrow', ...e })
			.format(t);
	}
	toObject() {
		return this.isValid ? { ...this.values } : {};
	}
	toISO() {
		if (!this.isValid) return null;
		let e = 'P';
		return (
			this.years !== 0 && (e += this.years + 'Y'),
			(this.months !== 0 || this.quarters !== 0) && (e += this.months + this.quarters * 3 + 'M'),
			this.weeks !== 0 && (e += this.weeks + 'W'),
			this.days !== 0 && (e += this.days + 'D'),
			(this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) &&
				(e += 'T'),
			this.hours !== 0 && (e += this.hours + 'H'),
			this.minutes !== 0 && (e += this.minutes + 'M'),
			(this.seconds !== 0 || this.milliseconds !== 0) &&
				(e += Ge(this.seconds + this.milliseconds / 1e3, 3) + 'S'),
			e === 'P' && (e += 'T0S'),
			e
		);
	}
	toISOTime(e = {}) {
		if (!this.isValid) return null;
		const t = this.toMillis();
		if (t < 0 || t >= 864e5) return null;
		e = {
			suppressMilliseconds: !1,
			suppressSeconds: !1,
			includePrefix: !1,
			format: 'extended',
			...e
		};
		const n = this.shiftTo('hours', 'minutes', 'seconds', 'milliseconds');
		let s = e.format === 'basic' ? 'hhmm' : 'hh:mm';
		(!e.suppressSeconds || n.seconds !== 0 || n.milliseconds !== 0) &&
			((s += e.format === 'basic' ? 'ss' : ':ss'),
			(!e.suppressMilliseconds || n.milliseconds !== 0) && (s += '.SSS'));
		let a = n.toFormat(s);
		return e.includePrefix && (a = 'T' + a), a;
	}
	toJSON() {
		return this.toISO();
	}
	toString() {
		return this.toISO();
	}
	toMillis() {
		return this.as('milliseconds');
	}
	valueOf() {
		return this.toMillis();
	}
	plus(e) {
		if (!this.isValid) return this;
		const t = m.fromDurationLike(e),
			n = {};
		for (const s of H) (j(t.values, s) || j(this.values, s)) && (n[s] = t.get(s) + this.get(s));
		return W(this, { values: n }, !0);
	}
	minus(e) {
		if (!this.isValid) return this;
		const t = m.fromDurationLike(e);
		return this.plus(t.negate());
	}
	mapUnits(e) {
		if (!this.isValid) return this;
		const t = {};
		for (const n of Object.keys(this.values)) t[n] = Jt(e(this.values[n], n));
		return W(this, { values: t }, !0);
	}
	get(e) {
		return this[m.normalizeUnit(e)];
	}
	set(e) {
		if (!this.isValid) return this;
		const t = { ...this.values, ...Me(e, m.normalizeUnit) };
		return W(this, { values: t });
	}
	reconfigure({ locale: e, numberingSystem: t, conversionAccuracy: n, matrix: s } = {}) {
		const i = {
			loc: this.loc.clone({ locale: e, numberingSystem: t }),
			matrix: s,
			conversionAccuracy: n
		};
		return W(this, i);
	}
	as(e) {
		return this.isValid ? this.shiftTo(e).get(e) : NaN;
	}
	normalize() {
		if (!this.isValid) return this;
		const e = this.toObject();
		return as(this.matrix, e), W(this, { values: e }, !0);
	}
	rescale() {
		if (!this.isValid) return this;
		const e = os(this.normalize().shiftToAll().toObject());
		return W(this, { values: e }, !0);
	}
	shiftTo(...e) {
		if (!this.isValid) return this;
		if (e.length === 0) return this;
		e = e.map((i) => m.normalizeUnit(i));
		const t = {},
			n = {},
			s = this.toObject();
		let a;
		for (const i of H)
			if (e.indexOf(i) >= 0) {
				a = i;
				let o = 0;
				for (const l in n) (o += this.matrix[l][i] * n[l]), (n[l] = 0);
				Y(s[i]) && (o += s[i]);
				const u = Math.trunc(o);
				(t[i] = u), (n[i] = (o * 1e3 - u * 1e3) / 1e3);
				for (const l in s) H.indexOf(l) > H.indexOf(i) && lr(this.matrix, s, l, t, i);
			} else Y(s[i]) && (n[i] = s[i]);
		for (const i in n) n[i] !== 0 && (t[a] += i === a ? n[i] : n[i] / this.matrix[a][i]);
		return W(this, { values: t }, !0).normalize();
	}
	shiftToAll() {
		return this.isValid
			? this.shiftTo(
					'years',
					'months',
					'weeks',
					'days',
					'hours',
					'minutes',
					'seconds',
					'milliseconds'
			  )
			: this;
	}
	negate() {
		if (!this.isValid) return this;
		const e = {};
		for (const t of Object.keys(this.values)) e[t] = this.values[t] === 0 ? 0 : -this.values[t];
		return W(this, { values: e }, !0);
	}
	get years() {
		return this.isValid ? this.values.years || 0 : NaN;
	}
	get quarters() {
		return this.isValid ? this.values.quarters || 0 : NaN;
	}
	get months() {
		return this.isValid ? this.values.months || 0 : NaN;
	}
	get weeks() {
		return this.isValid ? this.values.weeks || 0 : NaN;
	}
	get days() {
		return this.isValid ? this.values.days || 0 : NaN;
	}
	get hours() {
		return this.isValid ? this.values.hours || 0 : NaN;
	}
	get minutes() {
		return this.isValid ? this.values.minutes || 0 : NaN;
	}
	get seconds() {
		return this.isValid ? this.values.seconds || 0 : NaN;
	}
	get milliseconds() {
		return this.isValid ? this.values.milliseconds || 0 : NaN;
	}
	get isValid() {
		return this.invalid === null;
	}
	get invalidReason() {
		return this.invalid ? this.invalid.reason : null;
	}
	get invalidExplanation() {
		return this.invalid ? this.invalid.explanation : null;
	}
	equals(e) {
		if (!this.isValid || !e.isValid || !this.loc.equals(e.loc)) return !1;
		function t(n, s) {
			return n === void 0 || n === 0 ? s === void 0 || s === 0 : n === s;
		}
		for (const n of H) if (!t(this.values[n], e.values[n])) return !1;
		return !0;
	}
}
const _ = 'Invalid Interval';
function us(r, e) {
	return !r || !r.isValid
		? w.invalid('missing or invalid start')
		: !e || !e.isValid
		? w.invalid('missing or invalid end')
		: e < r
		? w.invalid(
				'end before start',
				`The end of an interval must be after its start, but you had start=${r.toISO()} and end=${e.toISO()}`
		  )
		: null;
}
class w {
	constructor(e) {
		(this.s = e.start),
			(this.e = e.end),
			(this.invalid = e.invalid || null),
			(this.isLuxonInterval = !0);
	}
	static invalid(e, t = null) {
		if (!e) throw new I('need to specify a reason the Interval is invalid');
		const n = e instanceof V ? e : new V(e, t);
		if (v.throwOnInvalid) throw new Vr(n);
		return new w({ invalid: n });
	}
	static fromDateTimes(e, t) {
		const n = se(e),
			s = se(t),
			a = us(n, s);
		return a ?? new w({ start: n, end: s });
	}
	static after(e, t) {
		const n = m.fromDurationLike(t),
			s = se(e);
		return w.fromDateTimes(s, s.plus(n));
	}
	static before(e, t) {
		const n = m.fromDurationLike(t),
			s = se(e);
		return w.fromDateTimes(s.minus(n), s);
	}
	static fromISO(e, t) {
		const [n, s] = (e || '').split('/', 2);
		if (n && s) {
			let a, i;
			try {
				(a = f.fromISO(n, t)), (i = a.isValid);
			} catch {
				i = !1;
			}
			let o, u;
			try {
				(o = f.fromISO(s, t)), (u = o.isValid);
			} catch {
				u = !1;
			}
			if (i && u) return w.fromDateTimes(a, o);
			if (i) {
				const l = m.fromISO(s, t);
				if (l.isValid) return w.after(a, l);
			} else if (u) {
				const l = m.fromISO(n, t);
				if (l.isValid) return w.before(o, l);
			}
		}
		return w.invalid('unparsable', `the input "${e}" can't be parsed as ISO 8601`);
	}
	static isInterval(e) {
		return (e && e.isLuxonInterval) || !1;
	}
	get start() {
		return this.isValid ? this.s : null;
	}
	get end() {
		return this.isValid ? this.e : null;
	}
	get isValid() {
		return this.invalidReason === null;
	}
	get invalidReason() {
		return this.invalid ? this.invalid.reason : null;
	}
	get invalidExplanation() {
		return this.invalid ? this.invalid.explanation : null;
	}
	length(e = 'milliseconds') {
		return this.isValid ? this.toDuration(e).get(e) : NaN;
	}
	count(e = 'milliseconds') {
		if (!this.isValid) return NaN;
		const t = this.start.startOf(e),
			n = this.end.startOf(e);
		return Math.floor(n.diff(t, e).get(e)) + 1;
	}
	hasSame(e) {
		return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, e) : !1;
	}
	isEmpty() {
		return this.s.valueOf() === this.e.valueOf();
	}
	isAfter(e) {
		return this.isValid ? this.s > e : !1;
	}
	isBefore(e) {
		return this.isValid ? this.e <= e : !1;
	}
	contains(e) {
		return this.isValid ? this.s <= e && this.e > e : !1;
	}
	set({ start: e, end: t } = {}) {
		return this.isValid ? w.fromDateTimes(e || this.s, t || this.e) : this;
	}
	splitAt(...e) {
		if (!this.isValid) return [];
		const t = e
				.map(se)
				.filter((i) => this.contains(i))
				.sort(),
			n = [];
		let { s } = this,
			a = 0;
		for (; s < this.e; ) {
			const i = t[a] || this.e,
				o = +i > +this.e ? this.e : i;
			n.push(w.fromDateTimes(s, o)), (s = o), (a += 1);
		}
		return n;
	}
	splitBy(e) {
		const t = m.fromDurationLike(e);
		if (!this.isValid || !t.isValid || t.as('milliseconds') === 0) return [];
		let { s: n } = this,
			s = 1,
			a;
		const i = [];
		for (; n < this.e; ) {
			const o = this.start.plus(t.mapUnits((u) => u * s));
			(a = +o > +this.e ? this.e : o), i.push(w.fromDateTimes(n, a)), (n = a), (s += 1);
		}
		return i;
	}
	divideEqually(e) {
		return this.isValid ? this.splitBy(this.length() / e).slice(0, e) : [];
	}
	overlaps(e) {
		return this.e > e.s && this.s < e.e;
	}
	abutsStart(e) {
		return this.isValid ? +this.e == +e.s : !1;
	}
	abutsEnd(e) {
		return this.isValid ? +e.e == +this.s : !1;
	}
	engulfs(e) {
		return this.isValid ? this.s <= e.s && this.e >= e.e : !1;
	}
	equals(e) {
		return !this.isValid || !e.isValid ? !1 : this.s.equals(e.s) && this.e.equals(e.e);
	}
	intersection(e) {
		if (!this.isValid) return this;
		const t = this.s > e.s ? this.s : e.s,
			n = this.e < e.e ? this.e : e.e;
		return t >= n ? null : w.fromDateTimes(t, n);
	}
	union(e) {
		if (!this.isValid) return this;
		const t = this.s < e.s ? this.s : e.s,
			n = this.e > e.e ? this.e : e.e;
		return w.fromDateTimes(t, n);
	}
	static merge(e) {
		const [t, n] = e
			.sort((s, a) => s.s - a.s)
			.reduce(
				([s, a], i) =>
					a ? (a.overlaps(i) || a.abutsStart(i) ? [s, a.union(i)] : [s.concat([a]), i]) : [s, i],
				[[], null]
			);
		return n && t.push(n), t;
	}
	static xor(e) {
		let t = null,
			n = 0;
		const s = [],
			a = e.map((u) => [
				{ time: u.s, type: 's' },
				{ time: u.e, type: 'e' }
			]),
			i = Array.prototype.concat(...a),
			o = i.sort((u, l) => u.time - l.time);
		for (const u of o)
			(n += u.type === 's' ? 1 : -1),
				n === 1
					? (t = u.time)
					: (t && +t != +u.time && s.push(w.fromDateTimes(t, u.time)), (t = null));
		return w.merge(s);
	}
	difference(...e) {
		return w
			.xor([this].concat(e))
			.map((t) => this.intersection(t))
			.filter((t) => t && !t.isEmpty());
	}
	toString() {
		return this.isValid ? `[${this.s.toISO()} – ${this.e.toISO()})` : _;
	}
	toLocaleString(e = Oe, t = {}) {
		return this.isValid ? M.create(this.s.loc.clone(t), e).formatInterval(this) : _;
	}
	toISO(e) {
		return this.isValid ? `${this.s.toISO(e)}/${this.e.toISO(e)}` : _;
	}
	toISODate() {
		return this.isValid ? `${this.s.toISODate()}/${this.e.toISODate()}` : _;
	}
	toISOTime(e) {
		return this.isValid ? `${this.s.toISOTime(e)}/${this.e.toISOTime(e)}` : _;
	}
	toFormat(e, { separator: t = ' – ' } = {}) {
		return this.isValid ? `${this.s.toFormat(e)}${t}${this.e.toFormat(e)}` : _;
	}
	toDuration(e, t) {
		return this.isValid ? this.e.diff(this.s, e, t) : m.invalid(this.invalidReason);
	}
	mapEndpoints(e) {
		return w.fromDateTimes(e(this.s), e(this.e));
	}
}
class ge {
	static hasDST(e = v.defaultZone) {
		const t = f.now().setZone(e).set({ month: 12 });
		return !e.isUniversal && t.offset !== t.set({ month: 6 }).offset;
	}
	static isValidIANAZone(e) {
		return Z.isValidZone(e);
	}
	static normalizeZone(e) {
		return z(e, v.defaultZone);
	}
	static months(
		e = 'long',
		{
			locale: t = null,
			numberingSystem: n = null,
			locObj: s = null,
			outputCalendar: a = 'gregory'
		} = {}
	) {
		return (s || T.create(t, n, a)).months(e);
	}
	static monthsFormat(
		e = 'long',
		{
			locale: t = null,
			numberingSystem: n = null,
			locObj: s = null,
			outputCalendar: a = 'gregory'
		} = {}
	) {
		return (s || T.create(t, n, a)).months(e, !0);
	}
	static weekdays(
		e = 'long',
		{ locale: t = null, numberingSystem: n = null, locObj: s = null } = {}
	) {
		return (s || T.create(t, n, null)).weekdays(e);
	}
	static weekdaysFormat(
		e = 'long',
		{ locale: t = null, numberingSystem: n = null, locObj: s = null } = {}
	) {
		return (s || T.create(t, n, null)).weekdays(e, !0);
	}
	static meridiems({ locale: e = null } = {}) {
		return T.create(e).meridiems();
	}
	static eras(e = 'short', { locale: t = null } = {}) {
		return T.create(t, null, 'gregory').eras(e);
	}
	static features() {
		return { relative: Gt() };
	}
}
function dt(r, e) {
	const t = (s) => s.toUTC(0, { keepLocalTime: !0 }).startOf('day').valueOf(),
		n = t(e) - t(r);
	return Math.floor(m.fromMillis(n).as('days'));
}
function ls(r, e, t) {
	const n = [
			['years', (u, l) => l.year - u.year],
			['quarters', (u, l) => l.quarter - u.quarter + (l.year - u.year) * 4],
			['months', (u, l) => l.month - u.month + (l.year - u.year) * 12],
			[
				'weeks',
				(u, l) => {
					const h = dt(u, l);
					return (h - (h % 7)) / 7;
				}
			],
			['days', dt]
		],
		s = {},
		a = r;
	let i, o;
	for (const [u, l] of n)
		t.indexOf(u) >= 0 &&
			((i = u), (s[u] = l(r, e)), (o = a.plus(s)), o > e ? (s[u]--, (r = a.plus(s))) : (r = o));
	return [r, s, o, i];
}
function cs(r, e, t, n) {
	let [s, a, i, o] = ls(r, e, t);
	const u = e - s,
		l = t.filter((p) => ['hours', 'minutes', 'seconds', 'milliseconds'].indexOf(p) >= 0);
	l.length === 0 &&
		(i < e && (i = s.plus({ [o]: 1 })), i !== s && (a[o] = (a[o] || 0) + u / (i - s)));
	const h = m.fromObject(a, n);
	return l.length > 0
		? m
				.fromMillis(u, n)
				.shiftTo(...l)
				.plus(h)
		: h;
}
const Ke = {
		arab: '[٠-٩]',
		arabext: '[۰-۹]',
		bali: '[᭐-᭙]',
		beng: '[০-৯]',
		deva: '[०-९]',
		fullwide: '[０-９]',
		gujr: '[૦-૯]',
		hanidec: '[〇|一|二|三|四|五|六|七|八|九]',
		khmr: '[០-៩]',
		knda: '[೦-೯]',
		laoo: '[໐-໙]',
		limb: '[᥆-᥏]',
		mlym: '[൦-൯]',
		mong: '[᠐-᠙]',
		mymr: '[၀-၉]',
		orya: '[୦-୯]',
		tamldec: '[௦-௯]',
		telu: '[౦-౯]',
		thai: '[๐-๙]',
		tibt: '[༠-༩]',
		latn: '\\d'
	},
	ht = {
		arab: [1632, 1641],
		arabext: [1776, 1785],
		bali: [6992, 7001],
		beng: [2534, 2543],
		deva: [2406, 2415],
		fullwide: [65296, 65303],
		gujr: [2790, 2799],
		khmr: [6112, 6121],
		knda: [3302, 3311],
		laoo: [3792, 3801],
		limb: [6470, 6479],
		mlym: [3430, 3439],
		mong: [6160, 6169],
		mymr: [4160, 4169],
		orya: [2918, 2927],
		tamldec: [3046, 3055],
		telu: [3174, 3183],
		thai: [3664, 3673],
		tibt: [3872, 3881]
	},
	fs = Ke.hanidec.replace(/[\[|\]]/g, '').split('');
function ds(r) {
	let e = parseInt(r, 10);
	if (isNaN(e)) {
		e = '';
		for (let t = 0; t < r.length; t++) {
			const n = r.charCodeAt(t);
			if (r[t].search(Ke.hanidec) !== -1) e += fs.indexOf(r[t]);
			else
				for (const s in ht) {
					const [a, i] = ht[s];
					n >= a && n <= i && (e += n - a);
				}
		}
		return parseInt(e, 10);
	} else return e;
}
function F({ numberingSystem: r }, e = '') {
	return new RegExp(`${Ke[r || 'latn']}${e}`);
}
const hs = 'missing Intl.DateTimeFormat.formatToParts support';
function g(r, e = (t) => t) {
	return { regex: r, deser: ([t]) => e(ds(t)) };
}
const ms = String.fromCharCode(160),
	cr = `[ ${ms}]`,
	fr = new RegExp(cr, 'g');
function ys(r) {
	return r.replace(/\./g, '\\.?').replace(fr, cr);
}
function mt(r) {
	return r.replace(/\./g, '').replace(fr, ' ').toLowerCase();
}
function C(r, e) {
	return r === null
		? null
		: {
				regex: RegExp(r.map(ys).join('|')),
				deser: ([t]) => r.findIndex((n) => mt(t) === mt(n)) + e
		  };
}
function yt(r, e) {
	return { regex: r, deser: ([, t, n]) => De(t, n), groups: e };
}
function Ce(r) {
	return { regex: r, deser: ([e]) => e };
}
function gs(r) {
	return r.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
}
function ws(r, e) {
	const t = F(e),
		n = F(e, '{2}'),
		s = F(e, '{3}'),
		a = F(e, '{4}'),
		i = F(e, '{6}'),
		o = F(e, '{1,2}'),
		u = F(e, '{1,3}'),
		l = F(e, '{1,6}'),
		h = F(e, '{1,9}'),
		p = F(e, '{2,4}'),
		S = F(e, '{4,6}'),
		d = (b) => ({ regex: RegExp(gs(b.val)), deser: ([he]) => he, literal: !0 }),
		U = ((b) => {
			if (r.literal) return d(b);
			switch (b.val) {
				case 'G':
					return C(e.eras('short', !1), 0);
				case 'GG':
					return C(e.eras('long', !1), 0);
				case 'y':
					return g(l);
				case 'yy':
					return g(p, He);
				case 'yyyy':
					return g(a);
				case 'yyyyy':
					return g(S);
				case 'yyyyyy':
					return g(i);
				case 'M':
					return g(o);
				case 'MM':
					return g(n);
				case 'MMM':
					return C(e.months('short', !0, !1), 1);
				case 'MMMM':
					return C(e.months('long', !0, !1), 1);
				case 'L':
					return g(o);
				case 'LL':
					return g(n);
				case 'LLL':
					return C(e.months('short', !1, !1), 1);
				case 'LLLL':
					return C(e.months('long', !1, !1), 1);
				case 'd':
					return g(o);
				case 'dd':
					return g(n);
				case 'o':
					return g(u);
				case 'ooo':
					return g(s);
				case 'HH':
					return g(n);
				case 'H':
					return g(o);
				case 'hh':
					return g(n);
				case 'h':
					return g(o);
				case 'mm':
					return g(n);
				case 'm':
					return g(o);
				case 'q':
					return g(o);
				case 'qq':
					return g(n);
				case 's':
					return g(o);
				case 'ss':
					return g(n);
				case 'S':
					return g(u);
				case 'SSS':
					return g(s);
				case 'u':
					return Ce(h);
				case 'uu':
					return Ce(o);
				case 'uuu':
					return g(t);
				case 'a':
					return C(e.meridiems(), 0);
				case 'kkkk':
					return g(a);
				case 'kk':
					return g(p, He);
				case 'W':
					return g(o);
				case 'WW':
					return g(n);
				case 'E':
				case 'c':
					return g(t);
				case 'EEE':
					return C(e.weekdays('short', !1, !1), 1);
				case 'EEEE':
					return C(e.weekdays('long', !1, !1), 1);
				case 'ccc':
					return C(e.weekdays('short', !0, !1), 1);
				case 'cccc':
					return C(e.weekdays('long', !0, !1), 1);
				case 'Z':
				case 'ZZ':
					return yt(new RegExp(`([+-]${o.source})(?::(${n.source}))?`), 2);
				case 'ZZZ':
					return yt(new RegExp(`([+-]${o.source})(${n.source})?`), 2);
				case 'z':
					return Ce(/[a-z_+-/]{1,256}?/i);
				default:
					return d(b);
			}
		})(r) || { invalidReason: hs };
	return (U.token = r), U;
}
const Ts = {
	year: { '2-digit': 'yy', numeric: 'yyyyy' },
	month: { numeric: 'M', '2-digit': 'MM', short: 'MMM', long: 'MMMM' },
	day: { numeric: 'd', '2-digit': 'dd' },
	weekday: { short: 'EEE', long: 'EEEE' },
	dayperiod: 'a',
	dayPeriod: 'a',
	hour: { numeric: 'h', '2-digit': 'hh' },
	minute: { numeric: 'm', '2-digit': 'mm' },
	second: { numeric: 's', '2-digit': 'ss' },
	timeZoneName: { long: 'ZZZZZ', short: 'ZZZ' }
};
function ps(r, e) {
	const { type: t, value: n } = r;
	if (t === 'literal') return { literal: !0, val: n };
	const s = e[t];
	let a = Ts[t];
	if ((typeof a == 'object' && (a = a[s]), a)) return { literal: !1, val: a };
}
function Ss(r) {
	return [`^${r.map((t) => t.regex).reduce((t, n) => `${t}(${n.source})`, '')}$`, r];
}
function Os(r, e, t) {
	const n = r.match(e);
	if (n) {
		const s = {};
		let a = 1;
		for (const i in t)
			if (j(t, i)) {
				const o = t[i],
					u = o.groups ? o.groups + 1 : 1;
				!o.literal && o.token && (s[o.token.val[0]] = o.deser(n.slice(a, a + u))), (a += u);
			}
		return [n, s];
	} else return [n, {}];
}
function vs(r) {
	const e = (a) => {
		switch (a) {
			case 'S':
				return 'millisecond';
			case 's':
				return 'second';
			case 'm':
				return 'minute';
			case 'h':
			case 'H':
				return 'hour';
			case 'd':
				return 'day';
			case 'o':
				return 'ordinal';
			case 'L':
			case 'M':
				return 'month';
			case 'y':
				return 'year';
			case 'E':
			case 'c':
				return 'weekday';
			case 'W':
				return 'weekNumber';
			case 'k':
				return 'weekYear';
			case 'q':
				return 'quarter';
			default:
				return null;
		}
	};
	let t = null,
		n;
	return (
		y(r.z) || (t = Z.create(r.z)),
		y(r.Z) || (t || (t = new E(r.Z)), (n = r.Z)),
		y(r.q) || (r.M = (r.q - 1) * 3 + 1),
		y(r.h) || (r.h < 12 && r.a === 1 ? (r.h += 12) : r.h === 12 && r.a === 0 && (r.h = 0)),
		r.G === 0 && r.y && (r.y = -r.y),
		y(r.u) || (r.S = Pe(r.u)),
		[
			Object.keys(r).reduce((a, i) => {
				const o = e(i);
				return o && (a[o] = r[i]), a;
			}, {}),
			t,
			n
		]
	);
}
let Ve = null;
function ks() {
	return Ve || (Ve = f.fromMillis(1555555555555)), Ve;
}
function Ms(r, e) {
	if (r.literal) return r;
	const t = M.macroTokenToFormatOpts(r.val),
		n = mr(t, e);
	return n == null || n.includes(void 0) ? r : n;
}
function dr(r, e) {
	return Array.prototype.concat(...r.map((t) => Ms(t, e)));
}
function hr(r, e, t) {
	const n = dr(M.parseFormat(t), r),
		s = n.map((i) => ws(i, r)),
		a = s.find((i) => i.invalidReason);
	if (a) return { input: e, tokens: n, invalidReason: a.invalidReason };
	{
		const [i, o] = Ss(s),
			u = RegExp(i, 'i'),
			[l, h] = Os(e, u, o),
			[p, S, d] = h ? vs(h) : [null, null, void 0];
		if (j(h, 'a') && j(h, 'H'))
			throw new ie("Can't include meridiem when specifying 24-hour format");
		return {
			input: e,
			tokens: n,
			regex: u,
			rawMatches: l,
			matches: h,
			result: p,
			zone: S,
			specificOffset: d
		};
	}
}
function Es(r, e, t) {
	const { result: n, zone: s, specificOffset: a, invalidReason: i } = hr(r, e, t);
	return [n, s, a, i];
}
function mr(r, e) {
	return r
		? M.create(e, r)
				.formatDateTimeParts(ks())
				.map((s) => ps(s, r))
		: null;
}
const yr = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
	gr = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function x(r, e) {
	return new V(
		'unit out of range',
		`you specified ${e} (of type ${typeof e}) as a ${r}, which is invalid`
	);
}
function wr(r, e, t) {
	const n = new Date(Date.UTC(r, e - 1, t));
	r < 100 && r >= 0 && n.setUTCFullYear(n.getUTCFullYear() - 1900);
	const s = n.getUTCDay();
	return s === 0 ? 7 : s;
}
function Tr(r, e, t) {
	return t + (ce(r) ? gr : yr)[e - 1];
}
function pr(r, e) {
	const t = ce(r) ? gr : yr,
		n = t.findIndex((a) => a < e),
		s = e - t[n];
	return { month: n + 1, day: s };
}
function Ye(r) {
	const { year: e, month: t, day: n } = r,
		s = Tr(e, t, n),
		a = wr(e, t, n);
	let i = Math.floor((s - a + 10) / 7),
		o;
	return (
		i < 1 ? ((o = e - 1), (i = ke(o))) : i > ke(e) ? ((o = e + 1), (i = 1)) : (o = e),
		{ weekYear: o, weekNumber: i, weekday: a, ...Ie(r) }
	);
}
function gt(r) {
	const { weekYear: e, weekNumber: t, weekday: n } = r,
		s = wr(e, 1, 4),
		a = oe(e);
	let i = t * 7 + n - s - 3,
		o;
	i < 1 ? ((o = e - 1), (i += oe(o))) : i > a ? ((o = e + 1), (i -= oe(e))) : (o = e);
	const { month: u, day: l } = pr(o, i);
	return { year: o, month: u, day: l, ...Ie(r) };
}
function Le(r) {
	const { year: e, month: t, day: n } = r,
		s = Tr(e, t, n);
	return { year: e, ordinal: s, ...Ie(r) };
}
function wt(r) {
	const { year: e, ordinal: t } = r,
		{ month: n, day: s } = pr(e, t);
	return { year: e, month: n, day: s, ...Ie(r) };
}
function Ns(r) {
	const e = Ne(r.weekYear),
		t = A(r.weekNumber, 1, ke(r.weekYear)),
		n = A(r.weekday, 1, 7);
	return e
		? t
			? n
				? !1
				: x('weekday', r.weekday)
			: x('week', r.week)
		: x('weekYear', r.weekYear);
}
function Ds(r) {
	const e = Ne(r.year),
		t = A(r.ordinal, 1, oe(r.year));
	return e ? (t ? !1 : x('ordinal', r.ordinal)) : x('year', r.year);
}
function Sr(r) {
	const e = Ne(r.year),
		t = A(r.month, 1, 12),
		n = A(r.day, 1, ve(r.year, r.month));
	return e ? (t ? (n ? !1 : x('day', r.day)) : x('month', r.month)) : x('year', r.year);
}
function Or(r) {
	const { hour: e, minute: t, second: n, millisecond: s } = r,
		a = A(e, 0, 23) || (e === 24 && t === 0 && n === 0 && s === 0),
		i = A(t, 0, 59),
		o = A(n, 0, 59),
		u = A(s, 0, 999);
	return a
		? i
			? o
				? u
					? !1
					: x('millisecond', s)
				: x('second', n)
			: x('minute', t)
		: x('hour', e);
}
const Ae = 'Invalid DateTime',
	Tt = 864e13;
function we(r) {
	return new V('unsupported zone', `the zone "${r.name}" is not supported`);
}
function Ze(r) {
	return r.weekData === null && (r.weekData = Ye(r.c)), r.weekData;
}
function re(r, e) {
	const t = { ts: r.ts, zone: r.zone, c: r.c, o: r.o, loc: r.loc, invalid: r.invalid };
	return new f({ ...t, ...e, old: t });
}
function vr(r, e, t) {
	let n = r - e * 60 * 1e3;
	const s = t.offset(n);
	if (e === s) return [n, e];
	n -= (s - e) * 60 * 1e3;
	const a = t.offset(n);
	return s === a ? [n, s] : [r - Math.min(s, a) * 60 * 1e3, Math.max(s, a)];
}
function pt(r, e) {
	r += e * 60 * 1e3;
	const t = new Date(r);
	return {
		year: t.getUTCFullYear(),
		month: t.getUTCMonth() + 1,
		day: t.getUTCDate(),
		hour: t.getUTCHours(),
		minute: t.getUTCMinutes(),
		second: t.getUTCSeconds(),
		millisecond: t.getUTCMilliseconds()
	};
}
function Se(r, e, t) {
	return vr(_e(r), e, t);
}
function St(r, e) {
	const t = r.o,
		n = r.c.year + Math.trunc(e.years),
		s = r.c.month + Math.trunc(e.months) + Math.trunc(e.quarters) * 3,
		a = {
			...r.c,
			year: n,
			month: s,
			day: Math.min(r.c.day, ve(n, s)) + Math.trunc(e.days) + Math.trunc(e.weeks) * 7
		},
		i = m
			.fromObject({
				years: e.years - Math.trunc(e.years),
				quarters: e.quarters - Math.trunc(e.quarters),
				months: e.months - Math.trunc(e.months),
				weeks: e.weeks - Math.trunc(e.weeks),
				days: e.days - Math.trunc(e.days),
				hours: e.hours,
				minutes: e.minutes,
				seconds: e.seconds,
				milliseconds: e.milliseconds
			})
			.as('milliseconds'),
		o = _e(a);
	let [u, l] = vr(o, t, r.zone);
	return i !== 0 && ((u += i), (l = r.zone.offset(u))), { ts: u, o: l };
}
function ne(r, e, t, n, s, a) {
	const { setZone: i, zone: o } = t;
	if (r && Object.keys(r).length !== 0) {
		const u = e || o,
			l = f.fromObject(r, { ...t, zone: u, specificOffset: a });
		return i ? l : l.setZone(o);
	} else return f.invalid(new V('unparsable', `the input "${s}" can't be parsed as ${n}`));
}
function Te(r, e, t = !0) {
	return r.isValid
		? M.create(T.create('en-US'), { allowZ: t, forceSimple: !0 }).formatDateTimeFromString(r, e)
		: null;
}
function $e(r, e) {
	const t = r.c.year > 9999 || r.c.year < 0;
	let n = '';
	return (
		t && r.c.year >= 0 && (n += '+'),
		(n += k(r.c.year, t ? 6 : 4)),
		e
			? ((n += '-'), (n += k(r.c.month)), (n += '-'), (n += k(r.c.day)))
			: ((n += k(r.c.month)), (n += k(r.c.day))),
		n
	);
}
function Ot(r, e, t, n, s, a) {
	let i = k(r.c.hour);
	return (
		e
			? ((i += ':'), (i += k(r.c.minute)), (r.c.second !== 0 || !t) && (i += ':'))
			: (i += k(r.c.minute)),
		(r.c.second !== 0 || !t) &&
			((i += k(r.c.second)),
			(r.c.millisecond !== 0 || !n) && ((i += '.'), (i += k(r.c.millisecond, 3)))),
		s &&
			(r.isOffsetFixed && r.offset === 0 && !a
				? (i += 'Z')
				: r.o < 0
				? ((i += '-'), (i += k(Math.trunc(-r.o / 60))), (i += ':'), (i += k(Math.trunc(-r.o % 60))))
				: ((i += '+'), (i += k(Math.trunc(r.o / 60))), (i += ':'), (i += k(Math.trunc(r.o % 60))))),
		a && (i += '[' + r.zone.ianaName + ']'),
		i
	);
}
const kr = { month: 1, day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 },
	Is = { weekNumber: 1, weekday: 1, hour: 0, minute: 0, second: 0, millisecond: 0 },
	xs = { ordinal: 1, hour: 0, minute: 0, second: 0, millisecond: 0 },
	Mr = ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'],
	bs = ['weekYear', 'weekNumber', 'weekday', 'hour', 'minute', 'second', 'millisecond'],
	Fs = ['year', 'ordinal', 'hour', 'minute', 'second', 'millisecond'];
function vt(r) {
	const e = {
		year: 'year',
		years: 'year',
		month: 'month',
		months: 'month',
		day: 'day',
		days: 'day',
		hour: 'hour',
		hours: 'hour',
		minute: 'minute',
		minutes: 'minute',
		quarter: 'quarter',
		quarters: 'quarter',
		second: 'second',
		seconds: 'second',
		millisecond: 'millisecond',
		milliseconds: 'millisecond',
		weekday: 'weekday',
		weekdays: 'weekday',
		weeknumber: 'weekNumber',
		weeksnumber: 'weekNumber',
		weeknumbers: 'weekNumber',
		weekyear: 'weekYear',
		weekyears: 'weekYear',
		ordinal: 'ordinal'
	}[r.toLowerCase()];
	if (!e) throw new Nt(r);
	return e;
}
function kt(r, e) {
	const t = z(e.zone, v.defaultZone),
		n = T.fromObject(e),
		s = v.now();
	let a, i;
	if (y(r.year)) a = s;
	else {
		for (const l of Mr) y(r[l]) && (r[l] = kr[l]);
		const o = Sr(r) || Or(r);
		if (o) return f.invalid(o);
		const u = t.offset(s);
		[a, i] = Se(r, u, t);
	}
	return new f({ ts: a, zone: t, loc: n, o: i });
}
function Mt(r, e, t) {
	const n = y(t.round) ? !0 : t.round,
		s = (i, o) => (
			(i = Ge(i, n || t.calendary ? 0 : 2, !0)), e.loc.clone(t).relFormatter(t).format(i, o)
		),
		a = (i) =>
			t.calendary
				? e.hasSame(r, i)
					? 0
					: e.startOf(i).diff(r.startOf(i), i).get(i)
				: e.diff(r, i).get(i);
	if (t.unit) return s(a(t.unit), t.unit);
	for (const i of t.units) {
		const o = a(i);
		if (Math.abs(o) >= 1) return s(o, i);
	}
	return s(r > e ? -0 : 0, t.units[t.units.length - 1]);
}
function Et(r) {
	let e = {},
		t;
	return (
		r.length > 0 && typeof r[r.length - 1] == 'object'
			? ((e = r[r.length - 1]), (t = Array.from(r).slice(0, r.length - 1)))
			: (t = Array.from(r)),
		[e, t]
	);
}
class f {
	constructor(e) {
		const t = e.zone || v.defaultZone;
		let n =
			e.invalid ||
			(Number.isNaN(e.ts) ? new V('invalid input') : null) ||
			(t.isValid ? null : we(t));
		this.ts = y(e.ts) ? v.now() : e.ts;
		let s = null,
			a = null;
		if (!n)
			if (e.old && e.old.ts === this.ts && e.old.zone.equals(t)) [s, a] = [e.old.c, e.old.o];
			else {
				const o = t.offset(this.ts);
				(s = pt(this.ts, o)),
					(n = Number.isNaN(s.year) ? new V('invalid input') : null),
					(s = n ? null : s),
					(a = n ? null : o);
			}
		(this._zone = t),
			(this.loc = e.loc || T.create()),
			(this.invalid = n),
			(this.weekData = null),
			(this.c = s),
			(this.o = a),
			(this.isLuxonDateTime = !0);
	}
	static now() {
		return new f({});
	}
	static local() {
		const [e, t] = Et(arguments),
			[n, s, a, i, o, u, l] = t;
		return kt({ year: n, month: s, day: a, hour: i, minute: o, second: u, millisecond: l }, e);
	}
	static utc() {
		const [e, t] = Et(arguments),
			[n, s, a, i, o, u, l] = t;
		return (
			(e.zone = E.utcInstance),
			kt({ year: n, month: s, day: a, hour: i, minute: o, second: u, millisecond: l }, e)
		);
	}
	static fromJSDate(e, t = {}) {
		const n = tn(e) ? e.valueOf() : NaN;
		if (Number.isNaN(n)) return f.invalid('invalid input');
		const s = z(t.zone, v.defaultZone);
		return s.isValid ? new f({ ts: n, zone: s, loc: T.fromObject(t) }) : f.invalid(we(s));
	}
	static fromMillis(e, t = {}) {
		if (Y(e))
			return e < -Tt || e > Tt
				? f.invalid('Timestamp out of range')
				: new f({ ts: e, zone: z(t.zone, v.defaultZone), loc: T.fromObject(t) });
		throw new I(
			`fromMillis requires a numerical input, but received a ${typeof e} with value ${e}`
		);
	}
	static fromSeconds(e, t = {}) {
		if (Y(e)) return new f({ ts: e * 1e3, zone: z(t.zone, v.defaultZone), loc: T.fromObject(t) });
		throw new I('fromSeconds requires a numerical input');
	}
	static fromObject(e, t = {}) {
		e = e || {};
		const n = z(t.zone, v.defaultZone);
		if (!n.isValid) return f.invalid(we(n));
		const s = v.now(),
			a = y(t.specificOffset) ? n.offset(s) : t.specificOffset,
			i = Me(e, vt),
			o = !y(i.ordinal),
			u = !y(i.year),
			l = !y(i.month) || !y(i.day),
			h = u || l,
			p = i.weekYear || i.weekNumber,
			S = T.fromObject(t);
		if ((h || o) && p)
			throw new ie("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
		if (l && o) throw new ie("Can't mix ordinal dates with month/day");
		const d = p || (i.weekday && !h);
		let O,
			U,
			b = pt(s, a);
		d
			? ((O = bs), (U = Is), (b = Ye(b)))
			: o
			? ((O = Fs), (U = xs), (b = Le(b)))
			: ((O = Mr), (U = kr));
		let he = !1;
		for (const te of O) {
			const Fr = i[te];
			y(Fr) ? (he ? (i[te] = U[te]) : (i[te] = b[te])) : (he = !0);
		}
		const Dr = d ? Ns(i) : o ? Ds(i) : Sr(i),
			et = Dr || Or(i);
		if (et) return f.invalid(et);
		const Ir = d ? gt(i) : o ? wt(i) : i,
			[xr, br] = Se(Ir, a, n),
			xe = new f({ ts: xr, zone: n, o: br, loc: S });
		return i.weekday && h && e.weekday !== xe.weekday
			? f.invalid(
					'mismatched weekday',
					`you can't specify both a weekday of ${i.weekday} and a date of ${xe.toISO()}`
			  )
			: xe;
	}
	static fromISO(e, t = {}) {
		const [n, s] = Pn(e);
		return ne(n, s, t, 'ISO 8601', e);
	}
	static fromRFC2822(e, t = {}) {
		const [n, s] = Gn(e);
		return ne(n, s, t, 'RFC 2822', e);
	}
	static fromHTTP(e, t = {}) {
		const [n, s] = _n(e);
		return ne(n, s, t, 'HTTP', t);
	}
	static fromFormat(e, t, n = {}) {
		if (y(e) || y(t)) throw new I('fromFormat requires an input string and a format');
		const { locale: s = null, numberingSystem: a = null } = n,
			i = T.fromOpts({ locale: s, numberingSystem: a, defaultToEN: !0 }),
			[o, u, l, h] = Es(i, e, t);
		return h ? f.invalid(h) : ne(o, u, n, `format ${t}`, e, l);
	}
	static fromString(e, t, n = {}) {
		return f.fromFormat(e, t, n);
	}
	static fromSQL(e, t = {}) {
		const [n, s] = es(e);
		return ne(n, s, t, 'SQL', e);
	}
	static invalid(e, t = null) {
		if (!e) throw new I('need to specify a reason the DateTime is invalid');
		const n = e instanceof V ? e : new V(e, t);
		if (v.throwOnInvalid) throw new Cr(n);
		return new f({ invalid: n });
	}
	static isDateTime(e) {
		return (e && e.isLuxonDateTime) || !1;
	}
	static parseFormatForOpts(e, t = {}) {
		const n = mr(e, T.fromObject(t));
		return n ? n.map((s) => (s ? s.val : null)).join('') : null;
	}
	static expandFormat(e, t = {}) {
		return dr(M.parseFormat(e), T.fromObject(t))
			.map((s) => s.val)
			.join('');
	}
	get(e) {
		return this[e];
	}
	get isValid() {
		return this.invalid === null;
	}
	get invalidReason() {
		return this.invalid ? this.invalid.reason : null;
	}
	get invalidExplanation() {
		return this.invalid ? this.invalid.explanation : null;
	}
	get locale() {
		return this.isValid ? this.loc.locale : null;
	}
	get numberingSystem() {
		return this.isValid ? this.loc.numberingSystem : null;
	}
	get outputCalendar() {
		return this.isValid ? this.loc.outputCalendar : null;
	}
	get zone() {
		return this._zone;
	}
	get zoneName() {
		return this.isValid ? this.zone.name : null;
	}
	get year() {
		return this.isValid ? this.c.year : NaN;
	}
	get quarter() {
		return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
	}
	get month() {
		return this.isValid ? this.c.month : NaN;
	}
	get day() {
		return this.isValid ? this.c.day : NaN;
	}
	get hour() {
		return this.isValid ? this.c.hour : NaN;
	}
	get minute() {
		return this.isValid ? this.c.minute : NaN;
	}
	get second() {
		return this.isValid ? this.c.second : NaN;
	}
	get millisecond() {
		return this.isValid ? this.c.millisecond : NaN;
	}
	get weekYear() {
		return this.isValid ? Ze(this).weekYear : NaN;
	}
	get weekNumber() {
		return this.isValid ? Ze(this).weekNumber : NaN;
	}
	get weekday() {
		return this.isValid ? Ze(this).weekday : NaN;
	}
	get ordinal() {
		return this.isValid ? Le(this.c).ordinal : NaN;
	}
	get monthShort() {
		return this.isValid ? ge.months('short', { locObj: this.loc })[this.month - 1] : null;
	}
	get monthLong() {
		return this.isValid ? ge.months('long', { locObj: this.loc })[this.month - 1] : null;
	}
	get weekdayShort() {
		return this.isValid ? ge.weekdays('short', { locObj: this.loc })[this.weekday - 1] : null;
	}
	get weekdayLong() {
		return this.isValid ? ge.weekdays('long', { locObj: this.loc })[this.weekday - 1] : null;
	}
	get offset() {
		return this.isValid ? +this.o : NaN;
	}
	get offsetNameShort() {
		return this.isValid
			? this.zone.offsetName(this.ts, { format: 'short', locale: this.locale })
			: null;
	}
	get offsetNameLong() {
		return this.isValid
			? this.zone.offsetName(this.ts, { format: 'long', locale: this.locale })
			: null;
	}
	get isOffsetFixed() {
		return this.isValid ? this.zone.isUniversal : null;
	}
	get isInDST() {
		return this.isOffsetFixed
			? !1
			: this.offset > this.set({ month: 1, day: 1 }).offset ||
					this.offset > this.set({ month: 5 }).offset;
	}
	get isInLeapYear() {
		return ce(this.year);
	}
	get daysInMonth() {
		return ve(this.year, this.month);
	}
	get daysInYear() {
		return this.isValid ? oe(this.year) : NaN;
	}
	get weeksInWeekYear() {
		return this.isValid ? ke(this.weekYear) : NaN;
	}
	resolvedLocaleOptions(e = {}) {
		const {
			locale: t,
			numberingSystem: n,
			calendar: s
		} = M.create(this.loc.clone(e), e).resolvedOptions(this);
		return { locale: t, numberingSystem: n, outputCalendar: s };
	}
	toUTC(e = 0, t = {}) {
		return this.setZone(E.instance(e), t);
	}
	toLocal() {
		return this.setZone(v.defaultZone);
	}
	setZone(e, { keepLocalTime: t = !1, keepCalendarTime: n = !1 } = {}) {
		if (((e = z(e, v.defaultZone)), e.equals(this.zone))) return this;
		if (e.isValid) {
			let s = this.ts;
			if (t || n) {
				const a = e.offset(this.ts),
					i = this.toObject();
				[s] = Se(i, a, e);
			}
			return re(this, { ts: s, zone: e });
		} else return f.invalid(we(e));
	}
	reconfigure({ locale: e, numberingSystem: t, outputCalendar: n } = {}) {
		const s = this.loc.clone({ locale: e, numberingSystem: t, outputCalendar: n });
		return re(this, { loc: s });
	}
	setLocale(e) {
		return this.reconfigure({ locale: e });
	}
	set(e) {
		if (!this.isValid) return this;
		const t = Me(e, vt),
			n = !y(t.weekYear) || !y(t.weekNumber) || !y(t.weekday),
			s = !y(t.ordinal),
			a = !y(t.year),
			i = !y(t.month) || !y(t.day),
			o = a || i,
			u = t.weekYear || t.weekNumber;
		if ((o || s) && u)
			throw new ie("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
		if (i && s) throw new ie("Can't mix ordinal dates with month/day");
		let l;
		n
			? (l = gt({ ...Ye(this.c), ...t }))
			: y(t.ordinal)
			? ((l = { ...this.toObject(), ...t }),
			  y(t.day) && (l.day = Math.min(ve(l.year, l.month), l.day)))
			: (l = wt({ ...Le(this.c), ...t }));
		const [h, p] = Se(l, this.o, this.zone);
		return re(this, { ts: h, o: p });
	}
	plus(e) {
		if (!this.isValid) return this;
		const t = m.fromDurationLike(e);
		return re(this, St(this, t));
	}
	minus(e) {
		if (!this.isValid) return this;
		const t = m.fromDurationLike(e).negate();
		return re(this, St(this, t));
	}
	startOf(e) {
		if (!this.isValid) return this;
		const t = {},
			n = m.normalizeUnit(e);
		switch (n) {
			case 'years':
				t.month = 1;
			case 'quarters':
			case 'months':
				t.day = 1;
			case 'weeks':
			case 'days':
				t.hour = 0;
			case 'hours':
				t.minute = 0;
			case 'minutes':
				t.second = 0;
			case 'seconds':
				t.millisecond = 0;
				break;
		}
		if ((n === 'weeks' && (t.weekday = 1), n === 'quarters')) {
			const s = Math.ceil(this.month / 3);
			t.month = (s - 1) * 3 + 1;
		}
		return this.set(t);
	}
	endOf(e) {
		return this.isValid
			? this.plus({ [e]: 1 })
					.startOf(e)
					.minus(1)
			: this;
	}
	toFormat(e, t = {}) {
		return this.isValid
			? M.create(this.loc.redefaultToEN(t)).formatDateTimeFromString(this, e)
			: Ae;
	}
	toLocaleString(e = Oe, t = {}) {
		return this.isValid ? M.create(this.loc.clone(t), e).formatDateTime(this) : Ae;
	}
	toLocaleParts(e = {}) {
		return this.isValid ? M.create(this.loc.clone(e), e).formatDateTimeParts(this) : [];
	}
	toISO({
		format: e = 'extended',
		suppressSeconds: t = !1,
		suppressMilliseconds: n = !1,
		includeOffset: s = !0,
		extendedZone: a = !1
	} = {}) {
		if (!this.isValid) return null;
		const i = e === 'extended';
		let o = $e(this, i);
		return (o += 'T'), (o += Ot(this, i, t, n, s, a)), o;
	}
	toISODate({ format: e = 'extended' } = {}) {
		return this.isValid ? $e(this, e === 'extended') : null;
	}
	toISOWeekDate() {
		return Te(this, "kkkk-'W'WW-c");
	}
	toISOTime({
		suppressMilliseconds: e = !1,
		suppressSeconds: t = !1,
		includeOffset: n = !0,
		includePrefix: s = !1,
		extendedZone: a = !1,
		format: i = 'extended'
	} = {}) {
		return this.isValid ? (s ? 'T' : '') + Ot(this, i === 'extended', t, e, n, a) : null;
	}
	toRFC2822() {
		return Te(this, 'EEE, dd LLL yyyy HH:mm:ss ZZZ', !1);
	}
	toHTTP() {
		return Te(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
	}
	toSQLDate() {
		return this.isValid ? $e(this, !0) : null;
	}
	toSQLTime({ includeOffset: e = !0, includeZone: t = !1, includeOffsetSpace: n = !0 } = {}) {
		let s = 'HH:mm:ss.SSS';
		return (t || e) && (n && (s += ' '), t ? (s += 'z') : e && (s += 'ZZ')), Te(this, s, !0);
	}
	toSQL(e = {}) {
		return this.isValid ? `${this.toSQLDate()} ${this.toSQLTime(e)}` : null;
	}
	toString() {
		return this.isValid ? this.toISO() : Ae;
	}
	valueOf() {
		return this.toMillis();
	}
	toMillis() {
		return this.isValid ? this.ts : NaN;
	}
	toSeconds() {
		return this.isValid ? this.ts / 1e3 : NaN;
	}
	toUnixInteger() {
		return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
	}
	toJSON() {
		return this.toISO();
	}
	toBSON() {
		return this.toJSDate();
	}
	toObject(e = {}) {
		if (!this.isValid) return {};
		const t = { ...this.c };
		return (
			e.includeConfig &&
				((t.outputCalendar = this.outputCalendar),
				(t.numberingSystem = this.loc.numberingSystem),
				(t.locale = this.loc.locale)),
			t
		);
	}
	toJSDate() {
		return new Date(this.isValid ? this.ts : NaN);
	}
	diff(e, t = 'milliseconds', n = {}) {
		if (!this.isValid || !e.isValid) return m.invalid('created by diffing an invalid DateTime');
		const s = { locale: this.locale, numberingSystem: this.numberingSystem, ...n },
			a = rn(t).map(m.normalizeUnit),
			i = e.valueOf() > this.valueOf(),
			o = i ? this : e,
			u = i ? e : this,
			l = cs(o, u, a, s);
		return i ? l.negate() : l;
	}
	diffNow(e = 'milliseconds', t = {}) {
		return this.diff(f.now(), e, t);
	}
	until(e) {
		return this.isValid ? w.fromDateTimes(this, e) : this;
	}
	hasSame(e, t) {
		if (!this.isValid) return !1;
		const n = e.valueOf(),
			s = this.setZone(e.zone, { keepLocalTime: !0 });
		return s.startOf(t) <= n && n <= s.endOf(t);
	}
	equals(e) {
		return (
			this.isValid &&
			e.isValid &&
			this.valueOf() === e.valueOf() &&
			this.zone.equals(e.zone) &&
			this.loc.equals(e.loc)
		);
	}
	toRelative(e = {}) {
		if (!this.isValid) return null;
		const t = e.base || f.fromObject({}, { zone: this.zone }),
			n = e.padding ? (this < t ? -e.padding : e.padding) : 0;
		let s = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'],
			a = e.unit;
		return (
			Array.isArray(e.unit) && ((s = e.unit), (a = void 0)),
			Mt(t, this.plus(n), { ...e, numeric: 'always', units: s, unit: a })
		);
	}
	toRelativeCalendar(e = {}) {
		return this.isValid
			? Mt(e.base || f.fromObject({}, { zone: this.zone }), this, {
					...e,
					numeric: 'auto',
					units: ['years', 'months', 'days'],
					calendary: !0
			  })
			: null;
	}
	static min(...e) {
		if (!e.every(f.isDateTime)) throw new I('min requires all arguments be DateTimes');
		return lt(e, (t) => t.valueOf(), Math.min);
	}
	static max(...e) {
		if (!e.every(f.isDateTime)) throw new I('max requires all arguments be DateTimes');
		return lt(e, (t) => t.valueOf(), Math.max);
	}
	static fromFormatExplain(e, t, n = {}) {
		const { locale: s = null, numberingSystem: a = null } = n,
			i = T.fromOpts({ locale: s, numberingSystem: a, defaultToEN: !0 });
		return hr(i, e, t);
	}
	static fromStringExplain(e, t, n = {}) {
		return f.fromFormatExplain(e, t, n);
	}
	static get DATE_SHORT() {
		return Oe;
	}
	static get DATE_MED() {
		return Dt;
	}
	static get DATE_MED_WITH_WEEKDAY() {
		return Ar;
	}
	static get DATE_FULL() {
		return It;
	}
	static get DATE_HUGE() {
		return xt;
	}
	static get TIME_SIMPLE() {
		return bt;
	}
	static get TIME_WITH_SECONDS() {
		return Ft;
	}
	static get TIME_WITH_SHORT_OFFSET() {
		return Ct;
	}
	static get TIME_WITH_LONG_OFFSET() {
		return Vt;
	}
	static get TIME_24_SIMPLE() {
		return Lt;
	}
	static get TIME_24_WITH_SECONDS() {
		return At;
	}
	static get TIME_24_WITH_SHORT_OFFSET() {
		return Zt;
	}
	static get TIME_24_WITH_LONG_OFFSET() {
		return $t;
	}
	static get DATETIME_SHORT() {
		return Wt;
	}
	static get DATETIME_SHORT_WITH_SECONDS() {
		return Rt;
	}
	static get DATETIME_MED() {
		return zt;
	}
	static get DATETIME_MED_WITH_SECONDS() {
		return Ut;
	}
	static get DATETIME_MED_WITH_WEEKDAY() {
		return Zr;
	}
	static get DATETIME_FULL() {
		return qt;
	}
	static get DATETIME_FULL_WITH_SECONDS() {
		return Ht;
	}
	static get DATETIME_HUGE() {
		return Yt;
	}
	static get DATETIME_HUGE_WITH_SECONDS() {
		return Pt;
	}
}
function se(r) {
	if (f.isDateTime(r)) return r;
	if (r && r.valueOf && Y(r.valueOf())) return f.fromJSDate(r);
	if (r && typeof r == 'object') return f.fromObject(r);
	throw new I(`Unknown datetime argument: ${r}, of type ${typeof r}`);
}
var Cs = ((r) => (
	(r.NotStarted = 'NotStarted'), (r.Working = 'Working'), (r.Chilling = 'Chilling'), r
))(Cs || {});
const Qe = 'yyyy_MM_dd',
	Er = 'hh:mm',
	Us = { NotStarted: '🛏', Working: '🛠️', Chilling: '☕' };
function B(r) {
	return new Promise((e, t) => {
		(r.oncomplete = r.onsuccess = () => e(r.result)), (r.onabort = r.onerror = () => t(r.error));
	});
}
function Vs(r, e) {
	const t = indexedDB.open(r);
	t.onupgradeneeded = () => t.result.createObjectStore(e);
	const n = B(t);
	return (s, a) => n.then((i) => a(i.transaction(e, s).objectStore(e)));
}
let We;
function Xe() {
	return We || (We = Vs('keyval-store', 'keyval')), We;
}
function Ls(r, e = Xe()) {
	return e('readonly', (t) => B(t.get(r)));
}
function Nr(r, e, t = Xe()) {
	return t('readwrite', (n) => (n.put(e, r), B(n.transaction)));
}
function As(r, e) {
	return (
		(r.openCursor().onsuccess = function () {
			this.result && (e(this.result), this.result.continue());
		}),
		B(r.transaction)
	);
}
function Zs(r = Xe()) {
	return r('readonly', (e) => {
		if (e.getAll && e.getAllKeys)
			return Promise.all([B(e.getAllKeys()), B(e.getAll())]).then(([n, s]) =>
				n.map((a, i) => [a, s[i]])
			);
		const t = [];
		return r('readonly', (n) => As(n, (s) => t.push([s.key, s.value])).then(() => t));
	});
}
const $s = (r) => r.map((e) => ({ isWorking: e.isWorking, timestamp: e.timestamp.toMillis() })),
	Ws = (r) => r.map((e) => ({ isWorking: e.isWorking, timestamp: f.fromMillis(e.timestamp) })),
	qs = async (r = f.now().toFormat(Qe)) => (await Ls(r)) ?? [],
	Hs = async () => (await Zs()).map((e) => [e[0], Ws(e[1])]),
	Ys = (r, e) => {
		const t = { isWorking: e, timestamp: f.now() };
		return r.push(t), Nr(f.now().toFormat(Qe), $s(r)), r;
	},
	Ps = (r = f.now().toFormat(Qe)) => Nr(r, []),
	Rs = (r, e, t, n) => {
		if (e.isWorking) {
			const a = w.fromDateTimes(e.timestamp, f.now());
			return t === n.length - 1 ? r.plus(a.toDuration()) : r;
		}
		const s = w.fromDateTimes(n[t - 1].timestamp, e.timestamp);
		return r.plus(s.toDuration());
	},
	zs = (r, e, t, n) => {
		const s = n[t - 1];
		return !e.isWorking || !s || (s && s != null && s.isWorking)
			? r
			: r.plus(w.fromDateTimes(s.timestamp, e.timestamp).toDuration());
	},
	Gs = (r) => r.reduce(Rs, m.fromMillis(0)).toFormat(Er),
	_s = (r) => r.reduce(zs, m.fromMillis(0)).toFormat(Er);
export {
	f as D,
	Er as P,
	Us as S,
	Cs as a,
	qs as b,
	Ys as c,
	Ps as d,
	_s as e,
	Hs as f,
	Gs as g,
	Ws as r
};
