
var staticCacheName = 'restaurant-reviews-v1';

/* Add default html, js and css to cache when
 * service worker installs
 */
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/css/styles.css',
        '/css/responsive.css',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js'
        ]);
    }));
});

/* Delete previous cache when updated service worker activates */
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-reviews-') &&
          cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        }));
    }));
});

/* Try to retrieve request from cache, if it is not available
 * fetch it and cache the result
 */
 self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();
        
        caches.open(staticCacheName).then(function (cache) {
          cache.put(event.request, responseClone);
        });

        return response;
      });
    }
  }));
});