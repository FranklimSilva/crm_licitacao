import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { A as AppShell, S as StatusBadge } from "./AppShell-B9by1cew.js";
import { b as brl } from "./types-vUQvXkYE.js";
import { Inbox, TrendingUp, Target, Wallet, ArrowUpRight } from "lucide-react";
import { g as Route } from "./router-DqcL4HDi.js";
import "clsx";
import "tailwind-merge";
import "@tanstack/react-query";
import "react";
import "sonner";
import "./server-B-jqAdHj.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
import "zod";
function Dashboard() {
  const {
    leads,
    clientes,
    oportunidades,
    faturamento,
    source,
    message
  } = Route.useLoaderData();
  const novosLeads = leads.filter((l) => l.status === "Novo" || l.status === "Analisando").length;
  const clientesAtivos = clientes.filter((c) => c.ativo).length;
  const pipeline = oportunidades.filter((o) => o.etapa !== "Perdida" && o.etapa !== "Homologada").reduce((s, o) => s + o.valor * (o.probabilidade / 100), 0);
  const totalMes = faturamento.at(-1)?.valor ?? 0;
  const maxFat = Math.max(...faturamento.map((f) => f.valor), 1);
  const kpis = [{
    label: "Novos leads (Effecti)",
    value: novosLeads,
    hint: source === "supabase" ? "sincronizado" : "dados locais",
    icon: Inbox,
    tone: "text-accent"
  }, {
    label: "Clientes ativos",
    value: clientesAtivos,
    hint: `de ${clientes.length} cadastros`,
    icon: TrendingUp,
    tone: "text-emerald-600"
  }, {
    label: "Pipeline ponderado",
    value: brl(pipeline),
    hint: "em disputa",
    icon: Target,
    tone: "text-primary"
  }, {
    label: "Faturamento do mes",
    value: brl(totalMes),
    hint: faturamento.at(-1)?.mes ?? "sem dados",
    icon: Wallet,
    tone: "text-accent"
  }];
  return /* @__PURE__ */ jsxs(AppShell, { title: "Dashboard", subtitle: "Resumo executivo das operacoes de licitacao", children: [
    source === "mock" && /* @__PURE__ */ jsx(SyncNotice, { message }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6", children: kpis.map((k) => {
      const Icon = k.icon;
      return /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-xl p-5 hover:shadow-sm transition-shadow", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: k.label }),
          /* @__PURE__ */ jsx(Icon, { className: `size-4 ${k.tone}` })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-2xl font-semibold text-foreground tracking-tight", children: k.value }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: k.hint })
      ] }, k.label);
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 bg-card border border-border rounded-xl p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold", children: "Faturamento mensal" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Contratos finalizados" })
          ] }),
          /* @__PURE__ */ jsxs(Link, { to: "/faturamento", className: "text-xs text-primary hover:underline inline-flex items-center gap-1", children: [
            "Ver detalhes ",
            /* @__PURE__ */ jsx(ArrowUpRight, { className: "size-3" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-end gap-3 h-48", children: faturamento.map((f) => /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-full bg-muted rounded-t-md relative overflow-hidden", style: {
            height: "160px"
          }, children: /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-accent rounded-t-md transition-all", style: {
            height: `${f.valor / maxFat * 100}%`
          } }) }),
          /* @__PURE__ */ jsx("span", { className: "text-[11px] font-medium text-muted-foreground", children: f.mes })
        ] }, f.mes)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-xl p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold", children: "Leads recentes" }),
          /* @__PURE__ */ jsx(Link, { to: "/leads", className: "text-xs text-primary hover:underline", children: "Todos" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: leads.slice(0, 5).map((l) => /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3 pb-3 border-b border-border last:border-0 last:pb-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium truncate", children: l.numeroEdital }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground truncate", children: l.orgao })
          ] }),
          /* @__PURE__ */ jsx(StatusBadge, { tone: l.status === "Qualificado" ? "success" : l.status === "Descartado" ? "muted" : "info", children: l.status })
        ] }, l.id)) })
      ] })
    ] })
  ] });
}
function SyncNotice({
  message
}) {
  return /* @__PURE__ */ jsx("div", { className: "mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800", children: message ?? "Dados locais em uso. Configure o Supabase para sincronizar." });
}
export {
  Dashboard as component
};
