// Updated cache version to invalidate old cached layout/CSS assets
const CACHE_NAME = 'talking-textiles-v2';
// Core assets to pre-cache (keep minimal to avoid stale UI)
const urlsToCache = [
  '/',
  '/gallery/',
  '/styles/global.css',
  '/favicon.svg'
];

// Install event - cache critical resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache with network fallback
// Fetch strategy:
//  - HTML: network-first (so new deployments show up), fallback to cache
//  - CSS/JS: network-first then cache
//  - Images: cache-first then network to update silently
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const req = event.request;
  const accept = req.headers.get('accept') || '';

  // HTML documents
  if (accept.includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // CSS / JS network-first
  if (req.destination === 'style' || req.destination === 'script') {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // Images cache-first
  if (req.destination === 'image') {
    event.respondWith(
      caches.match(req).then(cached => {
        const fetchPromise = fetch(req).then(res => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(req, copy));
          }
          return res;
        });
        return cached || fetchPromise;
      })
    );
    return;
  }
  // Default: try cache then network
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req))
  );
});

// Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
