// Change this to your repository name
var GHPATH = './';
 
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
  "./dist/tranlsations/calendar.translations.af.js",
  "./dist/tranlsations/calendar.translations.ar.js",
  "./dist/tranlsations/calendar.translations.be.js",
  "./dist/tranlsations/calendar.translations.bg.js",
  "./dist/tranlsations/calendar.translations.bn.js",
  "./dist/tranlsations/calendar.translations.ca.js",
  "./dist/tranlsations/calendar.translations.da.js",
  "./dist/tranlsations/calendar.translations.de.js",
  "./dist/tranlsations/calendar.translations.el.js",
  "./dist/tranlsations/calendar.translations.en.js",
  "./dist/tranlsations/calendar.translations.eo.js",
  "./dist/tranlsations/calendar.translations.es.js",
  "./dist/tranlsations/calendar.translations.et.js",
  "./dist/tranlsations/calendar.translations.fa.js",
  "./dist/tranlsations/calendar.translations.fi.js",
  "./dist/tranlsations/calendar.translations.fr.js",
  "./dist/tranlsations/calendar.translations.fy.js",
  "./dist/tranlsations/calendar.translations.ga.js",
  "./dist/tranlsations/calendar.translations.gl.js",
  "./dist/tranlsations/calendar.translations.he.js",
  "./dist/tranlsations/calendar.translations.hi.js",
  "./dist/tranlsations/calendar.translations.hu.js",
  "./dist/tranlsations/calendar.translations.hy.js",
  "./dist/tranlsations/calendar.translations.id.js",
  "./dist/tranlsations/calendar.translations.is.js",
  "./dist/tranlsations/calendar.translations.it.js",
  "./dist/tranlsations/calendar.translations.ja.js",
  "./dist/tranlsations/calendar.translations.ka.js",
  "./dist/tranlsations/calendar.translations.ko.js",
  "./dist/tranlsations/calendar.translations.lb.js",
  "./dist/tranlsations/calendar.translations.lt.js",
  "./dist/tranlsations/calendar.translations.lv.js",
  "./dist/tranlsations/calendar.translations.ms.js",
  "./dist/tranlsations/calendar.translations.ne.js",
  "./dist/tranlsations/calendar.translations.nl.js",
  "./dist/tranlsations/calendar.translations.no.js",
  "./dist/tranlsations/calendar.translations.pl.js",
  "./dist/tranlsations/calendar.translations.pt.js",
  "./dist/tranlsations/calendar.translations.ro.js",
  "./dist/tranlsations/calendar.translations.si.js",
  "./dist/tranlsations/calendar.translations.sk.js",
  "./dist/tranlsations/calendar.translations.sl.js",
  "./dist/tranlsations/calendar.translations.sv.js",
  "./dist/tranlsations/calendar.translations.ta.js",
  "./dist/tranlsations/calendar.translations.te.js",
  "./dist/tranlsations/calendar.translations.th.js",
  "./dist/tranlsations/calendar.translations.tl.js",
  "./dist/tranlsations/calendar.translations.tr.js",
  "./dist/tranlsations/calendar.translations.uk.js",
  "./dist/tranlsations/calendar.translations.zh-tw.js",
  "./dist/tranlsations/calendar.translations.zh.js"
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