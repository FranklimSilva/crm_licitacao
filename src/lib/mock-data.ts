import type { Cliente, Faturamento, Lead, Oportunidade } from "./types";
export type { Cliente, Faturamento, Lead, Oportunidade } from "./types";
export { brl, formatDate } from "./types";

export const leads: Lead[] = [
  { id: "L-2841", numeroEdital: "PE 045/2026", orgao: "Prefeitura de Campinas", objeto: "Aquisicao de equipamentos de TI para escolas municipais", modalidade: "Pregao Eletronico", valorEstimado: 1840000, dataAbertura: "2026-06-28", uf: "SP", status: "Novo", fonte: "Effecti" },
  { id: "L-2840", numeroEdital: "PE 112/2026", orgao: "Governo do Estado da Bahia", objeto: "Servicos de consultoria em gestao publica", modalidade: "Pregao Eletronico", valorEstimado: 920000, dataAbertura: "2026-06-25", uf: "BA", status: "Analisando", fonte: "Effecti" },
  { id: "L-2839", numeroEdital: "CC 008/2026", orgao: "DNIT", objeto: "Obras de recuperacao rodoviaria BR-101", modalidade: "Concorrencia", valorEstimado: 12400000, dataAbertura: "2026-07-12", uf: "RJ", status: "Qualificado", fonte: "Effecti" },
  { id: "L-2838", numeroEdital: "PE 077/2026", orgao: "Tribunal de Justica de MG", objeto: "Licenciamento de software juridico", modalidade: "Pregao Eletronico", valorEstimado: 480000, dataAbertura: "2026-06-22", uf: "MG", status: "Qualificado", fonte: "Effecti" },
  { id: "L-2837", numeroEdital: "TP 014/2026", orgao: "UFMA", objeto: "Reforma de laboratorios de pesquisa", modalidade: "Tomada de Precos", valorEstimado: 320000, dataAbertura: "2026-06-30", uf: "MA", status: "Analisando", fonte: "Effecti" },
  { id: "L-2836", numeroEdital: "DL 220/2026", orgao: "Ministerio da Saude", objeto: "Aquisicao emergencial de insumos hospitalares", modalidade: "Dispensa", valorEstimado: 215000, dataAbertura: "2026-06-19", uf: "DF", status: "Descartado", fonte: "Effecti" },
  { id: "L-2835", numeroEdital: "PE 203/2026", orgao: "Prefeitura de Curitiba", objeto: "Sistema integrado de transporte publico", modalidade: "Pregao Eletronico", valorEstimado: 3650000, dataAbertura: "2026-07-05", uf: "PR", status: "Novo", fonte: "Effecti" },
  { id: "L-2834", numeroEdital: "PE 091/2026", orgao: "SESI Nacional", objeto: "Capacitacao corporativa em compliance", modalidade: "Pregao Eletronico", valorEstimado: 740000, dataAbertura: "2026-07-02", uf: "DF", status: "Qualificado", fonte: "Effecti" },
];

export const clientes: Cliente[] = [
  { id: "C-001", razaoSocial: "Construtora Horizonte Ltda", nomeFantasia: "Horizonte", cnpj: "12.345.678/0001-90", contato: "Marina Souza", email: "marina@horizonte.com.br", telefone: "(11) 98765-4321", segmento: "Construcao Civil", cidade: "Sao Paulo", uf: "SP", ativo: true, desde: "2022-03-14" },
  { id: "C-002", razaoSocial: "TechGov Solucoes S.A.", nomeFantasia: "TechGov", cnpj: "98.765.432/0001-10", contato: "Rafael Lima", email: "rafael@techgov.com.br", telefone: "(21) 99887-7665", segmento: "Tecnologia", cidade: "Rio de Janeiro", uf: "RJ", ativo: true, desde: "2021-07-22" },
  { id: "C-003", razaoSocial: "MedSupply Distribuidora", nomeFantasia: "MedSupply", cnpj: "55.444.333/0001-22", contato: "Dra. Clara Pinto", email: "clara@medsupply.com.br", telefone: "(31) 98123-4567", segmento: "Saude", cidade: "Belo Horizonte", uf: "MG", ativo: true, desde: "2023-01-10" },
  { id: "C-004", razaoSocial: "Logistica Sul Express", nomeFantasia: "LogSul", cnpj: "22.111.000/0001-33", contato: "Pedro Almeida", email: "pedro@logsul.com.br", telefone: "(51) 99654-3210", segmento: "Logistica", cidade: "Porto Alegre", uf: "RS", ativo: false, desde: "2020-09-05" },
  { id: "C-005", razaoSocial: "EducaMais Treinamentos", nomeFantasia: "EducaMais", cnpj: "33.222.111/0001-44", contato: "Juliana Castro", email: "juliana@educamais.com.br", telefone: "(61) 99432-1098", segmento: "Educacao", cidade: "Brasilia", uf: "DF", ativo: true, desde: "2024-02-18" },
  { id: "C-006", razaoSocial: "Verde Engenharia Ambiental", nomeFantasia: "Verde", cnpj: "44.333.222/0001-55", contato: "Bruno Tavares", email: "bruno@verde.com.br", telefone: "(85) 98321-0987", segmento: "Meio Ambiente", cidade: "Fortaleza", uf: "CE", ativo: true, desde: "2023-06-30" },
];

export const oportunidades: Oportunidade[] = [
  { id: "O-501", cliente: "Horizonte", edital: "CC 008/2026", orgao: "DNIT", etapa: "Disputa", valor: 12400000, probabilidade: 65, abertura: "2026-07-12", responsavel: "Marina Souza" },
  { id: "O-502", cliente: "TechGov", edital: "PE 077/2026", orgao: "TJ-MG", etapa: "Proposta enviada", valor: 480000, probabilidade: 70, abertura: "2026-06-22", responsavel: "Rafael Lima" },
  { id: "O-503", cliente: "MedSupply", edital: "PE 045/2026", orgao: "Pref. Campinas", etapa: "Documentacao", valor: 1840000, probabilidade: 50, abertura: "2026-06-28", responsavel: "Clara Pinto" },
  { id: "O-504", cliente: "EducaMais", edital: "PE 091/2026", orgao: "SESI Nacional", etapa: "Estudo do edital", valor: 740000, probabilidade: 40, abertura: "2026-07-02", responsavel: "Juliana Castro" },
  { id: "O-505", cliente: "TechGov", edital: "PE 203/2026", orgao: "Pref. Curitiba", etapa: "Habilitacao", valor: 3650000, probabilidade: 80, abertura: "2026-07-05", responsavel: "Rafael Lima" },
  { id: "O-506", cliente: "Verde", edital: "PE 112/2026", orgao: "Gov. BA", etapa: "Homologada", valor: 920000, probabilidade: 100, abertura: "2026-05-30", responsavel: "Bruno Tavares" },
  { id: "O-507", cliente: "Horizonte", edital: "TP 014/2026", orgao: "UFMA", etapa: "Perdida", valor: 320000, probabilidade: 0, abertura: "2026-05-15", responsavel: "Marina Souza" },
];

export const faturamento: Faturamento[] = [
  { mes: "Jan", contratos: 4, valor: 680000 },
  { mes: "Fev", contratos: 6, valor: 920000 },
  { mes: "Mar", contratos: 5, valor: 1150000 },
  { mes: "Abr", contratos: 8, valor: 1480000 },
  { mes: "Mai", contratos: 7, valor: 1320000 },
  { mes: "Jun", contratos: 9, valor: 1860000 },
];
