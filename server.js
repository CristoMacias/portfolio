const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT      = 3005;
const JSON_PATH = path.join(__dirname, 'dbVisitas.json');


function loadVisits() {
  const raw = fs.readFileSync(JSON_PATH, 'utf-8');
  return JSON.parse(raw);
}


const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === '/visits/stream') {

    res.writeHead(200, {
      'Content-Type':  'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection':    'keep-alive'
    });

    const visits = loadVisits();
    let index    = 0;

    const flush = () => {
      const data = JSON.stringify(visits.slice(0, index + 1));
      res.write(`data: ${data}\n\n`);
    };

    flush();
    const interval = setInterval(() => {
      if (index < visits.length - 1) {
        index++;
        flush();
      } else {
        index = 0;
        flush();
      }
    }, 4000);
    req.on('close', () => {
      clearInterval(interval);
      console.log('Cliente desconectado');
    });

    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
});

server.listen(PORT, () => {
  console.log(`Servidor SSE corriendo en http://localhost:${PORT}`);
  console.log(`Stream disponible en http://localhost:${PORT}/visits/stream`);
});