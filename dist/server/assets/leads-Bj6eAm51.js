import { jsxs, jsx } from "react/jsx-runtime";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { A as AppShell, S as StatusBadge } from "./AppShell-B9by1cew.js";
import { B as Button } from "./button-Dov2R_2g.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B89va5rA.js";
import { a as Route, u as updateLeadStatus, b as syncEffectiLeads } from "./router-DqcL4HDi.js";
import { b as brl, f as formatDate, l as leadStatuses } from "./types-vUQvXkYE.js";
import { Zap, Filter, RefreshCw } from "lucide-react";
import "clsx";
import "tailwind-merge";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-select";
import "@tanstack/react-query";
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
const statusTone = (s) => s === "Qualificado" ? "success" : s === "Descartado" ? "muted" : s === "Analisando" ? "warning" : "info";
function LeadsPage() {
  const router = useRouter();
  const {
    leads,
    source,
    message
  } = Route.useLoaderData();
  async function onStatusChange(id, status) {
    try {
      await updateLeadStatus({
        data: {
          id,
          status
        }
      });
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
  return /* @__PURE__ */ jsxs(AppShell, { title: "Leads", subtitle: "Editais captados automaticamente via integracao com a Effecti", actions: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", children: [
      /* @__PURE__ */ jsx(Filter, { className: "size-4" }),
      " Filtros"
    ] }),
    /* @__PURE__ */ jsxs(Button, { size: "sm", className: "bg-accent hover:bg-accent/90", onClick: onSync, children: [
      /* @__PURE__ */ jsx(RefreshCw, { className: "size-4" }),
      " Sincronizar Effecti"
    ] })
  ] }), children: [
    source === "mock" && /* @__PURE__ */ jsx(SyncNotice, { message }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl p-5 flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "size-10 rounded-lg bg-white/20 grid place-items-center", children: /* @__PURE__ */ jsx(Zap, { className: "size-5" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-sm", children: "Integracao Effecti" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-primary-foreground/80", children: source === "supabase" ? "Dados sincronizados com Supabase" : "Dados locais aguardando configuracao do banco" })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-xs bg-white/15 px-3 py-1.5 rounded-full", children: [
        /* @__PURE__ */ jsx("span", { className: "size-1.5 rounded-full bg-emerald-300 animate-pulse" }),
        " ",
        source === "supabase" ? "Online" : "Local"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-muted/60 text-muted-foreground", children: /* @__PURE__ */ jsxs("tr", { className: "text-left", children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 font-medium", children: "Edital" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 font-medium", children: "Orgao" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 font-medium", children: "Objeto" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 font-medium", children: "Modalidade" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 font-medium text-right", children: "Valor estimado" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 font-medium", children: "Abertura" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 font-medium", children: "UF" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 font-medium", children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: leads.map((l) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-border hover:bg-muted/30 transition-colors", children: [
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: l.numeroEdital }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted-foreground", children: l.orgao }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 max-w-xs truncate text-muted-foreground", title: l.objeto, children: l.objeto }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs", children: l.modalidade }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right font-medium tabular-nums", children: brl(l.valorEstimado) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted-foreground tabular-nums", children: formatDate(l.dataAbertura) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted-foreground", children: l.uf }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 min-w-40", children: /* @__PURE__ */ jsxs(Select, { value: l.status, onValueChange: (value) => onStatusChange(l.id, value), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "h-8 border-0 shadow-none px-0 focus:ring-0", children: /* @__PURE__ */ jsx(SelectValue, { asChild: true, children: /* @__PURE__ */ jsx(StatusBadge, { tone: statusTone(l.status), children: l.status }) }) }),
          /* @__PURE__ */ jsx(SelectContent, { children: leadStatuses.map((status) => /* @__PURE__ */ jsx(SelectItem, { value: status, children: status }, status)) })
        ] }) })
      ] }, l.id)) })
    ] }) }) })
  ] });
}
function SyncNotice({
  message
}) {
  return /* @__PURE__ */ jsx("div", { className: "mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800", children: message });
}
export {
  LeadsPage as component
};
