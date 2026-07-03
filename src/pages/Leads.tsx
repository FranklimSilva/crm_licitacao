import { useEffect, useState } from "react";

import { AppShell, StatusBadge } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { brl, formatDate, type LeadStatus } from "@/lib/types";
import { RefreshCw, Zap, Filter } from "lucide-react";
import type { Lead, AppData } from "@/lib/types";
import { fetchAppData, postSyncEffectiLeads } from "@/lib/api";


const statusTone = (s: LeadStatus | string) =>
  s === "Qualificado" ? "success" :
  s === "Descartado" ? "muted" :
  s === "Analisando" ? "warning" :
  "info";

export default function Leads() {
  const [data, setData] = useState<AppData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const leads: Lead[] = data?.leads ?? [];

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchAppData();
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao carregar leads");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSync() {
    try {
      setSyncing(true);
      await postSyncEffectiLeads();
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao sincronizar Effecti");
      await load();
    } finally {
      setSyncing(false);
    }
  }

  return (
    <AppShell
      title="Leads"
      subtitle="Editais captados automaticamente via integração com a Effecti"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Filter className="size-4" /> Filtros</Button>
          <Button size="sm" className="bg-accent hover:bg-accent/90" onClick={handleSync} disabled={syncing}>
            <RefreshCw className={`size-4 ${syncing ? "animate-spin" : ""}`} /> {syncing ? "Sincronizando..." : "Sincronizar Effecti"}
          </Button>
        </div>
      }
    >
      {error && (
        <div className="mb-4 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="mb-6 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl p-5 flex items-center gap-4">
        <div className="size-10 rounded-lg bg-white/20 grid place-items-center">
          <Zap className="size-5" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">Integração Effecti ativa</p>
          <p className="text-xs text-primary-foreground/80">Última sincronização há 12 minutos · {leads.length} editais na base</p>
        </div>
        <span className="inline-flex items-center gap-2 text-xs bg-white/15 px-3 py-1.5 rounded-full">
          <span className="size-1.5 rounded-full bg-emerald-300 animate-pulse" /> Online
        </span>
      </div>

      {loading ? (
        <div className="bg-card border border-border rounded-xl p-6 text-sm text-muted-foreground">Carregando leads...</div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-muted-foreground">
                <tr className="text-left">
                  <th className="px-4 py-3 font-medium">Edital</th>
                  <th className="px-4 py-3 font-medium">Órgão</th>
                  <th className="px-4 py-3 font-medium">Objeto</th>
                  <th className="px-4 py-3 font-medium">Modalidade</th>
                  <th className="px-4 py-3 font-medium text-right">Valor estimado</th>
                  <th className="px-4 py-3 font-medium">Abertura</th>
                  <th className="px-4 py-3 font-medium">UF</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{l.numeroEdital}</td>
                    <td className="px-4 py-3 text-muted-foreground">{l.orgao}</td>
                    <td className="px-4 py-3 max-w-xs truncate text-muted-foreground" title={l.objeto}>{l.objeto}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{l.modalidade}</td>
                    <td className="px-4 py-3 text-right font-medium tabular-nums">{brl(l.valorEstimado)}</td>
                    <td className="px-4 py-3 text-muted-foreground tabular-nums">{formatDate(l.dataAbertura)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{l.uf}</td>
                    <td className="px-4 py-3">
                      <StatusBadge tone={statusTone(l.status) as never}>{l.status}</StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AppShell>
  );
}

