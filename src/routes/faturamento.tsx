import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, type ComponentProps, type FormEvent } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { brl, type Faturamento } from "@/lib/types";
import { getAppData, saveFaturamento } from "@/lib/data";
import { TrendingUp, FileText, Download, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/faturamento")({
  head: () => ({
    meta: [
      { title: "Faturamento - LicitaCRM" },
      { name: "description", content: "Valor dos contratos finalizados por mes." },
    ],
  }),
  loader: () => getAppData(),
  component: FaturamentoPage,
});

function FaturamentoPage() {
  const { faturamento, oportunidades, source, message } = Route.useLoaderData();
  const [editing, setEditing] = useState<Faturamento | null>(null);
  const [open, setOpen] = useState(false);
  const total = faturamento.reduce((s, f) => s + f.valor, 0);
  const totalContratos = faturamento.reduce((s, f) => s + f.contratos, 0);
  const ticket = totalContratos > 0 ? total / totalContratos : 0;
  const max = Math.max(...faturamento.map((f) => f.valor), 1);
  const ultimo = faturamento.at(-1)?.valor ?? 0;
  const penult = faturamento.at(-2)?.valor ?? (ultimo || 1);
  const variacao = ((ultimo - penult) / penult) * 100;
  const homologadas = oportunidades.filter((o) => o.etapa === "Homologada");

  function exportCsv() {
    const rows = [
      ["Mes", "Contratos", "Valor"],
      ...faturamento.map((f) => [f.mes, String(f.contratos), String(f.valor)]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "faturamento.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <AppShell
      title="Faturamento"
      subtitle="Contratos finalizados"
      actions={<Button variant="outline" size="sm" onClick={exportCsv}><Download className="size-4" /> Exportar</Button>}
    >
      {source === "mock" && <SyncNotice message={message} />}
      <FaturamentoDialog open={open} onOpenChange={setOpen} item={editing} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total acumulado</p>
          <p className="mt-2 text-2xl font-semibold tabular-nums">{brl(total)}</p>
          <p className="mt-1 text-xs text-emerald-600 inline-flex items-center gap-1"><TrendingUp className="size-3" /> {variacao.toFixed(1)}% vs. mes anterior</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Contratos finalizados</p>
          <p className="mt-2 text-2xl font-semibold tabular-nums">{totalContratos}</p>
          <p className="mt-1 text-xs text-muted-foreground">no periodo</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Ticket medio</p>
          <p className="mt-2 text-2xl font-semibold tabular-nums">{brl(ticket)}</p>
          <p className="mt-1 text-xs text-muted-foreground">por contrato</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <h2 className="text-base font-semibold mb-1">Evolucao mensal</h2>
        <p className="text-xs text-muted-foreground mb-6">Valor dos contratos finalizados por mes</p>
        <div className="space-y-3">
          {faturamento.map((f) => (
            <div key={f.mes} className="flex items-center gap-4">
              <span className="w-10 text-sm font-medium text-muted-foreground">{f.mes}</span>
              <button className="flex-1 h-8 bg-muted rounded-md overflow-hidden relative text-left" onClick={() => { setEditing(f); setOpen(true); }}>
                <div className="h-full bg-gradient-to-r from-primary to-accent rounded-md flex items-center justify-end pr-3 transition-all" style={{ width: `${(f.valor / max) * 100}%` }}>
                  <span className="text-xs font-semibold text-white tabular-nums">{brl(f.valor)}</span>
                </div>
              </button>
              <span className="w-24 text-right text-xs text-muted-foreground tabular-nums">{f.contratos} contratos</span>
              <Button variant="ghost" size="sm" onClick={() => { setEditing(f); setOpen(true); }}><Pencil className="size-3" /></Button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center gap-2">
          <FileText className="size-4 text-muted-foreground" />
          <h2 className="text-base font-semibold">Contratos homologados recentes</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-muted-foreground text-left">
            <tr>
              <th className="px-6 py-3 font-medium">Edital</th>
              <th className="px-6 py-3 font-medium">Cliente</th>
              <th className="px-6 py-3 font-medium">Orgao</th>
              <th className="px-6 py-3 font-medium text-right">Valor</th>
            </tr>
          </thead>
          <tbody>
            {homologadas.length === 0 && <tr><td colSpan={4} className="px-6 py-8 text-center text-muted-foreground text-xs">Nenhum contrato homologado registrado.</td></tr>}
            {homologadas.map((o) => (
              <tr key={o.id} className="border-t border-border">
                <td className="px-6 py-3 font-medium">{o.edital}</td>
                <td className="px-6 py-3 text-muted-foreground">{o.cliente}</td>
                <td className="px-6 py-3 text-muted-foreground">{o.orgao}</td>
                <td className="px-6 py-3 text-right font-semibold tabular-nums">{brl(o.valor)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}

function FaturamentoDialog({ open, onOpenChange, item }: { open: boolean; onOpenChange: (open: boolean) => void; item: Faturamento | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const data = item ?? { mes: "", contratos: 0, valor: 0 };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSaving(true);
    try {
      await saveFaturamento({
        data: {
          mes: String(form.get("mes") ?? ""),
          contratos: Number(form.get("contratos") ?? 0),
          valor: Number(form.get("valor") ?? 0),
        },
      });
      toast.success("Faturamento atualizado");
      onOpenChange(false);
      await router.invalidate();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Nao foi possivel salvar o faturamento");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Editar faturamento</DialogTitle></DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-3">
          <Field name="mes" label="Mes" defaultValue={data.mes} />
          <Field name="contratos" label="Contratos" defaultValue={data.contratos} type="number" min={0} />
          <Field name="valor" label="Valor" defaultValue={data.valor} type="number" min={0} step={1000} />
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" disabled={saving}>{saving ? "Salvando..." : "Salvar"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, ...props }: ComponentProps<typeof Input> & { label: string; name: string }) {
  return <label className="grid gap-1.5 text-xs font-medium text-muted-foreground">{label}<Input required {...props} /></label>;
}

function SyncNotice({ message }: { message?: string }) {
  return <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{message}</div>;
}

