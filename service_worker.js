// Change this to your repository name
var GHPATH = './';
 
// Choose a different app prefix name
var APP_PREFIX = 'qs_';
// The version of the cache. Every time you change any of the files
// you need to change this version (version_01, version_02…). 
// If you don't change the version, the service worker will give your
// users the old files!
var VERSION = 'version_1.05';

var CACHE_NAME = APP_PREFIX + VERSION

 
// The files to make available for offline use. make sure to add 
// others to this list
var URLS = [    
  // '/',
  `${GHPATH}stopsmoking.html`,
  `${GHPATH}css/main.css`,
  `${GHPATH}js/main.js`,
  `${GHPATH}js/calendar.js`,
  `${GHPATH}js/data.js`,
  `${GHPATH}js/index.js`,
  // added dependencies might break =Z
  "./dist/calendar.binding.js",
  "./dist/calendar.binding.min.js",
  "./dist/calendar.export.js",
  "./dist/calendar.export.min.js",
  "./dist/calendar.jquery.js",
  "./dist/calendar.jquery.min.js",
  "./dist/calendar.js",
  "./dist/calendar.js.css",
  "./dist/calendar.js.css.map",
  "./dist/calendar.js.min.css",
  "./dist/calendar.min.js",
  "./dist/translations/calendar.translations.af.js",
  "./dist/translations/calendar.translations.ar.js",
  "./dist/translations/calendar.translations.be.js",
  "./dist/translations/calendar.translations.bg.js",
  "./dist/translations/calendar.translations.bn.js",
  "./dist/translations/calendar.translations.ca.js",
  "./dist/translations/calendar.translations.da.js",
  "./dist/translations/calendar.translations.de.js",
  "./dist/translations/calendar.translations.el.js",
  "./dist/translations/calendar.translations.en.js",
  "./dist/translations/calendar.translations.eo.js",
  "./dist/translations/calendar.translations.es.js",
  "./dist/translations/calendar.translations.et.js",
  "./dist/translations/calendar.translations.fa.js",
  "./dist/translations/calendar.translations.fi.js",
  "./dist/translations/calendar.translations.fr.js",
  "./dist/translations/calendar.translations.fy.js",
  "./dist/translations/calendar.translations.ga.js",
  "./dist/translations/calendar.translations.gl.js",
  "./dist/translations/calendar.translations.he.js",
  "./dist/translations/calendar.translations.hi.js",
  "./dist/translations/calendar.translations.hu.js",
  "./dist/translations/calendar.translations.hy.js",
  "./dist/translations/calendar.translations.id.js",
  "./dist/translations/calendar.translations.is.js",
  "./dist/translations/calendar.translations.it.js",
  "./dist/translations/calendar.translations.ja.js",
  "./dist/translations/calendar.translations.ka.js",
  "./dist/translations/calendar.translations.ko.js",
  "./dist/translations/calendar.translations.lb.js",
  "./dist/translations/calendar.translations.lt.js",
  "./dist/translations/calendar.translations.lv.js",
  "./dist/translations/calendar.translations.ms.js",
  "./dist/translations/calendar.translations.ne.js",
  "./dist/translations/calendar.translations.nl.js",
  "./dist/translations/calendar.translations.no.js",
  "./dist/translations/calendar.translations.pl.js",
  "./dist/translations/calendar.translations.pt.js",
  "./dist/translations/calendar.translations.ro.js",
  "./dist/translations/calendar.translations.si.js",
  "./dist/translations/calendar.translations.sk.js",
  "./dist/translations/calendar.translations.sl.js",
  "./dist/translations/calendar.translations.sv.js",
  "./dist/translations/calendar.translations.ta.js",
  "./dist/translations/calendar.translations.te.js",
  "./dist/translations/calendar.translations.th.js",
  "./dist/translations/calendar.translations.tl.js",
  "./dist/translations/calendar.translations.tr.js",
  "./dist/translations/calendar.translations.uk.js",
  "./dist/translations/calendar.translations.zh-tw.js",
  "./dist/translations/calendar.translations.zh.js"

]


// self.addEventListener('install', event => {
//   event.waitUntil((async () => {
//     const cache = await caches.open(CACHE_NAME);
//     cache.addAll(URLS);
//   })());
// });

// self.addEventListener('fetch', event => {
//   event.respondWith((async () => {
//     const cache = await caches.open(CACHE_NAME);

//     // Get the resource from the cache.
//     const cachedResponse = await cache.match(event.request);
//     if (cachedResponse) {
//       return cachedResponse;
//     } else {
//         try {
//           // If the resource was not in the cache, try the network.
//           const fetchResponse = await fetch(event.request);

//           // Save the resource in the cache and return it.
//           // cache.add(event.request, fetchResponse.clone());
//           return fetchResponse;
//         } catch (e) {
//           // The network failed.
//         }
//     }
//   })());
// });

// code to delete caches

self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            // Return true if you want to remove this cache,
            // but remember that caches are shared across
            // the whole origin
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });

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