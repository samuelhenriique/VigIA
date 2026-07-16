# VigIA

Plataforma web inteligente de apoio operacional para centrais de seguranca publica, desenvolvida como Projeto Integrador do curso de Analise e Desenvolvimento de Sistemas.

O VigIA tem como objetivo auxiliar o registro, a visualizacao, a priorizacao e o acompanhamento de ocorrencias policiais em um ambiente academico controlado, utilizando dados simulados e recursos de inteligencia artificial como apoio a decisao.

## Objetivo do MVP

O MVP sera uma plataforma web funcional com:

- Cadastro e consulta de ocorrencias.
- Cadastro e consulta de viaturas.
- Dashboard operacional.
- Mapa interativo com ocorrencias e viaturas.
- Sugestao de prioridade da ocorrencia.
- Sugestao de viatura disponivel mais adequada.
- Alertas operacionais simples.
- Dados simulados para validacao academica.

O sistema nao utiliza dados reais de seguranca publica e nao substitui a decisao humana. As sugestoes geradas pela plataforma devem ser interpretadas apenas como apoio operacional.

## Stack Prevista

| Camada | Tecnologias |
|---|---|
| Frontend | React, JavaScript, TailwindCSS, Leaflet, Chart.js |
| Backend | PHP, Laravel, APIs REST |
| IA | Python, FastAPI, Pandas, NumPy, Scikit-learn |
| Banco de dados | PostgreSQL, PostGIS |
| Versionamento | Git e GitHub |

## Estrutura do Projeto

```text
VigIA/
  ai-service/
  backend/
  database/
    schema.sql
    seed.sql
  docs/
    README.md
    sprints.md
    sprint-01/
      configuracao-banco.md
      modelagem-banco.md
      requisitos.md
      revisao-escopo-mvp.md
    sprint-02/
      api.md
    sprint-03/
      frontend-react.md
    sprint-04/
      mapa-geolocalizacao.md
    sprint-05/
      microservico-ia.md
    sprint-06/
      alertas-graficos-validacao.md
    sprint-07/
      fechamento-apresentacao.md
      instalacao-execucao.md
      banco-dados.md
      limitacoes-mvp.md
      canvas.md
      roteiro-apresentacao.md
      checklist-demonstracao.md
  frontend/
  README.md
```

## Documentacao

- [Indice da documentacao](docs/README.md)
- [Planejamento de sprints](docs/sprints.md)
- [Sprint 1 - Requisitos](docs/sprint-01/requisitos.md)
- [Sprint 1 - Modelagem do banco](docs/sprint-01/modelagem-banco.md)
- [Sprint 1 - Configuracao do banco](docs/sprint-01/configuracao-banco.md)
- [Sprint 1 - Revisao do escopo do MVP](docs/sprint-01/revisao-escopo-mvp.md)
- [Sprint 2 - API Laravel](docs/sprint-02/api.md)
- [Sprint 3 - Frontend React](docs/sprint-03/frontend-react.md)
- [Sprint 4 - Mapa e geolocalizacao](docs/sprint-04/mapa-geolocalizacao.md)
- [Sprint 5 - Microservico de IA](docs/sprint-05/microservico-ia.md)
- [Sprint 6 - Alertas, graficos e validacao](docs/sprint-06/alertas-graficos-validacao.md)
- [Sprint 7 - Fechamento e apresentacao](docs/sprint-07/fechamento-apresentacao.md)
- [Sprint 7 - Instalacao e execucao](docs/sprint-07/instalacao-execucao.md)
- [Sprint 7 - Banco de dados](docs/sprint-07/banco-dados.md)
- [Sprint 7 - Limitacoes do MVP](docs/sprint-07/limitacoes-mvp.md)
- [Sprint 7 - Canvas do projeto](docs/sprint-07/canvas.md)
- [Sprint 7 - Roteiro de apresentacao](docs/sprint-07/roteiro-apresentacao.md)
- [Sprint 7 - Checklist de demonstracao](docs/sprint-07/checklist-demonstracao.md)

## Banco de Dados

O banco utilizado no MVP e o PostgreSQL com PostGIS.

Nome recomendado do banco:

```text
vigia_db
```

Scripts principais:

- `database/schema.sql`: cria extensao PostGIS, tabelas, restricoes e indices.
- `database/seed.sql`: insere dados simulados para testes.

Para configurar o banco manualmente pelo pgAdmin, siga:

```text
docs/sprint-01/configuracao-banco.md
```

## Backend Laravel

O backend da Sprint 2 fica no diretorio:

```text
backend/
```

Antes de executar, confirme se o arquivo `backend/.env` aponta para o banco local:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=vigia_db
DB_USERNAME=postgres
DB_PASSWORD=sua_senha_do_postgres
```

Para iniciar a API:

```powershell
cd backend
php artisan serve
```

URL padrao:

```text
http://127.0.0.1:8000
```

Usuario inicial:

```text
E-mail: admin@vigia.local
Senha: password
```

Endpoints principais:

```text
POST /api/login
GET  /api/me
POST /api/logout

GET    /api/occurrences
POST   /api/occurrences
GET    /api/occurrences/{id}
PUT    /api/occurrences/{id}
PATCH  /api/occurrences/{id}
DELETE /api/occurrences/{id}

GET    /api/vehicles
POST   /api/vehicles
GET    /api/vehicles/{id}
PUT    /api/vehicles/{id}
PATCH  /api/vehicles/{id}
DELETE /api/vehicles/{id}

GET /api/regions
GET /api/occurrence-types
GET /api/dashboard/summary
GET /api/vehicles/available
GET /api/occurrences/{id}/suggest-vehicle
POST /api/occurrences/{id}/predict-priority
GET /api/alerts
POST /api/alerts/generate
```

As rotas principais exigem token Bearer retornado pelo login. Mais detalhes estao em:

```text
docs/sprint-02/api.md
```

## Status Atual

Sprint atual:

```text
Sprint 7 - Fechamento e Apresentacao
Status: Em andamento
```

Ja concluido:

- Estrutura inicial de pastas.
- Documento de requisitos.
- Modelagem do banco.
- Banco `vigia_db` criado.
- PostGIS instalado e ativado.
- Tabelas criadas com `schema.sql`.
- Dados simulados inseridos com `seed.sql`.
- Planejamento de sprints.
- Revisao do escopo do MVP.
- Backend Laravel configurado.
- API conectada ao PostgreSQL.
- Autenticacao com Laravel Sanctum.
- CRUD de ocorrencias.
- CRUD de viaturas.
- Endpoints de regioes e tipos de ocorrencia.
- Endpoint de dashboard operacional.
- Documentacao da API da Sprint 2.
- Frontend React com Vite.
- TailwindCSS, React Router, Axios e Lucide React.
- Tela de login integrada ao Laravel Sanctum.
- Rotas protegidas no frontend.
- Dashboard integrado com a API.
- Listagem de ocorrencias integrada com a API.
- Listagem de viaturas integrada com a API.
- Mapa operacional com Leaflet e React Leaflet.
- Filtros de ocorrencias e viaturas no mapa.
- Sugestao de viatura disponivel mais proxima.
- Microservico FastAPI para sugestao de prioridade.
- Modelo inicial de IA baseado em regras e modelo simples com Scikit-learn.
- Integracao Laravel com o microservico de IA.
- Registro de predicoes em `ai_predictions`.
- Graficos operacionais com Chart.js.
- Painel e regras de alertas operacionais.
- Areas de risco no mapa.
- Validacao funcional da Sprint 6.

Proximas etapas:

- Revisar requisitos entregues.
- Atualizar documentacao final de instalacao, execucao e banco de dados.
- Documentar limitacoes do MVP.
- Preparar Canvas do projeto.
- Preparar roteiro de apresentacao academica.
- Executar teste geral de demonstracao.

## Observacoes Academicas

Este projeto e um prototipo academico. A base inicial utiliza apenas dados ficticios e simulados, sem informacoes reais de vitimas, suspeitos, policiais, atendentes, placas, documentos ou enderecos completos.

O uso de inteligencia artificial no VigIA tem finalidade demonstrativa e de apoio a decisao, respeitando principios de supervisao humana, privacidade, seguranca da informacao e LGPD.
