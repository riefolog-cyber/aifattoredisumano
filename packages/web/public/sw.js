const CACHE_NAME = "fd-cache-v1";
const CORE_ASSETS = [
	"/",
	"/index.html",
	"/manifest.webmanifest",
	"/icon.svg",
	"/icon-192.png",
	"/icon-512.png",
	"/favicon.ico",
	"/og-image.png",
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
	if (url.pathname.startsWith("/api/")) return;

	// Navigazioni: rete prima, cache come fallback offline.
	if (request.mode === "navigate") {
		event.respondWith(
			fetch(request)
				.then((response) => {
					const copy = response.clone();
					caches.open(CACHE_NAME).then((cache) => cache.put("/index.html", copy));
					return response;
				})
				.catch(() =>
					caches.match("/index.html").then((cached) => cached || caches.match("/")),
				),
		);
		return;
	}

	// Asset statici: cache-first con aggiornamento in background.
	if (
		url.pathname.startsWith("/assets/") ||
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
