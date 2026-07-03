import { AppShell, StatusBadge } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { brl, formatDate, oportunidades, type Oportunidade } from "@/lib/mock-data";
import { Plus } from "lucide-react";

const etapas: Oportunidade["etapa"][] = [
  "Estudo do edital",
  "Documentação",
  "Proposta enviada",
  "Disputa",
  "Habilitação",
  "Homologada",
  "Perdida",
];

const etapaColor: Record<Oportunidade["etapa"], string> = {
  "Estudo do edital": "border-t-slate-400",
  "Documentação": "border-t-sky-400",
  "Proposta enviada": "border-t-indigo-400",
  "Disputa": "border-t-amber-400",
  "Habilitação": "border-t-violet-400",
  "Homologada": "border-t-emerald-500",
  "Perdida": "border-t-red-400",
};

export default function Oportunidades() {
  const totalPipeline = oportunidades
    .filter((o) => o.etapa !== "Perdida" && o.etapa !== "Homologada")
    .reduce((s, o) => s + o.valor, 0);

  return (
    <AppShell
      title="Oportunidades"
      subtitle={`${oportunidades.length} licitações · ${brl(totalPipeline)} em disputa`}
      actions={<Button size="sm"><Plus className="size-4" /> Nova oportunidade</Button>}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 overflow-x-auto pb-2">
        {etapas.map((etapa) => {
          const items = oportunidades.filter((o) => o.etapa === etapa);
          const soma = items.reduce((s, o) => s + o.valor, 0);
          return (
            <div key={etapa} className={`bg-muted/40 border-t-4 ${etapaColor[etapa]} rounded-lg p-3 flex flex-col gap-3 min-w-[240px]`}>
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide">{etapa}</h3>
                <span className="text-[10px] font-semibold text-muted-foreground bg-background px-1.5 py-0.5 rounded">{items.length}</span>
              </div>
              <p className="text-[11px] text-muted-foreground tabular-nums -mt-1">{brl(soma)}</p>
              <div className="space-y-2">
                {items.length === 0 && (
                  <p className="text-[11px] text-muted-foreground italic px-1">Nenhuma oportunidade</p>
                )}
                {items.map((o) => (
                  <article key={o.id} className="bg-card border border-border rounded-md p-3 hover:shadow-sm hover:border-primary/30 transition-all cursor-pointer">
                    <p className="text-xs font-semibold truncate">{o.edital}</p>
                    <p className="text-[11px] text-muted-foreground truncate mt-0.5">{o.cliente}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{o.orgao}</p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                      <span className="text-xs font-semibold tabular-nums">{brl(o.valor)}</span>
                      <StatusBadge tone={o.probabilidade >= 70 ? "success" : o.probabilidade >= 40 ? "warning" : "muted"}>
                        {o.probabilidade}%
                      </StatusBadge>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1.5">Abertura: {formatDate(o.abertura)}</p>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
