# systemLicit - TODO

## Step 1 — Levantar carga de dados reais (Supabase) via `getAppData`
- Atualizar páginas: `src/pages/Dashboard.tsx` ✅, `src/pages/Leads.tsx` ✅, `src/pages/Clientes.tsx`, `src/pages/Oportunidades.tsx`, `src/pages/Faturamento.tsx`


- Substituir uso direto de `mock-data` por carregamento dos dados do server (com fallback quando Supabase não estiver configurado)
- Adicionar estados `loading`/`error`

## Step 2 — Conectar ações com server functions
- `src/pages/Leads.tsx`: conectar botão "Sincronizar Effecti" para chamar `syncEffectiLeads` e refazer o refresh dos dados
- `src/pages/Clientes.tsx`: conectar controles existentes (ativar/desativar) para chamar `toggleCliente`
- `src/pages/Leads.tsx`: se houver UI de alteração de status, conectar `updateLeadStatus`
- `src/pages/Oportunidades.tsx`/`src/pages/Faturamento.tsx`: conectar ações que façam sentido conforme UI existente

## Step 3 — Ajustar roteamento/integração Vercel
- Validar que a navegação funciona e que chamadas server/client rodam corretamente no build

## Step 4 — Testes rápidos
- Cenário Supabase configurado: dados e ações funcionam
- Cenário Supabase não configurado: app não quebra e continua com mock
- Builds/linters: `npm run build` e `npm run lint`

