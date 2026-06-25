import { jsxs, jsx } from "react/jsx-runtime";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { A as AppShell } from "./AppShell-B9by1cew.js";
import { b as brl } from "./types-vUQvXkYE.js";
import { c as Route, d as saveFaturamento } from "./router-DqcL4HDi.js";
import { TrendingUp, Pencil, FileText, Download } from "lucide-react";
import { B as Button } from "./button-Dov2R_2g.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter, I as Input } from "./input-c3e6zj2K.js";
import "clsx";
import "tailwind-merge";
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
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-dialog";
function FaturamentoPage() {
  const {
    faturamento,
    oportunidades,
    source,
    message
  } = Route.useLoaderData();
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const total = faturamento.reduce((s, f) => s + f.valor, 0);
  const totalContratos = faturamento.reduce((s, f) => s + f.contratos, 0);
  const ticket = totalContratos > 0 ? total / totalContratos : 0;
  const max = Math.max(...faturamento.map((f) => f.valor), 1);
  const ultimo = faturamento.at(-1)?.valor ?? 0;
  const penult = faturamento.at(-2)?.valor ?? (ultimo || 1);
  const variacao = (ultimo - penult) / penult * 100;
  const homologadas = oportunidades.filter((o) => o.etapa === "Homologada");
  function exportCsv() {
    const rows = [["Mes", "Contratos", "Valor"], ...faturamento.map((f) => [f.mes, String(f.contratos), String(f.valor)])];
    const csv = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "faturamento.csv";
    link.click();
    URL.revokeObjectURL(url);
  }
  return /* @__PURE__ */ jsxs(AppShell, { title: "Faturamento", subtitle: "Contratos finalizados", actions: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: exportCsv, children: [
    /* @__PURE__ */ jsx(Download, { className: "size-4" }),
    " Exportar"
  ] }), children: [
    source === "mock" && /* @__PURE__ */ jsx(SyncNotice, { message }),
    /* @__PURE__ */ jsx(FaturamentoDialog, { open, onOpenChange: setOpen, item: editing }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: "Total acumulado" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-2xl font-semibold tabular-nums", children: brl(total) }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs text-emerald-600 inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(TrendingUp, { className: "size-3" }),
          " ",
          variacao.toFixed(1),
          "% vs. mes anterior"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: "Contratos finalizados" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-2xl font-semibold tabular-nums", children: totalContratos }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "no periodo" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: "Ticket medio" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-2xl font-semibold tabular-nums", children: brl(ticket) }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "por contrato" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-xl p-6 mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold mb-1", children: "Evolucao mensal" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mb-6", children: "Valor dos contratos finalizados por mes" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: faturamento.map((f) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "w-10 text-sm font-medium text-muted-foreground", children: f.mes }),
        /* @__PURE__ */ jsx("button", { className: "flex-1 h-8 bg-muted rounded-md overflow-hidden relative text-left", onClick: () => {
          setEditing(f);
          setOpen(true);
        }, children: /* @__PURE__ */ jsx("div", { className: "h-full bg-gradient-to-r from-primary to-accent rounded-md flex items-center justify-end pr-3 transition-all", style: {
          width: `${f.valor / max * 100}%`
        }, children: /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-white tabular-nums", children: brl(f.valor) }) }) }),
        /* @__PURE__ */ jsxs("span", { className: "w-24 text-right text-xs text-muted-foreground tabular-nums", children: [
          f.contratos,
          " contratos"
        ] }),
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: () => {
          setEditing(f);
          setOpen(true);
        }, children: /* @__PURE__ */ jsx(Pencil, { className: "size-3" }) })
      ] }, f.mes)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-border flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(FileText, { className: "size-4 text-muted-foreground" }),
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold", children: "Contratos homologados recentes" })
      ] }),
      /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-muted/60 text-muted-foreground text-left", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 font-medium", children: "Edital" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 font-medium", children: "Cliente" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 font-medium", children: "Orgao" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 font-medium text-right", children: "Valor" })
        ] }) }),
        /* @__PURE__ */ jsxs("tbody", { children: [
          homologadas.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 4, className: "px-6 py-8 text-center text-muted-foreground text-xs", children: "Nenhum contrato homologado registrado." }) }),
          homologadas.map((o) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-border", children: [
            /* @__PURE__ */ jsx("td", { className: "px-6 py-3 font-medium", children: o.edital }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-3 text-muted-foreground", children: o.cliente }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-3 text-muted-foreground", children: o.orgao }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-3 text-right font-semibold tabular-nums", children: brl(o.valor) })
          ] }, o.id))
        ] })
      ] })
    ] })
  ] });
}
function FaturamentoDialog({
  open,
  onOpenChange,
  item
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const data = item ?? {
    mes: "",
    contratos: 0,
    valor: 0
  };
  async function onSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSaving(true);
    try {
      await saveFaturamento({
        data: {
          mes: String(form.get("mes") ?? ""),
          contratos: Number(form.get("contratos") ?? 0),
          valor: Number(form.get("valor") ?? 0)
        }
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
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Editar faturamento" }) }),
    /* @__PURE__ */ jsxs("form", { onSubmit, className: "grid gap-3", children: [
      /* @__PURE__ */ jsx(Field, { name: "mes", label: "Mes", defaultValue: data.mes }),
      /* @__PURE__ */ jsx(Field, { name: "contratos", label: "Contratos", defaultValue: data.contratos, type: "number", min: 0 }),
      /* @__PURE__ */ jsx(Field, { name: "valor", label: "Valor", defaultValue: data.valor, type: "number", min: 0, step: 1e3 }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), children: "Cancelar" }),
        /* @__PURE__ */ jsx(Button, { type: "submit", disabled: saving, children: saving ? "Salvando..." : "Salvar" })
      ] })
    ] })
  ] }) });
}
function Field({
  label,
  ...props
}) {
  return /* @__PURE__ */ jsxs("label", { className: "grid gap-1.5 text-xs font-medium text-muted-foreground", children: [
    label,
    /* @__PURE__ */ jsx(Input, { required: true, ...props })
  ] });
}
function SyncNotice({
  message
}) {
  return /* @__PURE__ */ jsx("div", { className: "mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800", children: message });
}
export {
  FaturamentoPage as component
};
