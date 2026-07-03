import type { AppData, LeadStatus, Cliente, Oportunidade, Faturamento } from "@/lib/types";

type AnyRecord = Record<string, unknown>;

function getApiBase() {
  // Se estiver rodando na Vercel com rewrites, mantenha a mesma origem.
  // Se houver um prefixo específico, ajuste aqui.
  return "";
}

async function apiCall<T>(path: string, init: RequestInit = {}) {
  const res = await fetch(`${getApiBase()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

// --- Queries ---
export async function fetchAppData(): Promise<AppData> {
  // endpoints provisionados pelo build server (ver server.js / vite output)
  // Como o projeto usa tanstack/react-start hoje, os handlers devem existir no server.
  // Mantemos a chamada genérica para não acoplar ao client-api do react-start.
  return apiCall<AppData>("/api/getAppData", { method: "GET" });
}

// --- Mutations ---
export async function postSyncEffectiLeads() {
  return apiCall<{ count: number }>("/api/syncEffectiLeads", { method: "POST" });
}

export async function postToggleCliente(input: { id: string; ativo: boolean }) {
  return apiCall<Cliente>("/api/toggleCliente", { method: "POST", body: JSON.stringify(input) });
}

export async function postUpdateLeadStatus(input: { id: string; status: LeadStatus }) {
  return apiCall<AnyRecord>("/api/updateLeadStatus", { method: "POST", body: JSON.stringify(input) });
}

export async function postSaveOportunidade(input: Omit<Oportunidade, "id"> & { id?: string }) {
  return apiCall<AnyRecord>("/api/saveOportunidade", { method: "POST", body: JSON.stringify(input) });
}

export async function postSaveFaturamento(input: Faturamento) {
  return apiCall<AnyRecord>("/api/saveFaturamento", { method: "POST", body: JSON.stringify(input) });
}

