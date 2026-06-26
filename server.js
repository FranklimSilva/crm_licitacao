// server.js (na raiz do projeto)
import('./dist/server/server.js')
  .then((mod) => {
    // Tenta executar o export padrão se for uma função/app express
    if (typeof mod.default === 'function') {
      const app = mod.default;
      const port = process.env.PORT || 3000;
      app.listen(port, () => {
        console.log(`Servidor iniciado via proxy na porta ${port}`);
      });
    } else if (mod.default && mod.default.listen) {
      // Se o arquivo compilado já chama o listen internamente ou expõe um objeto com .listen
      mod.default.listen(process.env.PORT || 3000);
    }
  })
  .catch((err) => {
    console.error('Erro ao iniciar o servidor através do proxy da raiz:', err);
  });