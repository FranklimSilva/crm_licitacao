import { createFileRoute, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppShell, StatusBadge } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAppData, syncEffectiLeads, updateLeadStatus } from "@/lib/data";
import { brl, formatDate, leadStatuses, type LeadStatus } from "@/lib/types";
import { RefreshCw, Zap, Filter } from "lucide-react";

export const Route = createFileRoute("/leads")({
  head: () => ({
    meta: [
      { title: "Leads - LicitaCRM" },
      { name: "description", content: "Editais captados automaticamente via API Effecti." },
    ],
  }),
  loader: () => getAppData(),
  component: LeadsPage,
});

const statusTone = (s: string) =>
  s === "Qualificado" ? "success" :
  s === "Descartado" ? "muted" :
  s === "Analisando" ? "warning" : "info";

function LeadsPage() {
  const router = useRouter();
  const { leads, source, message } = Route.useLoaderData();

  async function onStatusChange(id: string, status: LeadStatus) {
    try {
      await updateLeadStatus({ data: { id, status } });
      toast.success("Status do lead atualizado");
      await router.invalidate();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Nao foi possivel atualizar o lead");
    }
  }

  async function onSync() {
    try {
      const result = await syncEffectiLeads();
      toast.success(`${result.count} leads sincronizados`);
      await router.invalidate();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Nao foi possivel sincronizar leads");
    }
  }

  return (
    <AppShell
      title="Leads"
      subtitle="Editais captados automaticamente via integracao com a Effecti"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Filter className="size-4" /> Filtros</Button>
          <Button size="sm" className="bg-accent hover:bg-accent/90" onClick={onSync}>
            <RefreshCw className="size-4" /> Sincronizar Effecti
          </Button>
        </div>
      }
    >
      {source === "mock" && <SyncNotice message={message} />}
      <div className="mb-6 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl p-5 flex items-center gap-4">
        <div className="size-10 rounded-lg bg-white/20 grid place-items-center">
          <Zap className="size-5" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">Integracao Effecti</p>
          <p className="text-xs text-primary-foreground/80">{source === "supabase" ? "Dados sincronizados com Supabase" : "Dados locais aguardando configuracao do banco"}</p>
        </div>
        <span className="inline-flex items-center gap-2 text-xs bg-white/15 px-3 py-1.5 rounded-full">
          <span className="size-1.5 rounded-full bg-emerald-300 animate-pulse" /> {source === "supabase" ? "Online" : "Local"}
        </span>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-muted-foreground">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium">Edital</th>
                <th className="px-4 py-3 font-medium">Orgao</th>
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
                  <td className="px-4 py-3 min-w-40">
                    <Select value={l.status} onValueChange={(value) => onStatusChange(l.id, value as LeadStatus)}>
                      <SelectTrigger className="h-8 border-0 shadow-none px-0 focus:ring-0">
                        <SelectValue asChild>
                          <StatusBadge tone={statusTone(l.status) as never}>{l.status}</StatusBadge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {leadStatuses.map((status) => <SelectItem key={status} value={status}>{status}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}

function SyncNotice({ message }: { message?: string }) {
  return <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{message}</div>;
}
