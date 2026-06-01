const CACHE_NAME = 'haxserver-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/main.js',
  '/Shark.png',
  '/title.png',
  '/lantern-transparent.png',
  '/footer.png',
  '/background.jpg',
  '/dark-background.png'
];

// Install event: cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[ServiceWorker] Pre-caching offline page and static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Fetch event: Network-first for API/Navigation, Cache-first for others
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Network-First strategy for API calls and Page Navigation
  if (url.pathname.startsWith('/api/') || event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone and cache the navigated HTML pages
          if (event.request.mode === 'navigate') {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails (Offline mode)
          return caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) return cachedResponse;
            // If the navigation request fails and isn't cached, you could return an offline page here
          });
        })
    );
    return;
  }

  // Cache-First strategy for static assets (images, scripts, styles)
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response; // Return from cache
      }
      return fetch(event.request).then(networkResponse => {
        // Cache the dynamically fetched asset for next time
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      });
    })
  );
});

// Activate event: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
