const p = [
		'/time-tracker/_app/immutable/entry/app.fbe8e921.js',
		'/time-tracker/_app/immutable/chunks/0.f2bfd8d0.js',
		'/time-tracker/_app/immutable/chunks/1.150f1ada.js',
		'/time-tracker/_app/immutable/chunks/2.b83fb694.js',
		'/time-tracker/_app/immutable/chunks/3.1cf54920.js',
		'/time-tracker/_app/immutable/chunks/4.077421c1.js',
		'/time-tracker/_app/immutable/chunks/_page.1806d283.js',
		'/time-tracker/_app/immutable/chunks/_page.da46b06b.js',
		'/time-tracker/_app/immutable/chunks/_page.fca24c55.js',
		'/time-tracker/_app/immutable/chunks/environment.9aa685ef.js',
		'/time-tracker/_app/immutable/chunks/index.66fa1388.js',
		'/time-tracker/_app/immutable/chunks/singletons.231985ca.js',
		'/time-tracker/_app/immutable/chunks/stores.141ecdb8.js',
		'/time-tracker/_app/immutable/chunks/workRecords.963190ac.js',
		'/time-tracker/_app/immutable/assets/fira-mono-all-400-normal.1e3b098c.woff',
		'/time-tracker/_app/immutable/assets/fira-mono-cyrillic-400-normal.c7d433fd.woff2',
		'/time-tracker/_app/immutable/assets/fira-mono-cyrillic-ext-400-normal.3df7909e.woff2',
		'/time-tracker/_app/immutable/assets/fira-mono-greek-400-normal.a8be01ce.woff2',
		'/time-tracker/_app/immutable/assets/fira-mono-greek-ext-400-normal.9e2fe623.woff2',
		'/time-tracker/_app/immutable/assets/fira-mono-latin-400-normal.e43b3538.woff2',
		'/time-tracker/_app/immutable/assets/fira-mono-latin-ext-400-normal.6bfabd30.woff2',
		'/time-tracker/_app/immutable/entry/start.cc22bb4e.js',
		'/time-tracker/_app/immutable/entry/error.svelte.2ca83db9.js',
		'/time-tracker/_app/immutable/assets/github.1ea8d62e.svg',
		'/time-tracker/_app/immutable/assets/svelte-logo.87df40b8.svg',
		'/time-tracker/_app/immutable/assets/_layout.a6b1326c.css',
		'/time-tracker/_app/immutable/entry/_layout.svelte.39d9e141.js',
		'/time-tracker/_app/immutable/assets/_page.4e9e61d8.css',
		'/time-tracker/_app/immutable/entry/_page.svelte.ae5b1ab9.js',
		'/time-tracker/_app/immutable/entry/_page.ts.9c5eea7e.js',
		'/time-tracker/_app/immutable/entry/about-page.svelte.5b650750.js',
		'/time-tracker/_app/immutable/entry/about-page.ts.13bb5e39.js',
		'/time-tracker/_app/immutable/assets/_page.0b3e0212.css',
		'/time-tracker/_app/immutable/entry/journal-page.svelte.7039a5d7.js',
		'/time-tracker/_app/immutable/entry/journal-page.ts.9c5eea7e.js'
	],
	n = [
		'/time-tracker/.nojekyll',
		'/time-tracker/app.webmanifest',
		'/time-tracker/favicon_192.png',
		'/time-tracker/favicon_32.png',
		'/time-tracker/favicon_512.png',
		'/time-tracker/favicon_apple_sucks.png',
		'/time-tracker/hammer-wrench.svg',
		'/time-tracker/robots.txt'
	],
	l = '1677799675769',
	m = self,
	c = `cache-${l}`,
	i = [
		...p,
		// the app itself
		...n
		// everything in `static`
	];
m.addEventListener('install', (e) => {
	async function a() {
		await (await caches.open(c)).addAll(i);
	}
	e.waitUntil(a());
});
m.addEventListener('activate', (e) => {
	async function a() {
		for (const t of await caches.keys()) t !== c && (await caches.delete(t));
	}
	e.waitUntil(a());
});
m.addEventListener('fetch', (e) => {
	if (e.request.method !== 'GET') return;
	async function a() {
		const t = new URL(e.request.url),
			r = await caches.open(c);
		if (i.includes(t.pathname)) return r.match(e.request);
		try {
			const s = await fetch(e.request);
			return s.status === 200 && r.put(e.request, s.clone()), s;
		} catch {
			return r.match(e.request);
		}
	}
	e.respondWith(a());
});
