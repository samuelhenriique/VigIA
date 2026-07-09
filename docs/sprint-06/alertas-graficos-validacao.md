# Sprint 06 - Alertas, Graficos e Validacao

## 1. Objetivo

Este documento define o escopo tecnico da Sprint 06 do projeto VigIA.

A Sprint 06 tem como objetivo finalizar os recursos inteligentes do MVP, adicionando graficos operacionais, indicadores consolidados, regras de alertas, visualizacao de areas de risco e validacao funcional do fluxo completo.

O foco desta sprint e transformar os dados ja existentes em apoio visual para tomada de decisao simulada. O sistema continua sendo academico e nao deve ser tratado como ferramenta real de policiamento, despacho ou predicao criminal.

## 2. Contexto Atual do MVP

O VigIA ja possui:

- Backend Laravel com API REST protegida por token Bearer.
- Frontend React integrado ao backend.
- Banco PostgreSQL com PostGIS.
- Cadastro, listagem e filtros de ocorrencias.
- Cadastro, listagem e filtros de viaturas.
- Mapa operacional com Leaflet e React Leaflet.
- Sugestao de viatura disponivel mais proxima.
- Microservico FastAPI para sugestao de prioridade.
- Registro de predicoes em `ai_predictions`.
- Atualizacao de `occurrences.ai_priority`.
- Tabela `alerts` criada no banco.
- Campo `regions.risk_level` disponivel para indicar risco simulado por regiao.
- Endpoint `GET /api/dashboard/summary` com resumo de ocorrencias, viaturas e alertas.

## 3. Escopo da Sprint

Esta sprint deve entregar:

- Graficos no dashboard usando Chart.js.
- Indicadores de ocorrencias por tipo, regiao, status e prioridade.
- Indicadores de viaturas por status.
- Indicadores de alertas por status e severidade.
- Listagem ou painel de alertas operacionais.
- Regra de geracao de alertas para ocorrencias semelhantes.
- Regra de alerta para ocorrencias criticas sem atendimento confirmado.
- Visualizacao de areas de risco no mapa operacional.
- Validacao manual do fluxo completo do MVP.
- Correcao de erros encontrados durante a validacao.

## 4. Fora de Escopo

Nao faz parte desta sprint:

- Usar dados reais de pessoas, vitimas, suspeitos ou operadores.
- Criar predicao criminal real.
- Criar despacho automatico definitivo.
- Substituir a decisao humana por decisao automatizada.
- Criar modelo avancado de machine learning para areas de risco.
- Criar relatorios em PDF ou exportacao de dados.
- Publicar a aplicacao em ambiente de producao.

## 5. Arquitetura Prevista

Fluxo geral da Sprint 06:

```text
Banco PostgreSQL/PostGIS
    |
    v
Backend Laravel
    |
    +--> GET /api/dashboard/summary
    +--> GET /api/alerts
    +--> Regras de geracao de alertas
    |
    v
Frontend React
    |
    +--> Dashboard com graficos
    +--> Painel/listagem de alertas
    +--> Mapa com areas de risco
```

O Laravel continua sendo a API principal. O FastAPI segue responsavel apenas pela sugestao de prioridade de ocorrencias.

## 6. Tarefas da Sprint

| Codigo | Tarefa | Status inicial |
|---|---|---|
| S6-01 | Documentar escopo tecnico da Sprint 6. | Concluido |
| S6-02 | Instalar Chart.js e integracao React. | Concluido |
| S6-03 | Revisar endpoint `GET /api/dashboard/summary`. | Concluido |
| S6-04 | Criar graficos no dashboard. | Concluido |
| S6-05 | Criar listagem ou painel de alertas no frontend. | Concluido |
| S6-06 | Criar endpoint `GET /api/alerts`. | Concluido |
| S6-07 | Criar regra de alertas para ocorrencias semelhantes. | Pendente |
| S6-08 | Criar regra de alerta para ocorrencias criticas sem despacho. | Pendente |
| S6-09 | Criar visualizacao de areas de risco no mapa. | Pendente |
| S6-10 | Validar fluxo completo do MVP. | Pendente |
| S6-11 | Corrigir erros encontrados na validacao. | Pendente |
| S6-12 | Atualizar documentacao final da Sprint 6. | Pendente |

## 7. Indicadores do Dashboard

O dashboard deve exibir indicadores numericos e graficos com base no endpoint:

```http
GET /api/dashboard/summary
```

O endpoint ja possui dados agregados para:

- Total de ocorrencias.
- Ocorrencias por status.
- Ocorrencias por prioridade sugerida pela IA.
- Ocorrencias por tipo.
- Ocorrencias por regiao.
- Total de viaturas.
- Viaturas ativas.
- Viaturas por status.
- Total de alertas.
- Alertas abertos.
- Alertas por status.
- Alertas por severidade.

## 8. Graficos Previstos

Graficos recomendados para o dashboard:

| Grafico | Fonte de dados | Tipo visual |
|---|---|---|
| Ocorrencias por prioridade | `summary.occurrences.by_priority` | Doughnut ou barra |
| Ocorrencias por tipo | `summary.occurrences.by_type` | Barra |
| Ocorrencias por regiao | `summary.occurrences.by_region` | Barra horizontal |
| Viaturas por status | `summary.vehicles.by_status` | Doughnut |
| Alertas por severidade | `summary.alerts.by_severity` | Barra |

Dependencias previstas no frontend:

```powershell
cd frontend
npm install chart.js react-chartjs-2
```

O uso de `react-chartjs-2` facilita a integracao do Chart.js com componentes React.

## 9. Alertas Operacionais

A tabela `alerts` ja esta prevista no banco.

Campos principais:

| Campo | Descricao |
|---|---|
| `occurrence_id` | Ocorrencia relacionada ao alerta, quando existir. |
| `type` | Tipo tecnico do alerta. |
| `title` | Titulo curto exibido ao usuario. |
| `description` | Descricao do motivo do alerta. |
| `severity` | Severidade: `baixo`, `medio`, `alto` ou `critico`. |
| `status` | Status: `aberto`, `visualizado` ou `resolvido`. |
| `generated_by` | Origem do alerta: `sistema`, `ia` ou `regra`. |

Tipos iniciais recomendados:

| Tipo | Regra |
|---|---|
| `padrao_semelhante` | Ocorrencias do mesmo tipo e regiao em intervalo recente. |
| `prioridade_critica` | Ocorrencia critica aberta sem despacho confirmado. |
| `area_risco` | Regiao com risco alto e ocorrencias recentes relevantes. |

## 10. Endpoint de Alertas

Endpoint previsto:

```http
GET /api/alerts
```

Finalidade:

```text
Listar alertas operacionais para exibicao no frontend.
```

Filtros recomendados:

| Filtro | Exemplo |
|---|---|
| `status` | `/api/alerts?status=aberto` |
| `severity` | `/api/alerts?severity=critico` |
| `type` | `/api/alerts?type=padrao_semelhante` |

Resposta esperada:

```json
{
  "data": [
    {
      "id": 1,
      "occurrence_id": 9,
      "type": "padrao_semelhante",
      "title": "Furtos recentes na regiao da Trindade",
      "description": "O sistema identificou ocorrencias de furto em regiao proxima e intervalo recente.",
      "severity": "medio",
      "status": "aberto",
      "generated_by": "regra",
      "created_at": "2026-09-01T10:00:00.000000Z",
      "occurrence": {
        "id": 9,
        "code": "OCR-2026-0009",
        "title": "Furto proximo a terminal"
      }
    }
  ]
}
```

## 11. Regra de Ocorrencias Semelhantes

Regra inicial recomendada para gerar alerta:

```text
Se existirem 2 ou mais ocorrencias abertas ou em atendimento
do mesmo tipo e da mesma regiao
em uma janela recente,
gerar alerta do tipo padrao_semelhante.
```

Janela inicial sugerida:

```text
24 horas
```

Severidade sugerida:

| Condicao | Severidade |
|---|---|
| 2 ocorrencias semelhantes | `medio` |
| 3 ou mais ocorrencias semelhantes | `alto` |
| Alguma ocorrencia com `ai_priority = critica` | `critico` |

Cuidados:

- Evitar criar alertas duplicados para o mesmo padrao.
- Usar somente dados simulados.
- Registrar uma explicacao simples no campo `description`.
- Manter o alerta como apoio informativo, nao como decisao automatica.

## 12. Regra de Ocorrencia Critica Sem Despacho

Regra inicial recomendada:

```text
Se uma ocorrencia estiver aberta,
tiver ai_priority = critica
e nao possuir despacho confirmado,
gerar alerta do tipo prioridade_critica.
```

Severidade:

```text
critico
```

Origem:

```text
generated_by = ia
```

## 13. Areas de Risco no Mapa

O mapa deve exibir uma camada visual de areas de risco com base em:

```text
regions.risk_level
regions.center_latitude
regions.center_longitude
```

Para o MVP, a visualizacao pode ser feita com circulos no Leaflet.

Cores sugeridas:

| Nivel de risco | Cor |
|---|---|
| 1 | Verde |
| 2 | Verde claro |
| 3 | Amarelo |
| 4 | Laranja |
| 5 | Vermelho |

Raio sugerido:

```text
1000m a 2500m, aumentando conforme risk_level.
```

Comportamento esperado:

- Exibir camada de risco no mapa `/mapa`.
- Permitir ligar ou desligar a camada.
- Mostrar popup com nome da regiao e nivel de risco.
- Manter os marcadores de ocorrencias e viaturas funcionando.
- Nao bloquear os filtros ja existentes.

## 14. Alteracoes Previstas no Frontend

Arquivos provaveis:

```text
frontend/package.json
frontend/package-lock.json
frontend/src/pages/Dashboard.jsx
frontend/src/pages/Mapa.jsx
frontend/src/pages/Alertas.jsx
frontend/src/App.jsx
frontend/src/layouts/AppLayout.jsx
```

Alteracoes esperadas:

- Instalar Chart.js e wrapper React.
- Criar componentes simples de grafico.
- Reorganizar o dashboard para exibir cards e graficos.
- Criar painel ou pagina de alertas.
- Adicionar navegacao para alertas, se a pagina dedicada for criada.
- Adicionar camada de risco no mapa.

## 15. Alteracoes Previstas no Backend

Arquivos provaveis:

```text
backend/routes/api.php
backend/app/Http/Controllers/Api/DashboardController.php
backend/app/Http/Controllers/Api/AlertController.php
backend/app/Models/Alert.php
```

Alteracoes esperadas:

- Manter `GET /api/dashboard/summary` como fonte principal dos graficos.
- Criar `GET /api/alerts` para listagem.
- Criar filtros de alertas por status, severidade e tipo.
- Implementar regras iniciais de geracao de alertas.
- Evitar duplicidade de alertas semelhantes.

## 16. Validacao Funcional

Fluxo completo que deve ser validado:

1. Fazer login com usuario administrador.
2. Acessar o dashboard.
3. Confirmar que os cards numericos carregam.
4. Confirmar que os graficos carregam com dados do backend.
5. Acessar ocorrencias.
6. Criar ou selecionar uma ocorrencia com dados simulados.
7. Executar a sugestao de prioridade pela IA.
8. Confirmar atualizacao de `occurrences.ai_priority`.
9. Acessar o mapa.
10. Confirmar que ocorrencias e viaturas aparecem.
11. Solicitar sugestao de viatura.
12. Confirmar que a viatura mais proxima e exibida.
13. Confirmar que areas de risco aparecem no mapa.
14. Confirmar que alertas aparecem no dashboard ou pagina de alertas.
15. Executar build do frontend.

## 17. Comandos de Validacao

Backend Laravel:

```powershell
cd backend
php artisan serve
```

Frontend React:

```powershell
cd frontend
npm run dev
```

Build do frontend:

```powershell
cd frontend
npm run build
```

Microservico de IA:

```powershell
cd ai-service
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8001
```

URLs locais:

```text
Backend Laravel: http://127.0.0.1:8000
Frontend React: http://127.0.0.1:5173
FastAPI: http://127.0.0.1:8001
FastAPI docs: http://127.0.0.1:8001/docs
```

## 18. Criterios de Aceite

A Sprint 06 sera considerada concluida quando:

- O dashboard exibir graficos com Chart.js.
- Os graficos usarem dados reais retornados pela API Laravel.
- O dashboard exibir indicadores por tipo, regiao e prioridade.
- O sistema listar alertas operacionais.
- A regra de ocorrencias semelhantes gerar alerta simulado.
- A regra de ocorrencia critica sem despacho gerar alerta simulado.
- O mapa exibir areas de risco por regiao.
- A camada de risco puder ser visualizada sem quebrar filtros e marcadores.
- O fluxo cadastro, IA, viatura, mapa, alerta e dashboard for validado manualmente.
- O build do frontend executar com sucesso.
- A documentacao da sprint estiver atualizada.

## 19. Riscos e Decisoes

| Risco | Decisao |
|---|---|
| Dashboard ficar visualmente poluido | Priorizar poucos graficos claros e uteis. |
| Criar endpoints duplicados | Reutilizar `GET /api/dashboard/summary` para indicadores. |
| Alertas duplicados | Definir regra de verificacao antes de inserir novo alerta. |
| Area de risco parecer predicao real | Documentar como simulacao baseada em `regions.risk_level`. |
| Chart.js aumentar complexidade do frontend | Criar componentes pequenos e reutilizaveis. |
| Validacao ficar extensa demais | Usar checklist manual focado no fluxo principal do MVP. |

## 20. Proximos Passos

1. Instalar Chart.js no frontend.
2. Revisar o formato atual de `GET /api/dashboard/summary`.
3. Implementar graficos no dashboard.
4. Criar endpoint `GET /api/alerts`.
5. Criar painel ou pagina de alertas.
6. Implementar regras iniciais de alerta.
7. Adicionar camada de areas de risco no mapa.
8. Executar validacao funcional completa.
9. Corrigir erros encontrados.
10. Atualizar este documento com o que foi entregue.
