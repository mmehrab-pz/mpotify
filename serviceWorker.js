// const staticCacheName = "site-static-v1";
// const cacheAssets = [
//     "/",
//     "index.html",
//     "src/css/output.css",
//     "src/js/main.js",
//     "src/js/data.js",
// ];

// self.addEventListener("install", evt => {
//     evt.waitUntil(
//         caches
//         .open(staticCacheName)
//         .then(cache => {
//             console.log("caching assets...");
//             cache.addAll(cacheAssets);
//         })
//         .catch(err => {})
//     );
// });

// self.addEventListener("fetch", evt => {
//     evt.respondWith(
//         caches
//         .match(evt.request)
//         .then(res => {
//             return res || fetch(evt.request);
//         })
//         .catch(err => {
//             if (evt.request.url.indexOf(".html") > -1) {
//                 return caches.match("./index.html");
//             }
//         })
//     );
// });

// const staticCacheName = "mpotify-static-v1";
// const cacheAssets = [
//   "/",
//   "/index.html",
//   "/src/css/output.css",
//   "/src/js/main.js",
//   "/src/js/data.js",
//   "/src/asset/img/pwa-logo/192.png"
// ];

// // نصب Service Worker
// self.addEventListener("install", evt => {
//   evt.waitUntil(
//     caches.open(staticCacheName)
//       .then(cache => {
//         console.log("[ServiceWorker] Caching assets...");
//         return cache.addAll(cacheAssets);
//       })
//       .catch(err => console.error("[ServiceWorker] Caching failed:", err))
//   );
// });

// // فعال‌سازی و حذف کش‌های قدیمی
// self.addEventListener("activate", evt => {
//   evt.waitUntil(
//     caches.keys().then(keys => {
//       return Promise.all(
//         keys
//           .filter(key => key !== staticCacheName)
//           .map(key => caches.delete(key))
//       );
//     })
//   );
//   console.log("[ServiceWorker] Activated and old caches cleared");
// });

// // واکنش به درخواست‌ها (Fetch)
// self.addEventListener("fetch", evt => {
//   evt.respondWith(
//     caches.match(evt.request)
//       .then(cachedRes => {
//         // اگر فایل در کش بود، برگردون
//         if (cachedRes) return cachedRes;

//         // اگر نبود، از شبکه بگیر و در کش ذخیره کن
//         return fetch(evt.request)
//           .then(fetchRes => {
//             return caches.open(staticCacheName).then(cache => {
//               // فقط درخواست‌های GET رو کش کن
//               if (evt.request.method === "GET" && fetchRes.status === 200) {
//                 cache.put(evt.request.url, fetchRes.clone());
//               }
//               return fetchRes;
//             });
//           });
//       })
//       .catch(err => {
//         // در حالت آفلاین، اگر درخواست HTML بود index.html رو بده
//         if (evt.request.headers.get("accept")?.includes("text/html")) {
//           return caches.match("/index.html");
//         }
//       })
//   );
// });

const staticCacheName = "mpotify-static-v1";
const cacheAssets = [
  "/",
  "/index.html",
  "/src/css/output.css",
  "/src/js/main.js",
  "/src/js/data.js",
  "/src/asset/img/pwa-logo/192.png"
];

// نصب Service Worker و پیش‌کش کردن فایل‌های اولیه
self.addEventListener("install", evt => {
  evt.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      console.log("[ServiceWorker] Pre-caching assets...");
      return cache.addAll(cacheAssets);
    })
    .catch(err => console.error("[ServiceWorker] Pre-caching failed:", err))
  );
  self.skipWaiting(); // فعال‌سازی سریع
});

// فعال‌سازی و حذف کش‌های قدیمی
self.addEventListener("activate", evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim(); // کنترل تمام تب‌ها
  console.log("[ServiceWorker] Activated and old caches cleared");
});

// Network-First: همیشه شبکه را اولویت بده
self.addEventListener("fetch", evt => {
  evt.respondWith(
    fetch(evt.request)
    .then(fetchRes => {
      // اختیاری: فقط درخواست‌های GET را در کش ذخیره کن
      if (evt.request.method === "GET" && fetchRes.status === 200) {
        caches.open(staticCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
        });
      }
      return fetchRes;
    })
    .catch(() => {
      // وقتی آفلاین هست، fallback از کش
      return caches.match(evt.request)
        .then(cachedRes => cachedRes || caches.match("/index.html"));
    })
  );
});