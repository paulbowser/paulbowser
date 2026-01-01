const cacheName="calc-pwa-v1";
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
  "apps/curbCalculator.js",
  "apps/curbcalc.html",
  "apps/sidewalkCalculator.js",
  "apps/sidewalkcalc.html",
  "apps/tabtest.html"
];

self.addEventListener("install",(e)=>{
  e.waitUntil(caches.open(cacheName).then((c)=>c.addAll(files)));
});

self.addEventListener("fetch",(e)=>{
  e.respondWith(caches.match(e.request).then((r)=>r||fetch(e.request)));
});
