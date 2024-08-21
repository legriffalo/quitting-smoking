// Change this to your repository name
var GHPATH = '/quitting-smoking';
 
// Choose a different app prefix name
var APP_PREFIX = 'qs_';
// The version of the cache. Every time you change any of the files
// you need to change this version (version_01, version_02…). 
// If you don't change the version, the service worker will give your
// users the old files!
var VERSION = 'version_1.03';

var CACHE_NAME = APP_PREFIX + VERSION

 
// The files to make available for offline use. make sure to add 
// others to this list
var URLS = [    
  '/quitting-smoking/',
  `${GHPATH}/stopsmoking.html`,
  `${GHPATH}/css/main.css`,
  `${GHPATH}/js/main.js`,
  `${GHPATH}/js/calendar.js`,
  `${GHPATH}/js/data.js`,
  `${GHPATH}/js/index.js`
  // `${GHPATH}/dist/**`

]

// code to delete caches

// self.addEventListener('activate', function(event) {
//     event.waitUntil(
//       caches.keys().then(function(cacheNames) {
//         return Promise.all(
//           cacheNames.filter(function(cacheName) {
//             // Return true if you want to remove this cache,
//             // but remember that caches are shared across
//             // the whole origin
//           }).map(function(cacheName) {
//             return caches.delete(cacheName);
//           })
//         );
//       })
//     );
//   });

self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url);
    e.respondWith(
      caches.match(e.request).then(function (request) {
        if (request) { 
          console.log('responding with cache : ' + e.request.url);
          return request
        } else {       
          console.log('file is not cached, fetching : ' + e.request.url);
          return fetch(e.request)
        }
      })
    )
  })
  
  self.addEventListener('install', function (e) {
    e.waitUntil(
      caches.open(CACHE_NAME).then(function (cache) {
        console.log('installing cache : ' + CACHE_NAME);
        return cache.addAll(URLS)
      })
    )
  })
  
  self.addEventListener('activate', function (e) {
    e.waitUntil(
      caches.keys().then(function (keyList) {
        var cacheWhitelist = keyList.filter(function (key) {
          return key.indexOf(APP_PREFIX)
        })
        cacheWhitelist.push(CACHE_NAME);
        return Promise.all(keyList.map(function (key, i) {
          if (cacheWhitelist.indexOf(key) === -1) {
            console.log('deleting cache : ' + keyList[i] );
            return caches.delete(keyList[i])
          }
        }))
      })
    )
  })