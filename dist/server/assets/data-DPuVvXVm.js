import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "./server-B-jqAdHj.js";
import { z } from "zod";
import { o as oportunidadeEtapas, l as leadStatuses } from "./types-vUQvXkYE.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const leads = [
  { id: "L-2841", numeroEdital: "PE 045/2026", orgao: "Prefeitura de Campinas", objeto: "Aquisicao de equipamentos de TI para escolas municipais", modalidade: "Pregao Eletronico", valorEstimado: 184e4, dataAbertura: "2026-06-28", uf: "SP", status: "Novo", fonte: "Effecti" },
  { id: "L-2840", numeroEdital: "PE 112/2026", orgao: "Governo do Estado da Bahia", objeto: "Servicos de consultoria em gestao publica", modalidade: "Pregao Eletronico", valorEstimado: 92e4, dataAbertura: "2026-06-25", uf: "BA", status: "Analisando", fonte: "Effecti" },
  { id: "L-2839", numeroEdital: "CC 008/2026", orgao: "DNIT", objeto: "Obras de recuperacao rodoviaria BR-101", modalidade: "Concorrencia", valorEstimado: 124e5, dataAbertura: "2026-07-12", uf: "RJ", status: "Qualificado", fonte: "Effecti" },
  { id: "L-2838", numeroEdital: "PE 077/2026", orgao: "Tribunal de Justica de MG", objeto: "Licenciamento de software juridico", modalidade: "Pregao Eletronico", valorEstimado: 48e4, dataAbertura: "2026-06-22", uf: "MG", status: "Qualificado", fonte: "Effecti" },
  { id: "L-2837", numeroEdital: "TP 014/2026", orgao: "UFMA", objeto: "Reforma de laboratorios de pesquisa", modalidade: "Tomada de Precos", valorEstimado: 32e4, dataAbertura: "2026-06-30", uf: "MA", status: "Analisando", fonte: "Effecti" },
  { id: "L-2836", numeroEdital: "DL 220/2026", orgao: "Ministerio da Saude", objeto: "Aquisicao emergencial de insumos hospitalares", modalidade: "Dispensa", valorEstimado: 215e3, dataAbertura: "2026-06-19", uf: "DF", status: "Descartado", fonte: "Effecti" },
  { id: "L-2835", numeroEdital: "PE 203/2026", orgao: "Prefeitura de Curitiba", objeto: "Sistema integrado de transporte publico", modalidade: "Pregao Eletronico", valorEstimado: 365e4, dataAbertura: "2026-07-05", uf: "PR", status: "Novo", fonte: "Effecti" },
  { id: "L-2834", numeroEdital: "PE 091/2026", orgao: "SESI Nacional", objeto: "Capacitacao corporativa em compliance", modalidade: "Pregao Eletronico", valorEstimado: 74e4, dataAbertura: "2026-07-02", uf: "DF", status: "Qualificado", fonte: "Effecti" }
];
const clientes = [
  { id: "C-001", razaoSocial: "Construtora Horizonte Ltda", nomeFantasia: "Horizonte", cnpj: "12.345.678/0001-90", contato: "Marina Souza", email: "marina@horizonte.com.br", telefone: "(11) 98765-4321", segmento: "Construcao Civil", cidade: "Sao Paulo", uf: "SP", ativo: true, desde: "2022-03-14" },
  { id: "C-002", razaoSocial: "TechGov Solucoes S.A.", nomeFantasia: "TechGov", cnpj: "98.765.432/0001-10", contato: "Rafael Lima", email: "rafael@techgov.com.br", telefone: "(21) 99887-7665", segmento: "Tecnologia", cidade: "Rio de Janeiro", uf: "RJ", ativo: true, desde: "2021-07-22" },
  { id: "C-003", razaoSocial: "MedSupply Distribuidora", nomeFantasia: "MedSupply", cnpj: "55.444.333/0001-22", contato: "Dra. Clara Pinto", email: "clara@medsupply.com.br", telefone: "(31) 98123-4567", segmento: "Saude", cidade: "Belo Horizonte", uf: "MG", ativo: true, desde: "2023-01-10" },
  { id: "C-004", razaoSocial: "Logistica Sul Express", nomeFantasia: "LogSul", cnpj: "22.111.000/0001-33", contato: "Pedro Almeida", email: "pedro@logsul.com.br", telefone: "(51) 99654-3210", segmento: "Logistica", cidade: "Porto Alegre", uf: "RS", ativo: false, desde: "2020-09-05" },
  { id: "C-005", razaoSocial: "EducaMais Treinamentos", nomeFantasia: "EducaMais", cnpj: "33.222.111/0001-44", contato: "Juliana Castro", email: "juliana@educamais.com.br", telefone: "(61) 99432-1098", segmento: "Educacao", cidade: "Brasilia", uf: "DF", ativo: true, desde: "2024-02-18" },
  { id: "C-006", razaoSocial: "Verde Engenharia Ambiental", nomeFantasia: "Verde", cnpj: "44.333.222/0001-55", contato: "Bruno Tavares", email: "bruno@verde.com.br", telefone: "(85) 98321-0987", segmento: "Meio Ambiente", cidade: "Fortaleza", uf: "CE", ativo: true, desde: "2023-06-30" }
];
const oportunidades = [
  { id: "O-501", cliente: "Horizonte", edital: "CC 008/2026", orgao: "DNIT", etapa: "Disputa", valor: 124e5, probabilidade: 65, abertura: "2026-07-12", responsavel: "Marina Souza" },
  { id: "O-502", cliente: "TechGov", edital: "PE 077/2026", orgao: "TJ-MG", etapa: "Proposta enviada", valor: 48e4, probabilidade: 70, abertura: "2026-06-22", responsavel: "Rafael Lima" },
  { id: "O-503", cliente: "MedSupply", edital: "PE 045/2026", orgao: "Pref. Campinas", etapa: "Documentacao", valor: 184e4, probabilidade: 50, abertura: "2026-06-28", responsavel: "Clara Pinto" },
  { id: "O-504", cliente: "EducaMais", edital: "PE 091/2026", orgao: "SESI Nacional", etapa: "Estudo do edital", valor: 74e4, probabilidade: 40, abertura: "2026-07-02", responsavel: "Juliana Castro" },
  { id: "O-505", cliente: "TechGov", edital: "PE 203/2026", orgao: "Pref. Curitiba", etapa: "Habilitacao", valor: 365e4, probabilidade: 80, abertura: "2026-07-05", responsavel: "Rafael Lima" },
  { id: "O-506", cliente: "Verde", edital: "PE 112/2026", orgao: "Gov. BA", etapa: "Homologada", valor: 92e4, probabilidade: 100, abertura: "2026-05-30", responsavel: "Bruno Tavares" },
  { id: "O-507", cliente: "Horizonte", edital: "TP 014/2026", orgao: "UFMA", etapa: "Perdida", valor: 32e4, probabilidade: 0, abertura: "2026-05-15", responsavel: "Marina Souza" }
];
const faturamento = [
  { mes: "Jan", contratos: 4, valor: 68e4 },
  { mes: "Fev", contratos: 6, valor: 92e4 },
  { mes: "Mar", contratos: 5, valor: 115e4 },
  { mes: "Abr", contratos: 8, valor: 148e4 },
  { mes: "Mai", contratos: 7, valor: 132e4 },
  { mes: "Jun", contratos: 9, valor: 186e4 }
];
const clienteSchema = z.object({
  id: z.string().optional(),
  razaoSocial: z.string().min(1),
  nomeFantasia: z.string().min(1),
  cnpj: z.string().min(1),
  contato: z.string().min(1),
  email: z.string().email(),
  telefone: z.string().min(1),
  segmento: z.string().min(1),
  cidade: z.string().min(1),
  uf: z.string().min(2).max(2),
  ativo: z.boolean().default(true),
  desde: z.string().min(1)
});
const oportunidadeSchema = z.object({
  id: z.string().optional(),
  cliente: z.string().min(1),
  edital: z.string().min(1),
  orgao: z.string().min(1),
  etapa: z.enum(oportunidadeEtapas),
  valor: z.coerce.number().nonnegative(),
  probabilidade: z.coerce.number().min(0).max(100),
  abertura: z.string().min(1),
  responsavel: z.string().min(1)
});
const leadStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(leadStatuses)
});
const faturamentoSchema = z.object({
  mes: z.string().min(1),
  contratos: z.coerce.number().int().nonnegative(),
  valor: z.coerce.number().nonnegative()
});
const fallbackData = () => ({
  leads,
  clientes,
  oportunidades,
  faturamento,
  source: "mock",
  message: "Configure SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY para sincronizar com o banco."
});
async function loadSupabaseData() {
  const db = await import("./supabase.server-CbQVGTOv.js");
  if (!db.isSupabaseConfigured()) return fallbackData();
  return {
    ...await db.getAllData(),
    source: "supabase"
  };
}
const getAppData_createServerFn_handler = createServerRpc({
  id: "3417601833420adce378d3113cec62688369d7f19c6e61fc3399237260287f8f",
  name: "getAppData",
  filename: "src/lib/data.ts"
}, (opts) => getAppData.__executeServer(opts));
const getAppData = createServerFn({
  method: "GET"
}).handler(getAppData_createServerFn_handler, async () => loadSupabaseData());
const saveCliente_createServerFn_handler = createServerRpc({
  id: "ccb8204591abff2bd843af2b03f108bc78d2dedf67e77e0fd1675e180a6fa5ed",
  name: "saveCliente",
  filename: "src/lib/data.ts"
}, (opts) => saveCliente.__executeServer(opts));
const saveCliente = createServerFn({
  method: "POST"
}).validator(clienteSchema).handler(saveCliente_createServerFn_handler, async ({
  data
}) => {
  const db = await import("./supabase.server-CbQVGTOv.js");
  return db.saveCliente(data);
});
const toggleCliente_createServerFn_handler = createServerRpc({
  id: "c286c2deb62bac8b2573e1d79e3a509e66157145667623c28d2631b99d97c6d8",
  name: "toggleCliente",
  filename: "src/lib/data.ts"
}, (opts) => toggleCliente.__executeServer(opts));
const toggleCliente = createServerFn({
  method: "POST"
}).validator(z.object({
  id: z.string().min(1),
  ativo: z.boolean()
})).handler(toggleCliente_createServerFn_handler, async ({
  data
}) => {
  const db = await import("./supabase.server-CbQVGTOv.js");
  return db.updateClienteStatus(data.id, data.ativo);
});
const saveOportunidade_createServerFn_handler = createServerRpc({
  id: "cf23e571fe73a057da38650d1f6272993f2bd14922e7858ecbbdbdbeaebe48aa",
  name: "saveOportunidade",
  filename: "src/lib/data.ts"
}, (opts) => saveOportunidade.__executeServer(opts));
const saveOportunidade = createServerFn({
  method: "POST"
}).validator(oportunidadeSchema).handler(saveOportunidade_createServerFn_handler, async ({
  data
}) => {
  const db = await import("./supabase.server-CbQVGTOv.js");
  return db.saveOportunidade(data);
});
const updateLeadStatus_createServerFn_handler = createServerRpc({
  id: "ccd2eedc89b1972217e0f7f607b7b138c0a1914cae1a7441a8334a62a2b85140",
  name: "updateLeadStatus",
  filename: "src/lib/data.ts"
}, (opts) => updateLeadStatus.__executeServer(opts));
const updateLeadStatus = createServerFn({
  method: "POST"
}).validator(leadStatusSchema).handler(updateLeadStatus_createServerFn_handler, async ({
  data
}) => {
  const db = await import("./supabase.server-CbQVGTOv.js");
  return db.updateLeadStatus(data.id, data.status);
});
const syncEffectiLeads_createServerFn_handler = createServerRpc({
  id: "c92e5896849cf7520040c95d7edf3d067381c3029421000a0c95dbb952dcf1c6",
  name: "syncEffectiLeads",
  filename: "src/lib/data.ts"
}, (opts) => syncEffectiLeads.__executeServer(opts));
const syncEffectiLeads = createServerFn({
  method: "POST"
}).handler(syncEffectiLeads_createServerFn_handler, async () => {
  const db = await import("./supabase.server-CbQVGTOv.js");
  return db.syncEffectiLeads(leads);
});
const saveFaturamento_createServerFn_handler = createServerRpc({
  id: "eeef9536cd71ec58c22dcf633dceb5a3c67bbf994fd670d4eef422ad8ae28647",
  name: "saveFaturamento",
  filename: "src/lib/data.ts"
}, (opts) => saveFaturamento.__executeServer(opts));
const saveFaturamento = createServerFn({
  method: "POST"
}).validator(faturamentoSchema).handler(saveFaturamento_createServerFn_handler, async ({
  data
}) => {
  const db = await import("./supabase.server-CbQVGTOv.js");
  return db.saveFaturamento(data);
});
export {
  getAppData_createServerFn_handler,
  saveCliente_createServerFn_handler,
  saveFaturamento_createServerFn_handler,
  saveOportunidade_createServerFn_handler,
  syncEffectiLeads_createServerFn_handler,
  toggleCliente_createServerFn_handler,
  updateLeadStatus_createServerFn_handler
};
