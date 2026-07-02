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
| S3-18 | Revisar fluxo completo de navegacao, logout e telas internas. | Concluido |

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

| Codigo | Tarefa | Status |
|---|---|---|
| S4-01 | Integrar Leaflet ao frontend. | Concluido |
| S4-02 | Exibir ocorrencias no mapa. | Concluido |
| S4-03 | Exibir viaturas no mapa. | Concluido |
| S4-04 | Criar filtros por status, prioridade, tipo e regiao. | Concluido |
| S4-05 | Criar endpoint para buscar viaturas disponiveis. | Concluido |
| S4-06 | Criar calculo inicial de distancia. | Concluido |
| S4-07 | Sugerir viatura mais proxima disponivel. | Concluido |
| S4-08 | Integrar sugestao de viatura no mapa. | Concluido |
| S4-09 | Validar fluxo completo da Sprint 4. | Concluido |

### Entregaveis Esperados

- Leaflet e React Leaflet integrados ao frontend.
- Tela de mapa operacional criada.
- Ocorrencias exibidas no mapa usando latitude e longitude.
- Viaturas exibidas no mapa usando latitude e longitude.
- Filtros por status, prioridade, tipo, regiao e status da viatura.
- Endpoint `GET /api/vehicles/available`.
- Endpoint `GET /api/occurrences/{id}/suggest-vehicle`.
- Calculo inicial de distancia entre ocorrencia e viatura.
- Painel de sugestao de viatura integrado ao mapa.

### Criterios de Aceite

A Sprint 4 sera considerada concluida quando:

- A tela `/mapa` estiver disponivel apenas para usuarios autenticados.
- O mapa exibir ocorrencias e viaturas com base nas coordenadas cadastradas.
- Os filtros alterarem os marcadores exibidos no mapa.
- O endpoint `GET /api/vehicles/available` retornar somente viaturas ativas e disponiveis.
- O endpoint `GET /api/occurrences/{id}/suggest-vehicle` retornar a viatura disponivel mais proxima.
- A sugestao de viatura aparecer na interface do mapa.
- O build do frontend executar com sucesso usando `npm run build`.
- O fluxo de mapa, filtros e sugestao de viatura for validado manualmente.

## 7. Sprint 5 - Microservico de IA

### Periodo

18/08/2026 a 31/08/2026

### Objetivo

Criar o microservico em FastAPI para sugerir prioridade de ocorrencias e registrar predicoes no banco.

### Tarefas Previstas

| Codigo | Tarefa | Status |
|---|---|---|
| S5-01 | Documentar escopo tecnico da Sprint 5. | Concluido |
| S5-02 | Configurar projeto Python em `ai-service`. | Pendente |
| S5-03 | Criar API FastAPI. | Pendente |
| S5-04 | Criar endpoint `POST /predict-priority`. | Pendente |
| S5-05 | Criar schemas de entrada e saida com Pydantic. | Pendente |
| S5-06 | Criar modelo inicial baseado em regras `rules-v1`. | Pendente |
| S5-07 | Retornar prioridade, risco, confianca, modelo e explicacao. | Pendente |
| S5-08 | Preparar base simulada para treinamento. | Pendente |
| S5-09 | Evoluir para modelo simples com Scikit-learn. | Pendente |
| S5-10 | Integrar Laravel com FastAPI. | Pendente |
| S5-11 | Registrar predicoes em `ai_predictions`. | Pendente |
| S5-12 | Atualizar `occurrences.ai_priority` com a sugestao da IA. | Pendente |
| S5-13 | Validar fluxo completo da Sprint 5. | Pendente |

### Entregaveis Esperados

- Documento tecnico da Sprint 5 em `docs/sprint-05-microservico-ia.md`.
- Projeto Python criado no diretorio `ai-service`.
- API FastAPI executando localmente.
- Endpoint `POST /predict-priority`.
- Modelo inicial de classificacao baseado em regras.
- Resposta contendo prioridade sugerida, pontuacao de risco, confianca, modelo e explicacao.
- Integracao do Laravel com o FastAPI.
- Registro da predicao na tabela `ai_predictions`.
- Atualizacao do campo `occurrences.ai_priority`.

### Criterios de Aceite

A Sprint 5 sera considerada concluida quando:

- O `ai-service` executar localmente na porta `8001`.
- A documentacao automatica do FastAPI estiver acessivel em `/docs`.
- O endpoint `POST /predict-priority` aceitar dados de uma ocorrencia.
- O endpoint retornar apenas prioridades validas: `baixa`, `media`, `alta` ou `critica`.
- O modelo `rules-v1` classificar ocorrencias com base em tipo, descricao, gravidade e regiao.
- O Laravel conseguir chamar o microservico FastAPI.
- A resposta da IA for registrada em `ai_predictions`.
- O campo `occurrences.ai_priority` for atualizado com a prioridade sugerida.
- O fluxo for validado com exemplos de prioridade baixa, media, alta e critica.

### Documentacao Tecnica

A documentacao detalhada da Sprint 5 esta em:

```text
docs/sprint-05-microservico-ia.md
```

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

Em 01/07/2026, o projeto esta com a Sprint 1, a Sprint 2, a Sprint 3 e a Sprint 4 antecipada concluidas.

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
- Revisao final do fluxo de login, dashboard, ocorrencias, viaturas, logout e rotas protegidas.
- Integracao do Leaflet e React Leaflet no frontend.
- Criacao da tela `/mapa`.
- Exibicao de ocorrencias e viaturas no mapa.
- Filtros do mapa por status, prioridade, tipo, regiao e status da viatura.
- Endpoint `GET /api/vehicles/available`.
- Endpoint `GET /api/occurrences/{id}/suggest-vehicle`.
- Calculo inicial de distancia entre ocorrencia e viatura.
- Sugestao da viatura disponivel mais proxima.
- Integracao da sugestao de viatura no mapa.
- Validacao manual do fluxo completo da Sprint 4.

Proximas tarefas:

1. Commitar e enviar as alteracoes finais da Sprint 4 para o repositorio remoto.
2. Revisar o escopo da Sprint 5 antes de iniciar o microservico de IA.
3. Iniciar a Sprint 5 com a configuracao do projeto Python em `ai-service`.
