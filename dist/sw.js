const CACHE_NAME = 'swt-cache-v4';
const OFFLINE_URL = '/offline.html';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/icon-192.png',
  '/icon-512.png'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Create a basic offline fallback html dynamically
      const offlineHtml = new Response(
        `<!doctype html>
         <html lang="en">
         <head>
           <meta charset="utf-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>Offline | Sketch Web Tech</title>
           <style>
             body {
               background-color: #030712;
               color: #f9fafb;
               font-family: 'Outfit', sans-serif;
               display: flex;
               flex-direction: column;
               justify-content: center;
               align-items: center;
               height: 100vh;
               margin: 0;
               text-align: center;
               padding: 20px;
             }
             .container {
               max-width: 500px;
               padding: 40px;
               background: rgba(15, 23, 42, 0.45);
               border: 1px solid rgba(255, 255, 255, 0.08);
               border-radius: 16px;
               box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
               backdrop-filter: blur(12px);
             }
             h1 {
               font-size: 2.5rem;
               margin-bottom: 1rem;
               background: linear-gradient(135deg, #06b6d4, #8b5cf6);
               -webkit-background-clip: text;
               -webkit-text-fill-color: transparent;
             }
             p {
               color: #9ca3af;
               line-height: 1.6;
               margin-bottom: 2rem;
             }
             .btn {
               display: inline-block;
               padding: 12px 24px;
               background: linear-gradient(135deg, #06b6d4, #8b5cf6);
               color: #fff;
               text-decoration: none;
               border-radius: 8px;
               font-weight: 600;
               transition: transform 0.2s;
             }
             .btn:hover {
               transform: translateY(-2px);
             }
           </style>
         </head>
         <body>
           <div class="container">
             <h1>You are Offline</h1>
             <p>It seems you are currently disconnected from the internet. Don't worry! You can still browse pages you've previously visited, or click below to retry.</p>
             <a href="/" class="btn">Retry Connection</a>
           </div>
         </body>
         </html>`,
        { headers: { 'Content-Type': 'text/html' } }
      );
      
      cache.put(OFFLINE_URL, offlineHtml);
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  // Only handle GET requests and exclude chrome-extension requests
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch in the background to update the cache (stale-while-revalidate)
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
            }
          })
          .catch(() => { /* ignore errors */ });
        
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          // Cache newly fetched assets
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {
          // If offline and request is an HTML navigation page, show offline page
          if (event.request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
          }
        });
    })
  );
});
