// Grillas ATP — mantiene la app instalada siempre al día.
// No guarda copias viejas de la página: siempre busca la última versión en internet.
// Si no hay conexión, muestra un aviso claro en vez de una pantalla de error.
const VERSION = '2026-11-08';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

const SIN_CONEXION = `<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><title>Sin conexión</title>
<style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#F4F6F9;color:#16202B;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;padding:24px;box-sizing:border-box;text-align:center}
.c{max-width:360px;display:flex;flex-direction:column;gap:14px}h1{font-size:22px;margin:0}p{margin:0;color:#5B6470;font-size:16px;line-height:1.45}
button{height:52px;border:0;border-radius:12px;background:#1F5FAE;color:#fff;font-size:16px;font-weight:700}</style></head>
<body><div class="c"><h1>No hay conexión a internet</h1><p>Revisá que tengas datos o wifi y volvé a intentar.</p>
<button onclick="location.reload()">Volver a intentar</button></div></body></html>`;

self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET' || r.mode !== 'navigate') return;
  if (new URL(r.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(r, { cache: 'no-store' }).catch(() =>
      new Response(SIN_CONEXION, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
    )
  );
});
