import { createServer } from 'node:http';
import { readFile, realpath } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 5174);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg' };
createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' }); response.end(); return;
    }
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const candidate = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    const relative = candidate.slice(root.length + 1);
    if (!candidate.startsWith(root + sep) || !['index.html', 'styles.css', 'script.js', 'NickersonsCS_SmallLogo.jpg'].includes(relative) && !relative.startsWith('assets' + sep)) {
      response.writeHead(404); response.end('Not found'); return;
    }
    const path = await realpath(candidate);
    if (!path.startsWith(root + sep)) { response.writeHead(404); response.end('Not found'); return; }
    const body = await readFile(path);
    response.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(404); response.end('Not found');
  }
}).listen(port, '127.0.0.1', () => console.log(`NCS preview: http://localhost:${port}`));
