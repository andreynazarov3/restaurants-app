const cacheName = "c1";

// cache site skeleton on install 

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(
        [
          '/css/styles.css',
          '/data/restaurants.json',
          '/index.html',
          '/restaurant.html',
          '/js/dbhelper.js',
          '/js/main.js',
          '/js/restaurant_info.js'
        ]
      );
    })
  );
});

// cache everything else on network requests

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(cacheName).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

/*

Neat Code from Google 
https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker

*/