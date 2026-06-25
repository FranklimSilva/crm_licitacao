import { jsxs, jsx } from "react/jsx-runtime";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { A as AppShell } from "./AppShell-B9by1cew.js";
import { B as Button } from "./button-Dov2R_2g.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter, I as Input } from "./input-c3e6zj2K.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B89va5rA.js";
import { R as Route, s as saveOportunidade } from "./router-DqcL4HDi.js";
import { o as oportunidadeEtapas, b as brl, f as formatDate } from "./types-vUQvXkYE.js";
import { Plus } from "lucide-react";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-dialog";
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
const etapaColor = {
  "Estudo do edital": "border-t-slate-400",
  Documentacao: "border-t-sky-400",
  "Proposta enviada": "border-t-indigo-400",
  Disputa: "border-t-amber-400",
  Habilitacao: "border-t-violet-500",
  Homologada: "border-t-emerald-500",
  Perdida: "border-t-rose-400"
};
const emptyOportunidade = {
  cliente: "",
  edital: "",
  orgao: "",
  valor: 0,
  probabilidade: 40,
  abertura: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
  responsavel: ""
};
function OportunidadesPage() {
  const {
    oportunidades,
    source,
    message
  } = Route.useLoaderData();
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const total = oportunidades.reduce((s, o) => s + o.valor, 0);
  const ativas = oportunidades.filter((o) => o.etapa !== "Homologada" && o.etapa !== "Perdida");
  return /* @__PURE__ */ jsxs(AppShell, { title: "Oportunidades", subtitle: `${ativas.length} em andamento · pipeline total ${brl(total)}`, actions: /* @__PURE__ */ jsxs(Button, { size: "sm", onClick: () => {
    setEditing(null);
    setOpen(true);
  }, children: [
    /* @__PURE__ */ jsx(Plus, { className: "size-4" }),
    " Nova oportunidade"
  ] }), children: [
    source === "mock" && /* @__PURE__ */ jsx(SyncNotice, { message }),
    /* @__PURE__ */ jsx(OportunidadeDialog, { open, onOpenChange: setOpen, oportunidade: editing }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto pb-2", children: /* @__PURE__ */ jsx("div", { className: "flex gap-4 min-w-max", children: oportunidadeEtapas.map((etapa) => {
      const itens = oportunidades.filter((o) => o.etapa === etapa);
      const valorEtapa = itens.reduce((s, o) => s + o.valor, 0);
      return /* @__PURE__ */ jsxs("div", { className: "w-72 shrink-0", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-3 px-1", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold", children: etapa }),
          /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-muted-foreground tabular-nums", children: [
            itens.length,
            " · ",
            brl(valorEtapa)
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          itens.length === 0 && /* @__PURE__ */ jsx("div", { className: "border border-dashed border-border rounded-lg p-6 text-center text-xs text-muted-foreground", children: "Sem itens" }),
          itens.map((o) => /* @__PURE__ */ jsxs("article", { onClick: () => {
            setEditing(o);
            setOpen(true);
          }, className: `bg-card border border-border border-t-4 ${etapaColor[o.etapa]} rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer`, children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-mono text-muted-foreground", children: o.id }),
              /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-semibold text-primary", children: [
                o.probabilidade,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold leading-tight mb-1", children: o.edital }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mb-3 truncate", children: o.orgao }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs", children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-foreground tabular-nums", children: brl(o.valor) }),
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: formatDate(o.abertura) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 pt-3 border-t border-border flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "size-6 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-[9px] font-bold text-white", children: o.responsavel.split(" ").map((n) => n[0]).slice(0, 2).join("") }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[11px] font-medium truncate", children: o.cliente }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-muted-foreground truncate", children: o.responsavel })
              ] })
            ] })
          ] }, o.id))
        ] })
      ] }, etapa);
    }) }) })
  ] });
}
function OportunidadeDialog({
  open,
  onOpenChange,
  oportunidade
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [etapa, setEtapa] = useState(oportunidade?.etapa ?? "Estudo do edital");
  const data = oportunidade ?? emptyOportunidade;
  async function onSubmit(event) {
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
          responsavel: String(form.get("responsavel") ?? "")
        }
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
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-2xl", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: oportunidade ? "Editar oportunidade" : "Nova oportunidade" }) }),
    /* @__PURE__ */ jsxs("form", { onSubmit, className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsx(Field, { name: "cliente", label: "Cliente", defaultValue: data.cliente }),
      /* @__PURE__ */ jsx(Field, { name: "edital", label: "Edital", defaultValue: data.edital }),
      /* @__PURE__ */ jsx(Field, { name: "orgao", label: "Orgao", defaultValue: data.orgao }),
      /* @__PURE__ */ jsxs("label", { className: "grid gap-1.5 text-xs font-medium text-muted-foreground", children: [
        "Etapa",
        /* @__PURE__ */ jsxs(Select, { value: etapa, onValueChange: (value) => setEtapa(value), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsx(SelectContent, { children: oportunidadeEtapas.map((item) => /* @__PURE__ */ jsx(SelectItem, { value: item, children: item }, item)) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Field, { name: "valor", label: "Valor", defaultValue: data.valor, type: "number", min: 0, step: 1e3 }),
      /* @__PURE__ */ jsx(Field, { name: "probabilidade", label: "Probabilidade", defaultValue: data.probabilidade, type: "number", min: 0, max: 100 }),
      /* @__PURE__ */ jsx(Field, { name: "abertura", label: "Abertura", defaultValue: data.abertura, type: "date" }),
      /* @__PURE__ */ jsx(Field, { name: "responsavel", label: "Responsavel", defaultValue: data.responsavel }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "sm:col-span-2 pt-2", children: [
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
  OportunidadesPage as component
};
