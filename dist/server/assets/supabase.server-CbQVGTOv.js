import process from "node:process";
const table = {
  leads: "leads",
  clientes: "clientes",
  oportunidades: "oportunidades",
  faturamento: "faturamento"
};
function getConfig() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  return { url, key };
}
function isSupabaseConfigured() {
  const { url, key } = getConfig();
  return Boolean(url && key);
}
function assertConfig() {
  const config = getConfig();
  if (!config.url || !config.key) {
    throw new Error("Supabase nao configurado. Preencha SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.");
  }
  return config;
}
async function request(path, init = {}) {
  const { url, key } = assertConfig();
  const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation,resolution=merge-duplicates",
      ...init.headers ?? {}
    }
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Supabase ${res.status}: ${detail}`);
  }
  if (res.status === 204) return void 0;
  return await res.json();
}
const leadFromRow = (row) => ({
  id: row.id,
  numeroEdital: row.numero_edital,
  orgao: row.orgao,
  objeto: row.objeto,
  modalidade: row.modalidade,
  valorEstimado: Number(row.valor_estimado),
  dataAbertura: row.data_abertura,
  uf: row.uf,
  status: row.status,
  fonte: row.fonte
});
const leadToRow = (lead) => ({
  id: lead.id,
  numero_edital: lead.numeroEdital,
  orgao: lead.orgao,
  objeto: lead.objeto,
  modalidade: lead.modalidade,
  valor_estimado: lead.valorEstimado,
  data_abertura: lead.dataAbertura,
  uf: lead.uf,
  status: lead.status,
  fonte: lead.fonte
});
const clienteFromRow = (row) => ({
  id: row.id,
  razaoSocial: row.razao_social,
  nomeFantasia: row.nome_fantasia,
  cnpj: row.cnpj,
  contato: row.contato,
  email: row.email,
  telefone: row.telefone,
  segmento: row.segmento,
  cidade: row.cidade,
  uf: row.uf,
  ativo: row.ativo,
  desde: row.desde
});
const clienteToRow = (cliente) => ({
  id: cliente.id,
  razao_social: cliente.razaoSocial,
  nome_fantasia: cliente.nomeFantasia,
  cnpj: cliente.cnpj,
  contato: cliente.contato,
  email: cliente.email,
  telefone: cliente.telefone,
  segmento: cliente.segmento,
  cidade: cliente.cidade.toString(),
  uf: cliente.uf.toUpperCase(),
  ativo: cliente.ativo,
  desde: cliente.desde
});
const oportunidadeFromRow = (row) => ({
  id: row.id,
  cliente: row.cliente,
  edital: row.edital,
  orgao: row.orgao,
  etapa: row.etapa,
  valor: Number(row.valor),
  probabilidade: Number(row.probabilidade),
  abertura: row.abertura,
  responsavel: row.responsavel
});
const oportunidadeToRow = (oportunidade) => ({
  id: oportunidade.id,
  cliente: oportunidade.cliente,
  edital: oportunidade.edital,
  orgao: oportunidade.orgao,
  etapa: oportunidade.etapa,
  valor: oportunidade.valor,
  probabilidade: oportunidade.probabilidade,
  abertura: oportunidade.abertura,
  responsavel: oportunidade.responsavel
});
const faturamentoFromRow = (row) => ({
  mes: row.mes,
  contratos: Number(row.contratos),
  valor: Number(row.valor)
});
function nextId(prefix, ids) {
  const max = ids.reduce((current, id) => {
    const value = Number(id.replace(`${prefix}-`, ""));
    return Number.isFinite(value) ? Math.max(current, value) : current;
  }, 0);
  return `${prefix}-${String(max + 1).padStart(3, "0")}`;
}
async function getAllData() {
  const [leadRows, clienteRows, oportunidadeRows, faturamentoRows] = await Promise.all([
    request(`${table.leads}?select=*&order=data_abertura.asc`),
    request(`${table.clientes}?select=*&order=nome_fantasia.asc`),
    request(`${table.oportunidades}?select=*&order=abertura.asc`),
    request(`${table.faturamento}?select=*&order=ordem.asc`)
  ]);
  return {
    leads: leadRows.map(leadFromRow),
    clientes: clienteRows.map(clienteFromRow),
    oportunidades: oportunidadeRows.map(oportunidadeFromRow),
    faturamento: faturamentoRows.map(faturamentoFromRow)
  };
}
async function saveCliente(input) {
  const existing = await request(`${table.clientes}?select=id`);
  const row = clienteToRow({ ...input, id: input.id || nextId("C", existing.map((item) => item.id)) });
  const [saved] = await request(`${table.clientes}?on_conflict=id`, {
    method: "POST",
    body: JSON.stringify(row)
  });
  return clienteFromRow(saved);
}
async function updateClienteStatus(id, ativo) {
  const [saved] = await request(`${table.clientes}?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ ativo })
  });
  return clienteFromRow(saved);
}
async function saveOportunidade(input) {
  const existing = await request(`${table.oportunidades}?select=id`);
  const row = oportunidadeToRow({ ...input, id: input.id || nextId("O", existing.map((item) => item.id)) });
  const [saved] = await request(`${table.oportunidades}?on_conflict=id`, {
    method: "POST",
    body: JSON.stringify(row)
  });
  return oportunidadeFromRow(saved);
}
async function updateLeadStatus(id, status) {
  const [saved] = await request(`${table.leads}?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ status })
  });
  return leadFromRow(saved);
}
async function syncEffectiLeads(sourceLeads) {
  const rows = sourceLeads.map(leadToRow);
  const saved = await request(`${table.leads}?on_conflict=id`, {
    method: "POST",
    body: JSON.stringify(rows)
  });
  return { count: saved.length };
}
async function saveFaturamento(input) {
  const ordemByMes = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const row = {
    ...input,
    ordem: Math.max(1, ordemByMes.indexOf(input.mes) + 1)
  };
  const [saved] = await request(`${table.faturamento}?on_conflict=mes`, {
    method: "POST",
    body: JSON.stringify(row)
  });
  return faturamentoFromRow(saved);
}
export {
  getAllData,
  isSupabaseConfigured,
  saveCliente,
  saveFaturamento,
  saveOportunidade,
  syncEffectiLeads,
  updateClienteStatus,
  updateLeadStatus
};
