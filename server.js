import { createServer } from 'http';
import { Readable } from 'stream';

console.log("=== INICIANDO O ADAPTADOR HTTP PARA HOSTINGER ===");

function hasPrefix(pathname = '', prefix = '') {
  return pathname === prefix || pathname.startsWith(prefix.endsWith('/') ? prefix : `${prefix}/`);
}

// Monta rotas HTTP básicas para /api/* chamando as funções já existentes no projeto.
// Isso garante que o front (src/lib/api.ts) funcione mesmo sem depender do wiring de @tanstack/react-start.
async function handleApi(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const path = url.pathname;

    // Não trate outras rotas aqui.
    if (!hasPrefix(path, '/api')) return false;

    const db = await import('./dist/server/server.js');
    // Espera-se que o build gere um worker fetch que trata /api/*; se não, falha.
    // Mantemos fallback para permitir evolução: se o worker existir, usamos via fetch.
    if (db?.default?.fetch) {
      const protocol = req.headers['x-forwarded-proto'] || 'http';
      const fullUrl = `${protocol}://${req.headers.host || 'localhost'}${req.url}`;

      let body = null;
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        body = Readable.toWeb(req);
      }

      const webRequest = new Request(fullUrl, {
        method: req.method,
        headers: new Headers(req.headers),
        body,
        duplex: 'half',
      });

      const webResponse = await db.default.fetch(webRequest, {}, {});
      res.statusCode = webResponse.status;
      webResponse.headers.forEach((value, key) => res.setHeader(key, value));

      if (webResponse.body) {
        const reader = webResponse.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          res.write(value);
        }
      }
      res.end();
      return true;
    }

    res.statusCode = 501;
    res.end('API not available');
    return true;
  } catch (e) {
    res.statusCode = 500;
    res.end('Erro Interno no Servidor (API)');
    return true;
  }
}

createServer(async (req, res) => {
  try {
    // Primeiro, tenta tratar /api/*.
    const handled = await handleApi(req, res);
    if (handled) return;

    // 1. Importa o módulo gerado pelo Vite
    const mod = await import('./dist/server/server.js');
    const worker = mod.default;

    if (!worker || typeof worker.fetch !== 'function') {
      console.error("=== ERRO: O arquivo compilado não exporta uma função fetch válida ===");
      res.statusCode = 500;
      res.end('Server build invalid');
      return;
    }

    // 2. Cria a URL completa para construir Request
    const port = process.env.PORT || 3000;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host || `localhost:${port}`;
    const url = `${protocol}://${host}${req.url}`;

    // Configura o corpo
    let body = null;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      body = Readable.toWeb(req);
    }

    const webRequest = new Request(url, {
      method: req.method,
      headers: new Headers(req.headers),
      body,
      duplex: 'half',
    });

    const webResponse = await worker.fetch(webRequest, {}, {});

    res.statusCode = webResponse.status;
    webResponse.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (webResponse.body) {
      const reader = webResponse.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (err) {
    console.error("Erro ao processar requisição no adaptador:", err);
    res.statusCode = 500;
    res.end("Erro Interno no Servidor (Adaptador)");
  }
}).listen(process.env.PORT || 3000, () => {
  const port = process.env.PORT || 3000;
  console.log(`=== ADAPTADOR RODANDO COM SUCESSO NA PORTA ${port} ===`);
});

