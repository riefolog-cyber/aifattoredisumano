const CACHE_NAME = "fd-cache-v2";
const BASE = new URL(self.registration.scope).pathname.replace(/\/$/, "");
const withBase = (path) => `${BASE}${path}`;
const CORE_ASSETS = [
	withBase("/"),
	withBase("/index.html"),
	withBase("/manifest.webmanifest"),
	withBase("/icon.svg"),
	withBase("/icon-192.png"),
	withBase("/icon-512.png"),
	withBase("/favicon.ico"),
	withBase("/og-image.png"),
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => cache.addAll(CORE_ASSETS))
			.then(() => self.skipWaiting()),
	);
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
			.then(() => self.clients.claim()),
	);
});

self.addEventListener("fetch", (event) => {
	const { request } = event;
	if (request.method !== "GET") return;

	const url = new URL(request.url);
	if (url.origin !== self.location.origin) return;
	if (url.pathname.startsWith(withBase("/api/"))) return;

	// Navigazioni: rete prima, cache come fallback offline.
	if (request.mode === "navigate") {
		event.respondWith(
			fetch(request)
				.then((response) => {
					const copy = response.clone();
					caches.open(CACHE_NAME).then((cache) => cache.put(withBase("/index.html"), copy));
					return response;
				})
				.catch(() =>
					caches
						.match(withBase("/index.html"))
						.then((cached) => cached || caches.match(withBase("/"))),
				),
		);
		return;
	}

	// Asset statici: cache-first con aggiornamento in background.
	if (
		url.pathname.startsWith(withBase("/assets/")) ||
		/\.(css|js|mjs|woff2?|ttf|png|jpe?g|svg|ico|webmanifest)$/.test(url.pathname)
	) {
		event.respondWith(
			caches.match(request).then((cached) => {
				const network = fetch(request)
					.then((response) => {
						if (response.ok) {
							const copy = response.clone();
							caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
						}
						return response;
					})
					.catch(() => cached);
				return cached || network;
			}),
		);
	}
});
