import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { Toaster as Toaster$1 } from "sonner";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, c as createServerFn } from "./server-B-jqAdHj.js";
import { z } from "zod";
import { l as leadStatuses, o as oportunidadeEtapas } from "./types-vUQvXkYE.js";
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const appCss = "/assets/styles-kfKaB9jV.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  useEffect(() => {
  }, [error]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$5 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "LicitaCRM â€” Consultoria & LicitaÃ§Ãµes" },
      { name: "description", content: "CRM para consultoria em licitaÃ§Ãµes: leads via Effecti, clientes, oportunidades e faturamento." },
      { name: "author", content: "LicitaCRM" },
      { property: "og:title", content: "LicitaCRM" },
      { property: "og:description", content: "CRM para consultoria em licitaÃ§Ãµes pÃºblicas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$5.useRouteContext();
  return /* @__PURE__ */ jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Toaster, { richColors: true, position: "top-right" })
  ] });
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const clienteSchema = z.object({
  id: z.string().optional(),
  razaoSocial: z.string().min(1),
  nomeFantasia: z.string().min(1),
  cnpj: z.string().min(1),
  contato: z.string().min(1),
  email: z.string().email(),
  telefone: z.string().min(1),
  segmento: z.string().min(1),
  cidade: z.string().min(1),
  uf: z.string().min(2).max(2),
  ativo: z.boolean().default(true),
  desde: z.string().min(1)
});
const oportunidadeSchema = z.object({
  id: z.string().optional(),
  cliente: z.string().min(1),
  edital: z.string().min(1),
  orgao: z.string().min(1),
  etapa: z.enum(oportunidadeEtapas),
  valor: z.coerce.number().nonnegative(),
  probabilidade: z.coerce.number().min(0).max(100),
  abertura: z.string().min(1),
  responsavel: z.string().min(1)
});
const leadStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(leadStatuses)
});
const faturamentoSchema = z.object({
  mes: z.string().min(1),
  contratos: z.coerce.number().int().nonnegative(),
  valor: z.coerce.number().nonnegative()
});
const getAppData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("3417601833420adce378d3113cec62688369d7f19c6e61fc3399237260287f8f"));
const saveCliente = createServerFn({
  method: "POST"
}).validator(clienteSchema).handler(createSsrRpc("ccb8204591abff2bd843af2b03f108bc78d2dedf67e77e0fd1675e180a6fa5ed"));
const toggleCliente = createServerFn({
  method: "POST"
}).validator(z.object({
  id: z.string().min(1),
  ativo: z.boolean()
})).handler(createSsrRpc("c286c2deb62bac8b2573e1d79e3a509e66157145667623c28d2631b99d97c6d8"));
const saveOportunidade = createServerFn({
  method: "POST"
}).validator(oportunidadeSchema).handler(createSsrRpc("cf23e571fe73a057da38650d1f6272993f2bd14922e7858ecbbdbdbeaebe48aa"));
const updateLeadStatus = createServerFn({
  method: "POST"
}).validator(leadStatusSchema).handler(createSsrRpc("ccd2eedc89b1972217e0f7f607b7b138c0a1914cae1a7441a8334a62a2b85140"));
const syncEffectiLeads = createServerFn({
  method: "POST"
}).handler(createSsrRpc("c92e5896849cf7520040c95d7edf3d067381c3029421000a0c95dbb952dcf1c6"));
const saveFaturamento = createServerFn({
  method: "POST"
}).validator(faturamentoSchema).handler(createSsrRpc("eeef9536cd71ec58c22dcf633dceb5a3c67bbf994fd670d4eef422ad8ae28647"));
const $$splitComponentImporter$4 = () => import("./oportunidades-DY04abKr.js");
const Route$4 = createFileRoute("/oportunidades")({
  head: () => ({
    meta: [{
      title: "Oportunidades - LicitaCRM"
    }, {
      name: "description",
      content: "Pipeline completo de licitacoes, do estudo do edital a homologacao."
    }]
  }),
  loader: () => getAppData(),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./leads-Bj6eAm51.js");
const Route$3 = createFileRoute("/leads")({
  head: () => ({
    meta: [{
      title: "Leads - LicitaCRM"
    }, {
      name: "description",
      content: "Editais captados automaticamente via API Effecti."
    }]
  }),
  loader: () => getAppData(),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./faturamento-BuKVI-fi.js");
const Route$2 = createFileRoute("/faturamento")({
  head: () => ({
    meta: [{
      title: "Faturamento - LicitaCRM"
    }, {
      name: "description",
      content: "Valor dos contratos finalizados por mes."
    }]
  }),
  loader: () => getAppData(),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./clientes-BF-T3Kg-.js");
const Route$1 = createFileRoute("/clientes")({
  head: () => ({
    meta: [{
      title: "Clientes - LicitaCRM"
    }, {
      name: "description",
      content: "Cadastro, edicao e desativacao de clientes da consultoria."
    }]
  }),
  loader: () => getAppData(),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-CmgqzpnA.js");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Dashboard - LicitaCRM"
    }, {
      name: "description",
      content: "Visao geral de leads, clientes, oportunidades e faturamento de licitacoes."
    }]
  }),
  loader: () => getAppData(),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const OportunidadesRoute = Route$4.update({
  id: "/oportunidades",
  path: "/oportunidades",
  getParentRoute: () => Route$5
});
const LeadsRoute = Route$3.update({
  id: "/leads",
  path: "/leads",
  getParentRoute: () => Route$5
});
const FaturamentoRoute = Route$2.update({
  id: "/faturamento",
  path: "/faturamento",
  getParentRoute: () => Route$5
});
const ClientesRoute = Route$1.update({
  id: "/clientes",
  path: "/clientes",
  getParentRoute: () => Route$5
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$5
});
const rootRouteChildren = {
  IndexRoute,
  ClientesRoute,
  FaturamentoRoute,
  LeadsRoute,
  OportunidadesRoute
};
const routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$4 as R,
  Route$3 as a,
  syncEffectiLeads as b,
  Route$2 as c,
  saveFaturamento as d,
  Route$1 as e,
  saveCliente as f,
  Route as g,
  router as r,
  saveOportunidade as s,
  toggleCliente as t,
  updateLeadStatus as u
};
