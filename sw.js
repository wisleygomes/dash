const CACHE_NAME = "dashboard-estudos-v2"

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
]

/* INSTALL */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  )
  self.skipWaiting()
})

/* ACTIVATE */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
  )
  self.clients.claim()
})

/* FETCH */
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request)
    })
  )
})
