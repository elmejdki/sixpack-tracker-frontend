/* eslint-disable no-restricted-globals */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('static').then(
      cache => cache.addAll(['./public/', './public/logo192.png', './src/stylesheet/*.css']),
    ),
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(
      response => response || fetch(e.request),
    ),
  );
});
