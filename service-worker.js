const CACHE_NAME = 'todo-pwa-cache-v1';
const FILES_TO_CACHE = [
  '/public/',
  '/public/index.html',
  '/public/manifest.json',
  '/public/icon.png',
  '/ui/styles.css',
  '/ui/app.js',
  '/ui/components/taskList.js',
  '/src/application/taskService.js',
  '/src/domain/task.js',
  '/src/infrastructure/localStorageRepo.js',
  '/src/infrastructure/sw-register.js'
];

// Instalar y cachear archivos
self.addEventListener('install', event => {
  console.log('[SW] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Cacheando archivos');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activar y limpiar cachés viejas
self.addEventListener('activate', event => {
  console.log('[SW] Activado');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Interceptar peticiones (estrategia cache-first)
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        console.log('[SW] Sirviendo de caché:', event.request.url);
        return response;
      }
      console.log('[SW] Fetch de red:', event.request.url);
      return fetch(event.request)
        .then(res => {
          
          return res;
        })
        .catch(() => {
          
        });
    })
  );
});