export const leadStatuses = ["Novo", "Analisando", "Qualificado", "Descartado"] as const;
export const leadModalidades = ["Pregao Eletronico", "Concorrencia", "Tomada de Precos", "Dispensa"] as const;
export const oportunidadeEtapas = [
  "Estudo do edital",
  "Documentacao",
  "Proposta enviada",
  "Disputa",
  "Habilitacao",
  "Homologada",
  "Perdida",
] as const;

export type LeadStatus = (typeof leadStatuses)[number];
export type LeadModalidade = (typeof leadModalidades)[number];
export type OportunidadeEtapa = (typeof oportunidadeEtapas)[number];

export type Lead = {
  id: string;
  numeroEdital: string;
  orgao: string;
  objeto: string;
  modalidade: LeadModalidade;
  valorEstimado: number;
  dataAbertura: string;
  uf: string;
  status: LeadStatus;
  fonte: "Effecti";
};

export type Cliente = {
  id: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  contato: string;
  email: string;
  telefone: string;
  segmento: string;
  cidade: string;
  uf: string;
  ativo: boolean;
  desde: string;
};

export type Oportunidade = {
  id: string;
  cliente: string;
  edital: string;
  orgao: string;
  etapa: OportunidadeEtapa;
  valor: number;
  probabilidade: number;
  abertura: string;
  responsavel: string;
};

export type Faturamento = {
  mes: string;
  contratos: number;
  valor: number;
};

export type DataSource = "supabase" | "mock";

export type AppData = {
  leads: Lead[];
  clientes: Cliente[];
  oportunidades: Oportunidade[];
  faturamento: Faturamento[];
  source: DataSource;
  message?: string;
};

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
