import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Inbox, Users, Target, BarChart3, Search, Bell, Building2 } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, badge: undefined as string | undefined },
  { to: "/leads", label: "Leads", icon: Inbox, badge: "8" as string | undefined },
  { to: "/clientes", label: "Clientes", icon: Users, badge: undefined as string | undefined },
  { to: "/oportunidades", label: "Oportunidades", icon: Target, badge: "7" as string | undefined },
  { to: "/faturamento", label: "Faturamento", icon: BarChart3, badge: undefined as string | undefined },
] as const;

export function AppShell({ title, subtitle, actions, children }: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground">
        <div className="px-6 py-6 flex items-center gap-3 border-b border-sidebar-border">
          <div className="size-10 rounded-lg bg-sidebar-primary grid place-items-center shadow-lg shadow-sidebar-primary/30">
            <Building2 className="size-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight">LicitaCRM</p>
            <p className="text-[11px] text-sidebar-foreground/60">Consultoria & Licitações</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-sm"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className="size-4" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full font-semibold",
                    active ? "bg-white/20" : "bg-sidebar-accent text-sidebar-accent-foreground"
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-gradient-to-br from-accent to-sidebar-primary grid place-items-center text-xs font-bold text-white">
              CL
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">Carlos Lima</p>
              <p className="text-[11px] text-sidebar-foreground/60 truncate">Consultor Sênior</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 px-6 border-b border-border bg-card flex items-center gap-4">
          <div className="flex-1 max-w-md relative">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Buscar editais, clientes, oportunidades..."
              className="w-full h-9 pl-9 pr-3 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <button className="size-9 rounded-md hover:bg-muted grid place-items-center relative">
            <Bell className="size-4 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-destructive" />
          </button>
        </header>

        <div className="p-6 lg:p-8 flex-1">
          <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
            <div>
              <h1 className="text-2xl font-semibold text-foreground tracking-tight">{title}</h1>
              {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
            </div>
            {actions}
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}

export function StatusBadge({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "success" | "warning" | "info" | "destructive" | "muted" }) {
  const tones = {
    default: "bg-primary/10 text-primary",
    success: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    warning: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    info: "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
    destructive: "bg-red-50 text-red-700 ring-1 ring-red-200",
    muted: "bg-muted text-muted-foreground",
  } as const;
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium", tones[tone])}>
      {children}
    </span>
  );
}
