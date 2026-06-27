import { createServer } from 'http';
import { Readable } from 'stream';

console.log("=== INICIANDO O ADAPTADOR HTTP PARA HOSTINGER ===");

// 1. Importa o módulo gerado pelo Vite
import('./dist/server/server.js').then((mod) => {
  const worker = mod.default;

  if (!worker || typeof worker.fetch !== 'function') {
    console.error("=== ERRO: O arquivo compilado não exporta uma função fetch válida ===");
    return;
  }

  // 2. Cria um servidor HTTP nativo do Node.js para escutar a porta da Hostinger
  const port = process.env.PORT || 3000;
  
  createServer(async (req, res) => {
    try {
      // Monta a URL completa para construir o objeto Request global
      const protocol = req.headers['x-forwarded-proto'] || 'http';
      const host = req.headers.host || `localhost:${port}`;
      const url = `${protocol}://${host}${req.url}`;

      // Configura os dados do corpo da requisição (se houver)
      let body = null;
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        body = Readable.toWeb(req);
      }

      // Cria um objeto Request no padrão Web API exigido pelo seu build
      const webRequest = new Request(url, {
        method: req.method,
        headers: new Headers(req.headers),
        body: body,
        duplex: 'half' // Necessário no Node.js recente para streams
      });

      // Executa a função fetch do seu projeto
      const webResponse = await worker.fetch(webRequest, {}, {});

      // Devolve a resposta do Worker para o servidor HTTP da Hostinger
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
  }).listen(port, () => {
    console.log(`=== ADAPTADOR RODANDO COM SUCESSO NA PORTA ${port} ===`);
  });

}).catch((err) => {
  console.error("Erro fatal ao carregar o build do servidor:", err);
});