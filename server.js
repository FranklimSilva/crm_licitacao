
  console.log("=== INICIANDO O PROXY DO SERVER NA RAIZ ===");

// Tenta carregar o build de forma segura
try {
  import('./dist/server/server.js')
    .then(() => {
      console.log("=== ARQUIVO DIST/SERVER CARREGADO COM SUCESSO ===");
    })
    .catch((err) => {
      console.error("=== ERRO DENTRO DA PROMESSA DE IMPORTAÇÃO ===");
      console.error(err);
    });
} catch (globalError) {
  console.error("=== ERRO FATAL DE SINTAXE OU IMPORTAÇÃO ===");
  console.error(globalError);
}