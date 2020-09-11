
// followed tutorial on youtube to better understand https://www.youtube.com/watch?v=ksXwaWHCW6k
const cachedName="Version-1";
const cachedAssets=['index.html','conf.css','manifest.json','api.js','/images/iconfinder-icon.svg'];
// call Install Event
self.addEventListener('install',evt=>{
console.log('Service Worker installed');
evt.waitUntil(
    caches.open(cachedName)
    .then(cache=>{
        console.log("Service Worker caching files");
        cache.addAll(cachedAssets);
    }).then(()=>self.skipWaiting())
);
});

// call activate Event
self.addEventListener('activate',evt=>{
    console.log('Service Worker activated');
    // remove old cashes
    evt.waitUntil(
        caches.keys()
        .then(cacheNames=>{
            return Promise.all(
                cacheNames.map(cache=>{
                    if(cache !==cachedName){
                        console.log("Service worker, deleting old cache");
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
    });

    // call fetch event/ using our cached file when no internet
    self.addEventListener('fetch',evt=>{
        console.log('Service worker is fetching');
        //check if network presents, if not load caches
        evt.respondWith(fetch(evt.request).catch(()=>caches.match(evt.request)));
    });

