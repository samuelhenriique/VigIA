# Planejamento de Sprints - VigIA

## 1. Visao Geral

O desenvolvimento do projeto VigIA sera organizado em sprints de duas semanas, iniciando em 23/06/2026. O objetivo e construir um MVP funcional para apresentacao academica, com backend, frontend, banco de dados, mapa, dados simulados, modulo inicial de IA, testes e documentacao.

## 2. Cronograma Geral

| Sprint | Periodo | Objetivo Principal |
|---|---|---|
| Sprint 1 | 23/06/2026 a 06/07/2026 | Estrutura do projeto, requisitos, banco de dados e dados simulados. |
| Sprint 2 | 07/07/2026 a 20/07/2026 | Backend Laravel com APIs principais. |
| Sprint 3 | 21/07/2026 a 03/08/2026 | Frontend React com telas iniciais e integracao com API. |
| Sprint 4 | 04/08/2026 a 17/08/2026 | Mapa interativo, geolocalizacao e sugestao de viatura. |
| Sprint 5 | 18/08/2026 a 31/08/2026 | Microservico FastAPI e modulo inicial de IA. |
| Sprint 6 | 01/09/2026 a 14/09/2026 | Predicao de areas de risco, alertas, graficos e validacao funcional. |
| Sprint 7 | 15/09/2026 a 28/09/2026 | Testes finais, ajustes, documentacao, Canvas e apresentacao. |

## 3. Sprint 1 - Estrutura, Requisitos e Banco

### Periodo

23/06/2026 a 06/07/2026

### Objetivo

Preparar a base do projeto para desenvolvimento, definindo escopo, requisitos, modelagem do banco, scripts SQL e dados simulados.

### Tarefas

| Codigo | Tarefa | Status |
|---|---|---|
| S1-01 | Criar estrutura de pastas do projeto. | Concluido |
| S1-02 | Criar arquivo `README.md`. | Concluido |
| S1-03 | Criar documento de requisitos em `docs/requisitos.md`. | Concluido |
| S1-04 | Criar modelagem do banco em `docs/modelagem-banco.md`. | Concluido |
| S1-05 | Criar banco `vigia_db` no PostgreSQL. | Concluido |
| S1-06 | Instalar e ativar PostGIS no banco. | Concluido |
| S1-07 | Criar script `database/schema.sql`. | Concluido |
| S1-08 | Executar `database/schema.sql` no pgAdmin. | Concluido |
| S1-09 | Criar script `database/seed.sql`. | Concluido |
| S1-10 | Executar `database/seed.sql` no pgAdmin. | Concluido |
| S1-11 | Validar dados simulados com consultas SQL. | Concluido |
| S1-12 | Criar documentacao basica de configuracao do banco. | Concluido |
| S1-13 | Revisar escopo do MVP antes de iniciar backend. | Concluido |

### Entregaveis

- Estrutura inicial do projeto.
- Documento de requisitos.
- Documento de modelagem do banco.
- Banco PostgreSQL criado.
- PostGIS ativo.
- Tabelas criadas.
- Dados simulados inseridos.
- Consultas SQL de validacao executadas.

### Criterios de Aceite

A Sprint 1 sera considerada concluida quando:

- O banco `vigia_db` existir no PostgreSQL.
- O PostGIS estiver funcionando.
- Todas as tabelas principais estiverem criadas.
- O arquivo `database/schema.sql` estiver salvo no projeto.
- O arquivo `database/seed.sql` estiver salvo no projeto.
- A consulta de ocorrencias retornar 10 registros simulados.
- A documentacao inicial estiver organizada na pasta `docs`.

## 4. Sprint 2 - Backend Laravel

### Periodo

07/07/2026 a 20/07/2026

### Objetivo

Criar a API principal do sistema em Laravel, conectada ao PostgreSQL, com rotas para autenticacao, ocorrencias, viaturas, regioes e tipos de ocorrencia.

### Tarefas Previstas

| Codigo | Tarefa | Status |
|---|---|---|
| S2-01 | Instalar e configurar Laravel no diretorio `backend`. | Concluido |
| S2-02 | Configurar conexao com PostgreSQL. | Concluido |
| S2-03 | Criar migrations ou alinhar migrations com `schema.sql`. | Concluido |
| S2-04 | Criar models principais. | Concluido |
| S2-05 | Criar controllers de ocorrencias, viaturas, regioes e tipos. | Concluido |
| S2-06 | Criar rotas REST. | Concluido |
| S2-07 | Criar validacoes de entrada. | Concluido |
| S2-08 | Criar autenticacao basica. | Concluido |
| S2-09 | Testar endpoints com dados simulados. | Concluido |
| S2-10 | Criar endpoint de resumo do dashboard. | Concluido |
| S2-11 | Documentar endpoints da API. | Concluido |

### Entregaveis Esperados

- API Laravel executando localmente.
- Conexao com PostgreSQL funcionando.
- Endpoints principais funcionando.
- Autenticacao inicial configurada.
- Documentacao da API em `docs/api-sprint-2.md`.

### Criterios de Aceite

A Sprint 2 sera considerada concluida quando:

- O Laravel estiver instalado no diretorio `backend`.
- A API conseguir consultar o banco `vigia_db`.
- O login com `admin@vigia.local` e senha `password` retornar token Bearer.
- As rotas protegidas retornarem `401` quando chamadas sem token.
- O CRUD de ocorrencias estiver funcionando.
- O CRUD de viaturas estiver funcionando.
- As listagens de regioes e tipos de ocorrencia estiverem funcionando.
- O endpoint `GET /api/dashboard/summary` retornar totais operacionais.
- Os endpoints forem testados com os dados simulados.
- A API estiver documentada.

## 5. Sprint 3 - Frontend React

### Periodo

21/07/2026 a 03/08/2026

### Objetivo

Criar a interface inicial do sistema, com dashboard, listagem de ocorrencias, listagem de viaturas e integracao com a API Laravel.

### Tarefas Previstas

| Codigo | Tarefa | Status |
|---|---|---|
| S3-01 | Configurar React no diretorio `frontend` com Vite. | Concluido |
| S3-02 | Instalar e configurar TailwindCSS. | Concluido |
| S3-03 | Instalar bibliotecas de apoio: Axios, React Router e Lucide React. | Concluido |
| S3-04 | Criar cliente Axios em `src/api/client.js`. | Concluido |
| S3-05 | Criar tela de login. | Concluido |
| S3-06 | Integrar login com `POST /api/login`. | Concluido |
| S3-07 | Salvar token Bearer, tipo do token e usuario no `localStorage`. | Concluido |
| S3-08 | Configurar envio automatico do token nas requisicoes protegidas. | Concluido |
| S3-09 | Configurar rotas com React Router. | Concluido |
| S3-10 | Criar rota protegida com `PrivateRoute`. | Concluido |
| S3-11 | Impedir usuario autenticado de retornar para a tela de login. | Concluido |
| S3-12 | Criar layout principal com navegacao e logout. | Concluido |
| S3-13 | Integrar logout com `POST /api/logout`. | Concluido |
| S3-14 | Criar dashboard integrado com `GET /api/dashboard/summary`. | Concluido |
| S3-15 | Criar listagem de ocorrencias integrada com `GET /api/occurrences`. | Concluido |
| S3-16 | Criar listagem de viaturas integrada com `GET /api/vehicles`. | Concluido |
| S3-17 | Executar build do frontend para validar a compilacao. | Concluido |
| S3-18 | Revisar fluxo completo de navegacao, logout e telas internas. | Pendente |

### Entregaveis Esperados

- Projeto React criado no diretorio `frontend`.
- TailwindCSS configurado.
- Cliente Axios configurado para a API Laravel.
- Tela de login funcional.
- Autenticacao integrada com Laravel Sanctum.
- Token Bearer salvo e enviado automaticamente nas requisicoes.
- Rotas protegidas no frontend.
- Layout principal com navegacao entre telas internas.
- Dashboard com dados reais da API.
- Listagem de ocorrencias com dados reais da API.
- Listagem de viaturas com dados reais da API.

### Criterios de Aceite

A Sprint 3 sera considerada concluida quando:

- O frontend executar localmente com `npm run dev`.
- O build do frontend executar com sucesso usando `npm run build`.
- A tela de login autenticar com `admin@vigia.local` e senha `password`.
- O token retornado pela API for salvo no `localStorage`.
- As rotas internas redirecionarem para `/login` quando nao houver token.
- O usuario autenticado for redirecionado de `/login` para `/dashboard`.
- O dashboard exibir os totais retornados por `GET /api/dashboard/summary`.
- A tela de ocorrencias listar os registros de `GET /api/occurrences`.
- A tela de viaturas listar os registros de `GET /api/vehicles`.
- O logout encerrar a sessao local e retornar para `/login`.

## 6. Sprint 4 - Mapa e Geolocalizacao

### Periodo

04/08/2026 a 17/08/2026

### Objetivo

Adicionar mapa interativo, visualizacao geografica das ocorrencias e viaturas, filtros e sugestao inicial de viatura.

### Tarefas Previstas

- Integrar Leaflet ao frontend.
- Exibir ocorrencias no mapa.
- Exibir viaturas no mapa.
- Criar filtros por status, prioridade, tipo e regiao.
- Criar endpoint para buscar viaturas disponiveis.
- Criar calculo inicial de distancia.
- Sugerir viatura mais proxima disponivel.

## 7. Sprint 5 - Microservico de IA

### Periodo

18/08/2026 a 31/08/2026

### Objetivo

Criar o microservico em FastAPI para sugerir prioridade de ocorrencias e registrar predicoes no banco.

### Tarefas Previstas

- Configurar projeto Python em `ai-service`.
- Criar API FastAPI.
- Criar endpoint de predicao de prioridade.
- Criar modelo inicial baseado em regras.
- Preparar base simulada para treinamento.
- Evoluir para modelo simples com Scikit-learn.
- Integrar Laravel com FastAPI.

## 8. Sprint 6 - Alertas, Graficos e Validacao

### Periodo

01/09/2026 a 14/09/2026

### Objetivo

Finalizar recursos inteligentes do MVP, incluindo alertas, graficos, mapa de risco e validacao funcional.

### Tarefas Previstas

- Criar graficos com Chart.js.
- Criar indicadores de ocorrencias por tipo, regiao e prioridade.
- Criar regra de alertas para ocorrencias semelhantes.
- Criar visualizacao de areas de risco.
- Testar fluxo completo: cadastro, IA, viatura, mapa, alerta e dashboard.
- Corrigir erros encontrados.

## 9. Sprint 7 - Fechamento e Apresentacao

### Periodo

15/09/2026 a 28/09/2026

### Objetivo

Preparar o projeto para entrega final, com testes, documentacao, Canvas e apresentacao academica.

### Tarefas Previstas

- Revisar requisitos entregues.
- Criar ou atualizar README final.
- Documentar instalacao e execucao do projeto.
- Documentar banco de dados.
- Documentar limitacoes do MVP.
- Preparar Canvas do projeto.
- Preparar apresentacao.
- Realizar teste geral de demonstracao.

## 10. Status Atual

Em 01/07/2026, o projeto esta com a Sprint 1 e a Sprint 2 concluidas, e a Sprint 3 em desenvolvimento antecipado.

Ja foram concluidos:

- Estrutura inicial de pastas.
- Documento de requisitos.
- Documento de modelagem do banco.
- Criacao do banco `vigia_db`.
- Instalacao e ativacao do PostGIS.
- Criacao das tabelas.
- Insercao de dados simulados.
- Validacao inicial das ocorrencias simuladas.
- Instalacao e configuracao do Laravel no diretorio `backend`.
- Conexao da API com o banco PostgreSQL `vigia_db`.
- CRUD de ocorrencias.
- CRUD de viaturas.
- Endpoints de regioes e tipos de ocorrencia.
- Autenticacao com Laravel Sanctum.
- Rotas protegidas por token Bearer.
- Endpoint `GET /api/dashboard/summary`.
- Smoke test da API com dados simulados.
- Documentacao da API em `docs/api-sprint-2.md`.
- Criacao do frontend React no diretorio `frontend`.
- Configuracao do TailwindCSS.
- Configuracao do cliente Axios para a API Laravel.
- Tela de login integrada com `POST /api/login`.
- Persistencia do token Bearer no `localStorage`.
- Rotas protegidas no frontend com `PrivateRoute`.
- Redirecionamento de usuario autenticado de `/login` para `/dashboard`.
- Layout principal com navegacao entre telas internas.
- Logout integrado com `POST /api/logout`.
- Dashboard integrado com `GET /api/dashboard/summary`.
- Listagem de ocorrencias integrada com `GET /api/occurrences`.
- Listagem de viaturas integrada com `GET /api/vehicles`.
- Build do frontend validado com `npm run build`.

Proximas tarefas:

1. Revisar o fluxo completo da Sprint 3: login, dashboard, ocorrencias, viaturas, logout e rotas protegidas.
2. Ajustar detalhes visuais e de navegacao encontrados durante os testes manuais.
3. Atualizar o status da tarefa S3-18 apos a revisao final do fluxo.
4. Commitar e enviar as alteracoes da Sprint 3 para o repositorio remoto.
