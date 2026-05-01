const CACHE_NAME = 'telecom-v5';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './data/r7_2_setubi.yaml',
  './data/r7_2_houki.yaml',
  './data/r7_2_system.yaml',
  './data/r6_2_setubi.yaml',
  './data/r6_2_houki.yaml',
  './data/r6_2_system.yaml',
  './data/r7_1_setubi.yaml',
  './data/r7_1_houki.yaml',
  './data/r7_1_system.yaml',
  './data/r6_1_setubi.yaml',
  './data/r6_1_houki.yaml',
  './data/r6_1_system.yaml',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return response;
      }).catch(() => cached);
    })
  );
});
