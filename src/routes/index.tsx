import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, StatusBadge } from "@/components/AppShell";
import { getAppData } from "@/lib/data";
import { brl } from "@/lib/types";
import { ArrowUpRight, TrendingUp, Inbox, Target, Wallet } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard - LicitaCRM" },
      { name: "description", content: "Visao geral de leads, clientes, oportunidades e faturamento de licitacoes." },
    ],
  }),
  loader: () => getAppData(),
  component: Dashboard,
});

function Dashboard() {
  const { leads, clientes, oportunidades, faturamento, source, message } = Route.useLoaderData();
  const novosLeads = leads.filter((l) => l.status === "Novo" || l.status === "Analisando").length;
  const clientesAtivos = clientes.filter((c) => c.ativo).length;
  const pipeline = oportunidades
    .filter((o) => o.etapa !== "Perdida" && o.etapa !== "Homologada")
    .reduce((s, o) => s + o.valor * (o.probabilidade / 100), 0);
  const totalMes = faturamento.at(-1)?.valor ?? 0;
  const maxFat = Math.max(...faturamento.map((f) => f.valor), 1);

  const kpis = [
    { label: "Novos leads (Effecti)", value: novosLeads, hint: source === "supabase" ? "sincronizado" : "dados locais", icon: Inbox, tone: "text-accent" },
    { label: "Clientes ativos", value: clientesAtivos, hint: `de ${clientes.length} cadastros`, icon: TrendingUp, tone: "text-emerald-600" },
    { label: "Pipeline ponderado", value: brl(pipeline), hint: "em disputa", icon: Target, tone: "text-primary" },
    { label: "Faturamento do mes", value: brl(totalMes), hint: faturamento.at(-1)?.mes ?? "sem dados", icon: Wallet, tone: "text-accent" },
  ];

  return (
    <AppShell title="Dashboard" subtitle="Resumo executivo das operacoes de licitacao">
      {source === "mock" && <SyncNotice message={message} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="bg-card border border-border rounded-xl p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{k.label}</p>
                <Icon className={`size-4 ${k.tone}`} />
              </div>
              <p className="mt-3 text-2xl font-semibold text-foreground tracking-tight">{k.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{k.hint}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold">Faturamento mensal</h2>
              <p className="text-xs text-muted-foreground">Contratos finalizados</p>
            </div>
            <Link to="/faturamento" className="text-xs text-primary hover:underline inline-flex items-center gap-1">
              Ver detalhes <ArrowUpRight className="size-3" />
            </Link>
          </div>
          <div className="flex items-end gap-3 h-48">
            {faturamento.map((f) => (
              <div key={f.mes} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-muted rounded-t-md relative overflow-hidden" style={{ height: "160px" }}>
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-accent rounded-t-md transition-all"
                    style={{ height: `${(f.valor / maxFat) * 100}%` }}
                  />
                </div>
                <span className="text-[11px] font-medium text-muted-foreground">{f.mes}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold">Leads recentes</h2>
            <Link to="/leads" className="text-xs text-primary hover:underline">Todos</Link>
          </div>
          <div className="space-y-3">
            {leads.slice(0, 5).map((l) => (
              <div key={l.id} className="flex items-start justify-between gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{l.numeroEdital}</p>
                  <p className="text-xs text-muted-foreground truncate">{l.orgao}</p>
                </div>
                <StatusBadge tone={l.status === "Qualificado" ? "success" : l.status === "Descartado" ? "muted" : "info"}>
                  {l.status}
                </StatusBadge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function SyncNotice({ message }: { message?: string }) {
  return (
    <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
      {message ?? "Dados locais em uso. Configure o Supabase para sincronizar."}
    </div>
  );
}
