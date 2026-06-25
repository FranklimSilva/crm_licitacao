import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, type ComponentProps, type FormEvent } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAppData, saveOportunidade } from "@/lib/data";
import { brl, formatDate, oportunidadeEtapas, type Oportunidade, type OportunidadeEtapa } from "@/lib/types";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/oportunidades")({
  head: () => ({
    meta: [
      { title: "Oportunidades - LicitaCRM" },
      { name: "description", content: "Pipeline completo de licitacoes, do estudo do edital a homologacao." },
    ],
  }),
  loader: () => getAppData(),
  component: OportunidadesPage,
});

const etapaColor: Record<OportunidadeEtapa, string> = {
  "Estudo do edital": "border-t-slate-400",
  Documentacao: "border-t-sky-400",
  "Proposta enviada": "border-t-indigo-400",
  Disputa: "border-t-amber-400",
  Habilitacao: "border-t-violet-500",
  Homologada: "border-t-emerald-500",
  Perdida: "border-t-rose-400",
};

const emptyOportunidade: Omit<Oportunidade, "id"> = {
  cliente: "",
  edital: "",
  orgao: "",
  etapa: "Estudo do edital",
  valor: 0,
  probabilidade: 40,
  abertura: new Date().toISOString().slice(0, 10),
  responsavel: "",
};

function OportunidadesPage() {
  const { oportunidades, source, message } = Route.useLoaderData();
  const [editing, setEditing] = useState<Oportunidade | null>(null);
  const [open, setOpen] = useState(false);
  const total = oportunidades.reduce((s, o) => s + o.valor, 0);
  const ativas = oportunidades.filter((o) => o.etapa !== "Homologada" && o.etapa !== "Perdida");

  return (
    <AppShell
      title="Oportunidades"
      subtitle={`${ativas.length} em andamento · pipeline total ${brl(total)}`}
      actions={<Button size="sm" onClick={() => { setEditing(null); setOpen(true); }}><Plus className="size-4" /> Nova oportunidade</Button>}
    >
      {source === "mock" && <SyncNotice message={message} />}
      <OportunidadeDialog open={open} onOpenChange={setOpen} oportunidade={editing} />
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-4 min-w-max">
          {oportunidadeEtapas.map((etapa) => {
            const itens = oportunidades.filter((o) => o.etapa === etapa);
            const valorEtapa = itens.reduce((s, o) => s + o.valor, 0);
            return (
              <div key={etapa} className="w-72 shrink-0">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div>
                    <h3 className="text-sm font-semibold">{etapa}</h3>
                    <p className="text-[11px] text-muted-foreground tabular-nums">{itens.length} · {brl(valorEtapa)}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {itens.length === 0 && <div className="border border-dashed border-border rounded-lg p-6 text-center text-xs text-muted-foreground">Sem itens</div>}
                  {itens.map((o) => (
                    <article key={o.id} onClick={() => { setEditing(o); setOpen(true); }} className={`bg-card border border-border border-t-4 ${etapaColor[o.etapa]} rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer`}>
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-[10px] font-mono text-muted-foreground">{o.id}</span>
                        <span className="text-[10px] font-semibold text-primary">{o.probabilidade}%</span>
                      </div>
                      <h4 className="text-sm font-semibold leading-tight mb-1">{o.edital}</h4>
                      <p className="text-xs text-muted-foreground mb-3 truncate">{o.orgao}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-foreground tabular-nums">{brl(o.valor)}</span>
                        <span className="text-muted-foreground">{formatDate(o.abertura)}</span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-border flex items-center gap-2">
                        <div className="size-6 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-[9px] font-bold text-white">
                          {o.responsavel.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] font-medium truncate">{o.cliente}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{o.responsavel}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

function OportunidadeDialog({ open, onOpenChange, oportunidade }: { open: boolean; onOpenChange: (open: boolean) => void; oportunidade: Oportunidade | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [etapa, setEtapa] = useState<OportunidadeEtapa>(oportunidade?.etapa ?? "Estudo do edital");
  const data = oportunidade ?? emptyOportunidade;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSaving(true);
    try {
      await saveOportunidade({
        data: {
          id: oportunidade?.id,
          cliente: String(form.get("cliente") ?? ""),
          edital: String(form.get("edital") ?? ""),
          orgao: String(form.get("orgao") ?? ""),
          etapa,
          valor: Number(form.get("valor") ?? 0),
          probabilidade: Number(form.get("probabilidade") ?? 0),
          abertura: String(form.get("abertura") ?? ""),
          responsavel: String(form.get("responsavel") ?? ""),
        },
      });
      toast.success(oportunidade ? "Oportunidade atualizada" : "Oportunidade criada");
      onOpenChange(false);
      await router.invalidate();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Nao foi possivel salvar a oportunidade");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader><DialogTitle>{oportunidade ? "Editar oportunidade" : "Nova oportunidade"}</DialogTitle></DialogHeader>
        <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field name="cliente" label="Cliente" defaultValue={data.cliente} />
          <Field name="edital" label="Edital" defaultValue={data.edital} />
          <Field name="orgao" label="Orgao" defaultValue={data.orgao} />
          <label className="grid gap-1.5 text-xs font-medium text-muted-foreground">
            Etapa
            <Select value={etapa} onValueChange={(value) => setEtapa(value as OportunidadeEtapa)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{oportunidadeEtapas.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
            </Select>
          </label>
          <Field name="valor" label="Valor" defaultValue={data.valor} type="number" min={0} step={1000} />
          <Field name="probabilidade" label="Probabilidade" defaultValue={data.probabilidade} type="number" min={0} max={100} />
          <Field name="abertura" label="Abertura" defaultValue={data.abertura} type="date" />
          <Field name="responsavel" label="Responsavel" defaultValue={data.responsavel} />
          <DialogFooter className="sm:col-span-2 pt-2">
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
