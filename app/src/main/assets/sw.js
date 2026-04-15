// 哒哒宝贝 - Service Worker
const CACHE_NAME = 'dada-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/images/question.png',
  '/images/view.png',
  '/images/draw.png',
  '/images/photo.png'
];

// 安装时缓存资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('缓存已打开');
        return cache.addAll(urlsToCache);
      })
  );
});

// 拦截请求并从缓存中返回
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 如果在缓存中找到，直接返回
        if (response) {
          return response;
        }
        // 否则发起网络请求
        return fetch(event.request);
      })
  );
});

// 激活时清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
