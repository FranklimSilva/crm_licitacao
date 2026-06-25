import { jsxs, jsx } from "react/jsx-runtime";
import { useRouterState, Link } from "@tanstack/react-router";
import { Building2, LayoutDashboard, Inbox, Users, Target, BarChart3, Search, Bell } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, badge: void 0 },
  { to: "/leads", label: "Leads", icon: Inbox, badge: "8" },
  { to: "/clientes", label: "Clientes", icon: Users, badge: void 0 },
  { to: "/oportunidades", label: "Oportunidades", icon: Target, badge: "7" },
  { to: "/faturamento", label: "Faturamento", icon: BarChart3, badge: void 0 }
];
function AppShell({ title, subtitle, actions, children }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex bg-background", children: [
    /* @__PURE__ */ jsxs("aside", { className: "hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground", children: [
      /* @__PURE__ */ jsxs("div", { className: "px-6 py-6 flex items-center gap-3 border-b border-sidebar-border", children: [
        /* @__PURE__ */ jsx("div", { className: "size-10 rounded-lg bg-sidebar-primary grid place-items-center shadow-lg shadow-sidebar-primary/30", children: /* @__PURE__ */ jsx(Building2, { className: "size-5 text-sidebar-primary-foreground" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold tracking-tight", children: "LicitaCRM" }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] text-sidebar-foreground/60", children: "Consultoria & Licitações" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "flex-1 px-3 py-4 space-y-1", children: nav.map((item) => {
        const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
        const Icon = item.icon;
        return /* @__PURE__ */ jsxs(
          Link,
          {
            to: item.to,
            className: cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
              active ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-sm" : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            ),
            children: [
              /* @__PURE__ */ jsx(Icon, { className: "size-4" }),
              /* @__PURE__ */ jsx("span", { className: "flex-1", children: item.label }),
              item.badge && /* @__PURE__ */ jsx("span", { className: cn(
                "text-[10px] px-1.5 py-0.5 rounded-full font-semibold",
                active ? "bg-white/20" : "bg-sidebar-accent text-sidebar-accent-foreground"
              ), children: item.badge })
            ]
          },
          item.to
        );
      }) }),
      /* @__PURE__ */ jsx("div", { className: "p-4 border-t border-sidebar-border", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "size-9 rounded-full bg-gradient-to-br from-accent to-sidebar-primary grid place-items-center text-xs font-bold text-white", children: "CL" }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium truncate", children: "Carlos Lima" }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] text-sidebar-foreground/60 truncate", children: "Consultor Sênior" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "flex-1 flex flex-col min-w-0", children: [
      /* @__PURE__ */ jsxs("header", { className: "h-16 px-6 border-b border-border bg-card flex items-center gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 max-w-md relative", children: [
          /* @__PURE__ */ jsx(Search, { className: "size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              placeholder: "Buscar editais, clientes, oportunidades...",
              className: "w-full h-9 pl-9 pr-3 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "size-9 rounded-md hover:bg-muted grid place-items-center relative", children: [
          /* @__PURE__ */ jsx(Bell, { className: "size-4 text-muted-foreground" }),
          /* @__PURE__ */ jsx("span", { className: "absolute top-1.5 right-1.5 size-2 rounded-full bg-destructive" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 lg:p-8 flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4 mb-6 flex-wrap", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold text-foreground tracking-tight", children: title }),
            subtitle && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: subtitle })
          ] }),
          actions
        ] }),
        children
      ] })
    ] })
  ] });
}
function StatusBadge({ children, tone = "default" }) {
  const tones = {
    default: "bg-primary/10 text-primary",
    success: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    warning: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    info: "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
    destructive: "bg-red-50 text-red-700 ring-1 ring-red-200",
    muted: "bg-muted text-muted-foreground"
  };
  return /* @__PURE__ */ jsx("span", { className: cn("inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium", tones[tone]), children });
}
export {
  AppShell as A,
  StatusBadge as S,
  cn as c
};
