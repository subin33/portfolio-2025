// 빈 서비스 워커 파일
// 404 오류 방지를 위해 생성
// 실제 서비스 워커 기능이 필요할 때 확장 가능

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
