import process from "node:process";
import type { Cliente, Faturamento, Lead, LeadStatus, Oportunidade } from "./types";

type LeadRow = {
  id: string;
  numero_edital: string;
  orgao: string;
  objeto: string;
  modalidade: Lead["modalidade"];
  valor_estimado: number;
  data_abertura: string;
  uf: string;
  status: Lead["status"];
  fonte: "Effecti";
};

type ClienteRow = {
  id: string;
  razao_social: string;
  nome_fantasia: string;
  cnpj: string;
  contato: string;
  email: string;
  telefone: string;
  segmento: string;
  cidade: string;
  uf: string;
  ativo: boolean;
  desde: string;
};

type OportunidadeRow = {
  id: string;
  cliente: string;
  edital: string;
  orgao: string;
  etapa: Oportunidade["etapa"];
  valor: number;
  probabilidade: number;
  abertura: string;
  responsavel: string;
};

type FaturamentoRow = {
  mes: string;
  contratos: number;
  valor: number;
  ordem: number;
};

const table = {
  leads: "leads",
  clientes: "clientes",
  oportunidades: "oportunidades",
  faturamento: "faturamento",
} as const;

function getConfig() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  return { url, key };
}

export function isSupabaseConfigured() {
  const { url, key } = getConfig();
  return Boolean(url && key);
}

function assertConfig() {
  const config = getConfig();
  if (!config.url || !config.key) {
    throw new Error("Supabase nao configurado. Preencha SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.");
  }
  return config as { url: string; key: string };
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { url, key } = assertConfig();
  const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation,resolution=merge-duplicates",
      ...(init.headers ?? {}),
    },
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Supabase ${res.status}: ${detail}`);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

const leadFromRow = (row: LeadRow): Lead => ({
  id: row.id,
  numeroEdital: row.numero_edital,
  orgao: row.orgao,
  objeto: row.objeto,
  modalidade: row.modalidade,
  valorEstimado: Number(row.valor_estimado),
  dataAbertura: row.data_abertura,
  uf: row.uf,
  status: row.status,
  fonte: row.fonte,
});

const leadToRow = (lead: Lead): LeadRow => ({
  id: lead.id,
  numero_edital: lead.numeroEdital,
  orgao: lead.orgao,
  objeto: lead.objeto,
  modalidade: lead.modalidade,
  valor_estimado: lead.valorEstimado,
  data_abertura: lead.dataAbertura,
  uf: lead.uf,
  status: lead.status,
  fonte: lead.fonte,
});

const clienteFromRow = (row: ClienteRow): Cliente => ({
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
  desde: row.desde,
});

const clienteToRow = (cliente: Cliente): ClienteRow => ({
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
  desde: cliente.desde,
});

const oportunidadeFromRow = (row: OportunidadeRow): Oportunidade => ({
  id: row.id,
  cliente: row.cliente,
  edital: row.edital,
  orgao: row.orgao,
  etapa: row.etapa,
  valor: Number(row.valor),
  probabilidade: Number(row.probabilidade),
  abertura: row.abertura,
  responsavel: row.responsavel,
});

const oportunidadeToRow = (oportunidade: Oportunidade): OportunidadeRow => ({
  id: oportunidade.id,
  cliente: oportunidade.cliente,
  edital: oportunidade.edital,
  orgao: oportunidade.orgao,
  etapa: oportunidade.etapa,
  valor: oportunidade.valor,
  probabilidade: oportunidade.probabilidade,
  abertura: oportunidade.abertura,
  responsavel: oportunidade.responsavel,
});

const faturamentoFromRow = (row: FaturamentoRow): Faturamento => ({
  mes: row.mes,
  contratos: Number(row.contratos),
  valor: Number(row.valor),
});

function nextId(prefix: string, ids: string[]) {
  const max = ids.reduce((current, id) => {
    const value = Number(id.replace(`${prefix}-`, ""));
    return Number.isFinite(value) ? Math.max(current, value) : current;
  }, 0);
  return `${prefix}-${String(max + 1).padStart(3, "0")}`;
}

export async function getAllData() {
  const [leadRows, clienteRows, oportunidadeRows, faturamentoRows] = await Promise.all([
    request<LeadRow[]>(`${table.leads}?select=*&order=data_abertura.asc`),
    request<ClienteRow[]>(`${table.clientes}?select=*&order=nome_fantasia.asc`),
    request<OportunidadeRow[]>(`${table.oportunidades}?select=*&order=abertura.asc`),
    request<FaturamentoRow[]>(`${table.faturamento}?select=*&order=ordem.asc`),
  ]);

  return {
    leads: leadRows.map(leadFromRow),
    clientes: clienteRows.map(clienteFromRow),
    oportunidades: oportunidadeRows.map(oportunidadeFromRow),
    faturamento: faturamentoRows.map(faturamentoFromRow),
  };
}

export async function saveCliente(input: Omit<Cliente, "id"> & { id?: string }) {
  const existing = await request<ClienteRow[]>(`${table.clientes}?select=id`);
  const row = clienteToRow({ ...input, id: input.id || nextId("C", existing.map((item) => item.id)) });
  const [saved] = await request<ClienteRow[]>(`${table.clientes}?on_conflict=id`, {
    method: "POST",
    body: JSON.stringify(row),
  });
  return clienteFromRow(saved);
}

export async function updateClienteStatus(id: string, ativo: boolean) {
  const [saved] = await request<ClienteRow[]>(`${table.clientes}?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ ativo }),
  });
  return clienteFromRow(saved);
}

export async function saveOportunidade(input: Omit<Oportunidade, "id"> & { id?: string }) {
  const existing = await request<OportunidadeRow[]>(`${table.oportunidades}?select=id`);
  const row = oportunidadeToRow({ ...input, id: input.id || nextId("O", existing.map((item) => item.id)) });
  const [saved] = await request<OportunidadeRow[]>(`${table.oportunidades}?on_conflict=id`, {
    method: "POST",
    body: JSON.stringify(row),
  });
  return oportunidadeFromRow(saved);
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const [saved] = await request<LeadRow[]>(`${table.leads}?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  return leadFromRow(saved);
}

export async function syncEffectiLeads(sourceLeads: Lead[]) {
  const rows = sourceLeads.map(leadToRow);
  const saved = await request<LeadRow[]>(`${table.leads}?on_conflict=id`, {
    method: "POST",
    body: JSON.stringify(rows),
  });
  return { count: saved.length };
}

export async function saveFaturamento(input: Faturamento) {
  const ordemByMes = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const row: FaturamentoRow = {
    ...input,
    ordem: Math.max(1, ordemByMes.indexOf(input.mes) + 1),
  };
  const [saved] = await request<FaturamentoRow[]>(`${table.faturamento}?on_conflict=mes`, {
    method: "POST",
    body: JSON.stringify(row),
  });
  return faturamentoFromRow(saved);
}
