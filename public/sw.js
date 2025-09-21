const CACHE_NAME = 'talking-textiles-v1';
const urlsToCache = [
  '/',
  '/gallery/',
  '/images/thumbs/Angela_Davis-180.webp',
  '/images/thumbs/Copy_of_Gravey-180.webp',
  '/images/thumbs/Copy_of_Lillia_s_mom-180.webp',
  '/images/thumbs/Copy_of_pam_mom_2-180.webp',
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
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        return fetch(event.request).then(response => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response
          const responseToCache = response.clone();
          
          // Cache images and key pages
          if (event.request.url.includes('/images/') || 
              event.request.url.includes('/gallery/') ||
              event.request.url.includes('/artist_pages/')) {
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }
          
          return response;
        });
      })
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
