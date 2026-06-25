const leadStatuses = ["Novo", "Analisando", "Qualificado", "Descartado"];
const oportunidadeEtapas = [
  "Estudo do edital",
  "Documentacao",
  "Proposta enviada",
  "Disputa",
  "Habilitacao",
  "Homologada",
  "Perdida"
];
const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const formatDate = (iso) => (/* @__PURE__ */ new Date(`${iso}T00:00:00`)).toLocaleDateString("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric"
});
export {
  brl as b,
  formatDate as f,
  leadStatuses as l,
  oportunidadeEtapas as o
};
