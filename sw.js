const CACHE_NAME = 'nb-app-v10';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  
  // Styles
  './styles/index.css',
  './styles/design-tokens.css',
  './styles/animations.css',
  './styles/components.css',
  './styles/pages.css',
  
  // Data
  './data/products.js',
  './data/community.js',
  
  // Components
  './components/nav.js',
  './components/impact-badge.js',
  './components/product-card.js',
  './components/product-modal.js',
  './components/story-card.js',
  
  // Pages
  './pages/home.js',
  './pages/discover.js',
  './pages/stylist.js',
  './pages/wardrobe.js',
  './pages/profile.js',
  
  // App
  './app.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cache if found, else fetch from network
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheAllowlist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
