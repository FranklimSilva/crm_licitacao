create table if not exists public.leads (
  id text primary key,
  numero_edital text not null,
  orgao text not null,
  objeto text not null,
  modalidade text not null check (modalidade in ('Pregao Eletronico', 'Concorrencia', 'Tomada de Precos', 'Dispensa')),
  valor_estimado numeric not null default 0,
  data_abertura date not null,
  uf char(2) not null,
  status text not null check (status in ('Novo', 'Analisando', 'Qualificado', 'Descartado')),
  fonte text not null default 'Effecti',
  created_at timestamptz not null default now()
);

create table if not exists public.clientes (
  id text primary key,
  razao_social text not null,
  nome_fantasia text not null,
  cnpj text not null,
  contato text not null,
  email text not null,
  telefone text not null,
  segmento text not null,
  cidade text not null,
  uf char(2) not null,
  ativo boolean not null default true,
  desde date not null,
  created_at timestamptz not null default now()
);

create table if not exists public.oportunidades (
  id text primary key,
  cliente text not null,
  edital text not null,
  orgao text not null,
  etapa text not null check (etapa in ('Estudo do edital', 'Documentacao', 'Proposta enviada', 'Disputa', 'Habilitacao', 'Homologada', 'Perdida')),
  valor numeric not null default 0,
  probabilidade integer not null default 0 check (probabilidade between 0 and 100),
  abertura date not null,
  responsavel text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.faturamento (
  mes text primary key,
  contratos integer not null default 0,
  valor numeric not null default 0,
  ordem integer not null default 1,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;
alter table public.clientes enable row level security;
alter table public.oportunidades enable row level security;
alter table public.faturamento enable row level security;

insert into public.leads (id, numero_edital, orgao, objeto, modalidade, valor_estimado, data_abertura, uf, status, fonte) values
('L-2841','PE 045/2026','Prefeitura de Campinas','Aquisicao de equipamentos de TI para escolas municipais','Pregao Eletronico',1840000,'2026-06-28','SP','Novo','Effecti'),
('L-2840','PE 112/2026','Governo do Estado da Bahia','Servicos de consultoria em gestao publica','Pregao Eletronico',920000,'2026-06-25','BA','Analisando','Effecti'),
('L-2839','CC 008/2026','DNIT','Obras de recuperacao rodoviaria BR-101','Concorrencia',12400000,'2026-07-12','RJ','Qualificado','Effecti'),
('L-2838','PE 077/2026','Tribunal de Justica de MG','Licenciamento de software juridico','Pregao Eletronico',480000,'2026-06-22','MG','Qualificado','Effecti'),
('L-2837','TP 014/2026','UFMA','Reforma de laboratorios de pesquisa','Tomada de Precos',320000,'2026-06-30','MA','Analisando','Effecti'),
('L-2836','DL 220/2026','Ministerio da Saude','Aquisicao emergencial de insumos hospitalares','Dispensa',215000,'2026-06-19','DF','Descartado','Effecti'),
('L-2835','PE 203/2026','Prefeitura de Curitiba','Sistema integrado de transporte publico','Pregao Eletronico',3650000,'2026-07-05','PR','Novo','Effecti'),
('L-2834','PE 091/2026','SESI Nacional','Capacitacao corporativa em compliance','Pregao Eletronico',740000,'2026-07-02','DF','Qualificado','Effecti')
on conflict (id) do update set status = excluded.status;

insert into public.clientes (id, razao_social, nome_fantasia, cnpj, contato, email, telefone, segmento, cidade, uf, ativo, desde) values
('C-001','Construtora Horizonte Ltda','Horizonte','12.345.678/0001-90','Marina Souza','marina@horizonte.com.br','(11) 98765-4321','Construcao Civil','Sao Paulo','SP',true,'2022-03-14'),
('C-002','TechGov Solucoes S.A.','TechGov','98.765.432/0001-10','Rafael Lima','rafael@techgov.com.br','(21) 99887-7665','Tecnologia','Rio de Janeiro','RJ',true,'2021-07-22'),
('C-003','MedSupply Distribuidora','MedSupply','55.444.333/0001-22','Dra. Clara Pinto','clara@medsupply.com.br','(31) 98123-4567','Saude','Belo Horizonte','MG',true,'2023-01-10'),
('C-004','Logistica Sul Express','LogSul','22.111.000/0001-33','Pedro Almeida','pedro@logsul.com.br','(51) 99654-3210','Logistica','Porto Alegre','RS',false,'2020-09-05'),
('C-005','EducaMais Treinamentos','EducaMais','33.222.111/0001-44','Juliana Castro','juliana@educamais.com.br','(61) 99432-1098','Educacao','Brasilia','DF',true,'2024-02-18'),
('C-006','Verde Engenharia Ambiental','Verde','44.333.222/0001-55','Bruno Tavares','bruno@verde.com.br','(85) 98321-0987','Meio Ambiente','Fortaleza','CE',true,'2023-06-30')
on conflict (id) do nothing;

insert into public.oportunidades (id, cliente, edital, orgao, etapa, valor, probabilidade, abertura, responsavel) values
('O-501','Horizonte','CC 008/2026','DNIT','Disputa',12400000,65,'2026-07-12','Marina Souza'),
('O-502','TechGov','PE 077/2026','TJ-MG','Proposta enviada',480000,70,'2026-06-22','Rafael Lima'),
('O-503','MedSupply','PE 045/2026','Pref. Campinas','Documentacao',1840000,50,'2026-06-28','Clara Pinto'),
('O-504','EducaMais','PE 091/2026','SESI Nacional','Estudo do edital',740000,40,'2026-07-02','Juliana Castro'),
('O-505','TechGov','PE 203/2026','Pref. Curitiba','Habilitacao',3650000,80,'2026-07-05','Rafael Lima'),
('O-506','Verde','PE 112/2026','Gov. BA','Homologada',920000,100,'2026-05-30','Bruno Tavares'),
('O-507','Horizonte','TP 014/2026','UFMA','Perdida',320000,0,'2026-05-15','Marina Souza')
on conflict (id) do nothing;

insert into public.faturamento (mes, contratos, valor, ordem) values
('Jan',4,680000,1),('Fev',6,920000,2),('Mar',5,1150000,3),('Abr',8,1480000,4),('Mai',7,1320000,5),('Jun',9,1860000,6)
on conflict (mes) do update set contratos = excluded.contratos, valor = excluded.valor, ordem = excluded.ordem;
