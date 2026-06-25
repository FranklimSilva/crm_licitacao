import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { clientes, faturamento, leads, oportunidades } from "./mock-data";
import { leadStatuses, oportunidadeEtapas, type AppData } from "./types";

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
  desde: z.string().min(1),
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
  responsavel: z.string().min(1),
});

const leadStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(leadStatuses),
});

const faturamentoSchema = z.object({
  mes: z.string().min(1),
  contratos: z.coerce.number().int().nonnegative(),
  valor: z.coerce.number().nonnegative(),
});

const fallbackData = (): AppData => ({
  leads,
  clientes,
  oportunidades,
  faturamento,
  source: "mock",
  message: "Configure SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY para sincronizar com o banco.",
});

async function loadSupabaseData(): Promise<AppData> {
  const db = await import("./supabase.server");
  if (!db.isSupabaseConfigured()) return fallbackData();
  return { ...(await db.getAllData()), source: "supabase" };
}

export const getAppData = createServerFn({ method: "GET" }).handler(async () => loadSupabaseData());

export const saveCliente = createServerFn({ method: "POST" })
  .validator(clienteSchema)
  .handler(async ({ data }) => {
    const db = await import("./supabase.server");
    return db.saveCliente(data);
  });

export const toggleCliente = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().min(1), ativo: z.boolean() }))
  .handler(async ({ data }) => {
    const db = await import("./supabase.server");
    return db.updateClienteStatus(data.id, data.ativo);
  });

export const saveOportunidade = createServerFn({ method: "POST" })
  .validator(oportunidadeSchema)
  .handler(async ({ data }) => {
    const db = await import("./supabase.server");
    return db.saveOportunidade(data);
  });

export const updateLeadStatus = createServerFn({ method: "POST" })
  .validator(leadStatusSchema)
  .handler(async ({ data }) => {
    const db = await import("./supabase.server");
    return db.updateLeadStatus(data.id, data.status);
  });

export const syncEffectiLeads = createServerFn({ method: "POST" }).handler(async () => {
  const db = await import("./supabase.server");
  return db.syncEffectiLeads(leads);
});

export const saveFaturamento = createServerFn({ method: "POST" })
  .validator(faturamentoSchema)
  .handler(async ({ data }) => {
    const db = await import("./supabase.server");
    return db.saveFaturamento(data);
  });
