// v38 — no-cache SW: delete all caches, never store anything
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Always go to network, never cache
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request));
});
