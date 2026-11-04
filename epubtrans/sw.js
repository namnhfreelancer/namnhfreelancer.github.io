// The web app that lived here moved to https://bilingual-book-generator.pages.dev/.
// Browsers that installed it keep running their offline copy through the old service worker, which checks this file
// for updates. This replacement takes over, deletes the app's offline caches, unregisters itself and reloads open tabs,
// which then load the notice in index.html.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys()) if (key.includes('/epubtrans/') || key.startsWith('workbox-')) await caches.delete(key);
      await self.registration.unregister();
      for (const client of await self.clients.matchAll({ type: 'window' })) client.navigate(client.url);
    })(),
  );
});
