const l = [
  "/_app/immutable/entry/app.1db7ef4d.js",
  "/_app/immutable/chunks/0.28606ac5.js",
  "/_app/immutable/chunks/1.7878ee19.js",
  "/_app/immutable/chunks/2.a100af87.js",
  "/_app/immutable/chunks/3.87daa678.js",
  "/_app/immutable/chunks/4.0c2f7817.js",
  "/_app/immutable/chunks/Title.39a9b4d3.js",
  "/_app/immutable/chunks/_page.57618ffe.js",
  "/_app/immutable/chunks/_page.da46b06b.js",
  "/_app/immutable/chunks/_page.fca24c55.js",
  "/_app/immutable/chunks/index.66fa1388.js",
  "/_app/immutable/chunks/singletons.0f84a156.js",
  "/_app/immutable/chunks/stores.d905eafe.js",
  "/_app/immutable/assets/fira-mono-all-400-normal.1e3b098c.woff",
  "/_app/immutable/assets/fira-mono-cyrillic-400-normal.c7d433fd.woff2",
  "/_app/immutable/assets/fira-mono-cyrillic-ext-400-normal.3df7909e.woff2",
  "/_app/immutable/assets/fira-mono-greek-400-normal.a8be01ce.woff2",
  "/_app/immutable/assets/fira-mono-greek-ext-400-normal.9e2fe623.woff2",
  "/_app/immutable/assets/fira-mono-latin-400-normal.e43b3538.woff2",
  "/_app/immutable/assets/fira-mono-latin-ext-400-normal.6bfabd30.woff2",
  "/_app/immutable/entry/start.ea7ec782.js",
  "/_app/immutable/entry/error.svelte.773112ed.js",
  "/_app/immutable/assets/github.1ea8d62e.svg",
  "/_app/immutable/assets/svelte-logo.87df40b8.svg",
  "/_app/immutable/assets/_layout.a6b1326c.css",
  "/_app/immutable/entry/_layout.svelte.3eed9f86.js",
  "/_app/immutable/assets/_page.4e9e61d8.css",
  "/_app/immutable/entry/_page.svelte.17462e15.js",
  "/_app/immutable/entry/_page.ts.9c5eea7e.js",
  "/_app/immutable/entry/about-page.svelte.5b650750.js",
  "/_app/immutable/entry/about-page.ts.04f27f0d.js",
  "/_app/immutable/assets/_page.0b3e0212.css",
  "/_app/immutable/entry/journal-page.svelte.2920d48f.js",
  "/_app/immutable/entry/journal-page.ts.9c5eea7e.js"
], c = [
  "/.nojekyll",
  "/app.webmanifest",
  "/favicon_192.png",
  "/favicon_32.png",
  "/favicon_512.png",
  "/favicon_apple_sucks.png",
  "/hammer-wrench.svg",
  "/robots.txt"
], u = "1677835912317", n = self, m = `cache-${u}`, i = [
  ...l,
  // the app itself
  ...c
  // everything in `static`
];
n.addEventListener("install", (a) => {
  async function e() {
    await (await caches.open(m)).addAll(i);
  }
  a.waitUntil(e());
});
n.addEventListener("activate", (a) => {
  async function e() {
    for (const s of await caches.keys())
      s !== m && await caches.delete(s);
  }
  a.waitUntil(e());
});
n.addEventListener("fetch", (a) => {
  if (a.request.method !== "GET")
    return;
  async function e() {
    const s = new URL(a.request.url), t = await caches.open(m);
    if (i.includes(s.pathname))
      return t.match(a.request);
    try {
      const p = await fetch(a.request);
      return p.status === 200 && t.put(a.request, p.clone()), p;
    } catch {
      return t.match(a.request);
    }
  }
  a.respondWith(e());
});
