import { AppShell } from "@/components/AppShell";
import { brl, faturamento, oportunidades } from "@/lib/mock-data";
import { TrendingUp, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Faturamento() {
  const total = faturamento.reduce((s, f) => s + f.valor, 0);
  const totalContratos = faturamento.reduce((s, f) => s + f.contratos, 0);
  const ticket = total / totalContratos;
  const max = Math.max(...faturamento.map((f) => f.valor));
  const ultimo = faturamento[faturamento.length - 1];
  const penult = faturamento[faturamento.length - 2];
  const variacao = ((ultimo.valor - penult.valor) / penult.valor) * 100;

  const homologadas = oportunidades.filter((o) => o.etapa === "Homologada");

  return (
    <AppShell
      title="Faturamento"
      subtitle="Contratos finalizados em 2026"
      actions={<Button variant="outline" size="sm"><Download className="size-4" /> Exportar</Button>}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total acumulado</p>
          <p className="mt-2 text-2xl font-semibold tabular-nums">{brl(total)}</p>
          <p className="mt-1 text-xs text-emerald-600 inline-flex items-center gap-1">
            <TrendingUp className="size-3" /> {variacao.toFixed(1)}% vs. mês anterior
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Contratos finalizados</p>
          <p className="mt-2 text-2xl font-semibold tabular-nums">{totalContratos}</p>
          <p className="mt-1 text-xs text-muted-foreground">no semestre</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Ticket médio</p>
          <p className="mt-2 text-2xl font-semibold tabular-nums">{brl(ticket)}</p>
          <p className="mt-1 text-xs text-muted-foreground">por contrato</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <h2 className="text-base font-semibold mb-1">Evolução mensal</h2>
        <p className="text-xs text-muted-foreground mb-6">Valor dos contratos finalizados por mês</p>
        <div className="space-y-3">
          {faturamento.map((f) => (
            <div key={f.mes} className="flex items-center gap-4">
              <span className="w-10 text-sm font-medium text-muted-foreground">{f.mes}</span>
              <div className="flex-1 h-8 bg-muted rounded-md overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-md flex items-center justify-end pr-3 transition-all"
                  style={{ width: `${(f.valor / max) * 100}%` }}
                >
                  <span className="text-xs font-semibold text-white tabular-nums">{brl(f.valor)}</span>
                </div>
              </div>
              <span className="w-24 text-right text-xs text-muted-foreground tabular-nums">{f.contratos} contratos</span>
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
              <th className="px-6 py-3 font-medium">Órgão</th>
              <th className="px-6 py-3 font-medium text-right">Valor</th>
            </tr>
          </thead>
          <tbody>
            {homologadas.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-muted-foreground text-xs">Nenhum contrato homologado registrado.</td></tr>
            )}
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
