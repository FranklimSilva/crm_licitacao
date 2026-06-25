import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { AppShell, StatusBadge } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getAppData, saveCliente, toggleCliente } from "@/lib/data";
import { formatDate, type Cliente } from "@/lib/types";
import { Plus, Mail, Phone, MapPin, Pencil, Power } from "lucide-react";

export const Route = createFileRoute("/clientes")({
  head: () => ({
    meta: [
      { title: "Clientes - LicitaCRM" },
      { name: "description", content: "Cadastro, edicao e desativacao de clientes da consultoria." },
    ],
  }),
  loader: () => getAppData(),
  component: ClientesPage,
});

const emptyCliente: Omit<Cliente, "id"> = {
  razaoSocial: "",
  nomeFantasia: "",
  cnpj: "",
  contato: "",
  email: "",
  telefone: "",
  segmento: "",
  cidade: "",
  uf: "SP",
  ativo: true,
  desde: new Date().toISOString().slice(0, 10),
};

function ClientesPage() {
  const router = useRouter();
  const { clientes, source, message } = Route.useLoaderData();
  const [editing, setEditing] = useState<Cliente | null>(null);
  const [open, setOpen] = useState(false);
  const ativos = clientes.filter((c) => c.ativo).length;

  async function onToggle(cliente: Cliente) {
    try {
      await toggleCliente({ data: { id: cliente.id, ativo: !cliente.ativo } });
      toast.success(cliente.ativo ? "Cliente desativado" : "Cliente ativado");
      await router.invalidate();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Nao foi possivel atualizar o cliente");
    }
  }

  return (
    <AppShell
      title="Clientes"
      subtitle={`${ativos} ativos · ${clientes.length - ativos} desativados`}
      actions={<Button size="sm" onClick={() => { setEditing(null); setOpen(true); }}><Plus className="size-4" /> Novo cliente</Button>}
    >
      {source === "mock" && <SyncNotice message={message} />}
      <ClienteDialog open={open} onOpenChange={setOpen} cliente={editing} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {clientes.map((c) => (
          <article key={c.id} className="bg-card border border-border rounded-xl p-5 flex flex-col gap-4 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-11 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center text-white font-bold text-sm shrink-0">
                  {c.nomeFantasia.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm truncate">{c.nomeFantasia}</h3>
                  <p className="text-xs text-muted-foreground truncate">{c.razaoSocial}</p>
                </div>
              </div>
              <StatusBadge tone={c.ativo ? "success" : "muted"}>{c.ativo ? "Ativo" : "Desativado"}</StatusBadge>
            </div>

            <div className="space-y-1.5 text-xs text-muted-foreground">
              <p className="font-mono text-[11px]">{c.cnpj}</p>
              <p className="flex items-center gap-2"><Mail className="size-3" /> {c.email}</p>
              <p className="flex items-center gap-2"><Phone className="size-3" /> {c.telefone}</p>
              <p className="flex items-center gap-2"><MapPin className="size-3" /> {c.cidade} / {c.uf}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="text-[11px] text-muted-foreground">
                <span className="font-medium text-foreground">{c.segmento}</span> · cliente desde {formatDate(c.desde)}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => { setEditing(c); setOpen(true); }}>
                <Pencil className="size-3" /> Editar
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onToggle(c)} className={c.ativo ? "text-destructive hover:text-destructive" : "text-emerald-600 hover:text-emerald-600"}>
                <Power className="size-3" /> {c.ativo ? "Desativar" : "Ativar"}
              </Button>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}

function ClienteDialog({ open, onOpenChange, cliente }: { open: boolean; onOpenChange: (open: boolean) => void; cliente: Cliente | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const data = cliente ?? emptyCliente;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
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
          desde: String(form.get("desde") ?? ""),
        },
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{cliente ? "Editar cliente" : "Novo cliente"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field name="nomeFantasia" label="Nome fantasia" defaultValue={data.nomeFantasia} />
          <Field name="razaoSocial" label="Razao social" defaultValue={data.razaoSocial} />
          <Field name="cnpj" label="CNPJ" defaultValue={data.cnpj} />
          <Field name="segmento" label="Segmento" defaultValue={data.segmento} />
          <Field name="contato" label="Contato" defaultValue={data.contato} />
          <Field name="email" label="Email" defaultValue={data.email} type="email" />
          <Field name="telefone" label="Telefone" defaultValue={data.telefone} />
          <Field name="cidade" label="Cidade" defaultValue={data.cidade} />
          <Field name="uf" label="UF" defaultValue={data.uf} maxLength={2} />
          <Field name="desde" label="Cliente desde" defaultValue={data.desde} type="date" />
          <DialogFooter className="sm:col-span-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" disabled={saving}>{saving ? "Salvando..." : "Salvar"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, ...props }: React.ComponentProps<typeof Input> & { label: string; name: string }) {
  return (
    <label className="grid gap-1.5 text-xs font-medium text-muted-foreground">
      {label}
      <Input required {...props} />
    </label>
  );
}

function SyncNotice({ message }: { message?: string }) {
  return <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{message}</div>;
}
