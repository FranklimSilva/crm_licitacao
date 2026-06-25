import { jsxs, jsx } from "react/jsx-runtime";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { A as AppShell, S as StatusBadge } from "./AppShell-B9by1cew.js";
import { B as Button } from "./button-Dov2R_2g.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter, I as Input } from "./input-c3e6zj2K.js";
import { e as Route, t as toggleCliente, f as saveCliente } from "./router-DqcL4HDi.js";
import { f as formatDate } from "./types-vUQvXkYE.js";
import { Mail, Phone, MapPin, Pencil, Power, Plus } from "lucide-react";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-dialog";
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
const emptyCliente = {
  razaoSocial: "",
  nomeFantasia: "",
  cnpj: "",
  contato: "",
  email: "",
  telefone: "",
  segmento: "",
  cidade: "",
  uf: "SP",
  desde: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
};
function ClientesPage() {
  const router = useRouter();
  const {
    clientes,
    source,
    message
  } = Route.useLoaderData();
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const ativos = clientes.filter((c) => c.ativo).length;
  async function onToggle(cliente) {
    try {
      await toggleCliente({
        data: {
          id: cliente.id,
          ativo: !cliente.ativo
        }
      });
      toast.success(cliente.ativo ? "Cliente desativado" : "Cliente ativado");
      await router.invalidate();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Nao foi possivel atualizar o cliente");
    }
  }
  return /* @__PURE__ */ jsxs(AppShell, { title: "Clientes", subtitle: `${ativos} ativos · ${clientes.length - ativos} desativados`, actions: /* @__PURE__ */ jsxs(Button, { size: "sm", onClick: () => {
    setEditing(null);
    setOpen(true);
  }, children: [
    /* @__PURE__ */ jsx(Plus, { className: "size-4" }),
    " Novo cliente"
  ] }), children: [
    source === "mock" && /* @__PURE__ */ jsx(SyncNotice, { message }),
    /* @__PURE__ */ jsx(ClienteDialog, { open, onOpenChange: setOpen, cliente: editing }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4", children: clientes.map((c) => /* @__PURE__ */ jsxs("article", { className: "bg-card border border-border rounded-xl p-5 flex flex-col gap-4 hover:shadow-md hover:border-primary/30 transition-all", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsx("div", { className: "size-11 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center text-white font-bold text-sm shrink-0", children: c.nomeFantasia.slice(0, 2).toUpperCase() }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm truncate", children: c.nomeFantasia }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground truncate", children: c.razaoSocial })
          ] })
        ] }),
        /* @__PURE__ */ jsx(StatusBadge, { tone: c.ativo ? "success" : "muted", children: c.ativo ? "Ativo" : "Desativado" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsx("p", { className: "font-mono text-[11px]", children: c.cnpj }),
        /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Mail, { className: "size-3" }),
          " ",
          c.email
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Phone, { className: "size-3" }),
          " ",
          c.telefone
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "size-3" }),
          " ",
          c.cidade,
          " / ",
          c.uf
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between pt-3 border-t border-border", children: /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-muted-foreground", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: c.segmento }),
        " · cliente desde ",
        formatDate(c.desde)
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "flex-1", onClick: () => {
          setEditing(c);
          setOpen(true);
        }, children: [
          /* @__PURE__ */ jsx(Pencil, { className: "size-3" }),
          " Editar"
        ] }),
        /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", onClick: () => onToggle(c), className: c.ativo ? "text-destructive hover:text-destructive" : "text-emerald-600 hover:text-emerald-600", children: [
          /* @__PURE__ */ jsx(Power, { className: "size-3" }),
          " ",
          c.ativo ? "Desativar" : "Ativar"
        ] })
      ] })
    ] }, c.id)) })
  ] });
}
function ClienteDialog({
  open,
  onOpenChange,
  cliente
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const data = cliente ?? emptyCliente;
  async function onSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSaving(true);
    try {
      await saveCliente({
        data: {
          id: cliente?.id,
          razaoSocial: String(form.get("razaoSocial") ?? ""),
          nomeFantasia: String(form.get("nomeFantasia") ?? ""),
          cnpj: String(form.get("cnpj") ?? ""),
          contato: String(form.get("contato") ?? ""),
          email: String(form.get("email") ?? ""),
          telefone: String(form.get("telefone") ?? ""),
          segmento: String(form.get("segmento") ?? ""),
          cidade: String(form.get("cidade") ?? ""),
          uf: String(form.get("uf") ?? "").toUpperCase(),
          ativo: true,
          desde: String(form.get("desde") ?? "")
        }
      });
      toast.success(cliente ? "Cliente atualizado" : "Cliente criado");
      onOpenChange(false);
      await router.invalidate();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Nao foi possivel salvar o cliente");
    } finally {
      setSaving(false);
    }
  }
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-2xl", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: cliente ? "Editar cliente" : "Novo cliente" }) }),
    /* @__PURE__ */ jsxs("form", { onSubmit, className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsx(Field, { name: "nomeFantasia", label: "Nome fantasia", defaultValue: data.nomeFantasia }),
      /* @__PURE__ */ jsx(Field, { name: "razaoSocial", label: "Razao social", defaultValue: data.razaoSocial }),
      /* @__PURE__ */ jsx(Field, { name: "cnpj", label: "CNPJ", defaultValue: data.cnpj }),
      /* @__PURE__ */ jsx(Field, { name: "segmento", label: "Segmento", defaultValue: data.segmento }),
      /* @__PURE__ */ jsx(Field, { name: "contato", label: "Contato", defaultValue: data.contato }),
      /* @__PURE__ */ jsx(Field, { name: "email", label: "Email", defaultValue: data.email, type: "email" }),
      /* @__PURE__ */ jsx(Field, { name: "telefone", label: "Telefone", defaultValue: data.telefone }),
      /* @__PURE__ */ jsx(Field, { name: "cidade", label: "Cidade", defaultValue: data.cidade }),
      /* @__PURE__ */ jsx(Field, { name: "uf", label: "UF", defaultValue: data.uf, maxLength: 2 }),
      /* @__PURE__ */ jsx(Field, { name: "desde", label: "Cliente desde", defaultValue: data.desde, type: "date" }),
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
  ClientesPage as component
};
