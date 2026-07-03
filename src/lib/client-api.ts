import { useEffect, useState } from "react";
import type { AppData } from "@/lib/types";
import { getAppData, syncEffectiLeads, toggleCliente, updateLeadStatus } from "@/lib/data";

import type { LeadStatus } from "@/lib/types";

export function useAppData() {

  const [data, setData] = useState<AppData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getAppData();
        if (!cancelled) setData(result);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Erro ao carregar dados");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, error, loading };
}

export async function refreshAppData() {
  return getAppData();
}

export async function syncLeads() {
  return syncEffectiLeads();
}

export async function setClienteAtivo(id: string, ativo: boolean) {
  return toggleCliente({ id, ativo });
}

export async function setLeadStatus(id: string, status: LeadStatus) {
  return updateLeadStatus({ id, status });
}

