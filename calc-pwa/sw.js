const cacheName="calc-pwa-v3";
const files=[
  "./",
  "index.html",
  "style.css",
  "app.js",
  "manifest.json",
  "icon.png",
  "apps/adaCalculator.js",
  "apps/adacalc.html",
  "apps/asphconc.html",
  "apps/asphconcCalculator.js",
  "apps/calctest.html",
  "apps/common.css",
  "apps/curbCalculator.js",
  "apps/curbcalc.html",
  "apps/formPersist.js",
  "apps/sidewalkCalculator.js",
  "apps/sidewalkcalc.html",
  "apps/tabtest.html",
  "apps/themeBridge.js"
];

self.addEventListener("install",(e)=>{
  e.waitUntil(caches.open(cacheName).then((c)=>c.addAll(files)));
});

self.addEventListener("fetch",(e)=>{
  e.respondWith(caches.match(e.request).then((r)=>r||fetch(e.request)));
});
