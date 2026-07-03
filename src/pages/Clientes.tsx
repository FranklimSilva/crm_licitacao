import { AppShell, StatusBadge } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { clientes, formatDate } from "@/lib/mock-data";
import { Plus, Mail, Phone, MapPin, Pencil, Power } from "lucide-react";

export default function Clientes() {
  const ativos = clientes.filter((c) => c.ativo).length;

  return (
    <AppShell
      title="Clientes"
      subtitle={`${ativos} ativos · ${clientes.length - ativos} desativados`}
      actions={<Button size="sm"><Plus className="size-4" /> Novo cliente</Button>}
    >
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
              <StatusBadge tone={c.ativo ? "success" : "muted"}>
                {c.ativo ? "Ativo" : "Desativado"}
              </StatusBadge>
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
              <Button variant="outline" size="sm" className="flex-1"><Pencil className="size-3" /> Editar</Button>
              <Button variant="ghost" size="sm" className={c.ativo ? "text-destructive hover:text-destructive" : "text-emerald-600 hover:text-emerald-600"}>
                <Power className="size-3" /> {c.ativo ? "Desativar" : "Ativar"}
              </Button>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
