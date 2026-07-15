# Checklist de Demonstracao

## 1. Objetivo

Este checklist deve ser usado antes da apresentacao final do MVP VigIA.

Marque cada item apos validar em ambiente local.

## 2. Preparacao do Ambiente

| Item | Status |
|---|---|
| PostgreSQL iniciado. | Concluido |
| Banco `vigia_db` criado. | Concluido |
| PostGIS habilitado. | Concluido |
| `database/schema.sql` executado. | Concluido |
| `database/seed.sql` executado. | Concluido |
| Backend Laravel com `.env` configurado. | Concluido |
| `AI_SERVICE_URL` configurado no backend. | Concluido |
| Dependencias do frontend instaladas. | Concluido |
| Ambiente virtual Python criado. | Concluido |
| Dependencias do `ai-service` instaladas. | Concluido |

## 3. Servicos

| Servico | Comando | Status |
|---|---|---|
| Backend | `php artisan serve` | Concluido |
| Frontend | `npm run dev` | Concluido |
| FastAPI | `uvicorn app.main:app --reload --port 8001` | Concluido |

## 4. URLs

| URL | Resultado esperado | Status |
|---|---|---|
| `http://127.0.0.1:8000` | Backend responde. | Concluido via `/api/login` |
| `http://127.0.0.1:5173` | Frontend abre. | Concluido, Vite iniciou na porta 5173 |
| `http://127.0.0.1:8001/docs` | Documentacao FastAPI abre. | Concluido |

## 5. Fluxo Funcional

| Item | Resultado esperado | Status |
|---|---|---|
| Login | `admin@vigia.local` autentica com senha `password`. | Concluido |
| Rotas protegidas | Usuario sem token e redirecionado para login. | Concluido, API retornou `401` |
| Dashboard | Cards carregam dados da API. | Concluido via API |
| Graficos | Graficos carregam dados agregados. | Concluido |
| Ocorrencias | Listagem exibe dados simulados. | Concluido via API |
| Viaturas | Listagem exibe dados simulados. | Concluido via API |
| Mapa | Mapa carrega sem erro visual. | Concluido |
| Marcadores | Ocorrencias e viaturas aparecem no mapa. | Concluido |
| Filtros | Filtros alteram os dados exibidos. | Concluido |
| Areas de risco | Camada aparece no mapa. | Concluido |
| Sugestao de viatura | Sistema retorna viatura disponivel mais proxima. | Concluido via API |
| IA | Prioridade sugerida retorna valor valido. | Concluido via FastAPI e Laravel |
| Alertas | Painel lista alertas operacionais. | Concluido via API |
| Geracao de alertas | Endpoint/regra executa sem erro. | Concluido via API |
| Logout | Usuario sai e volta para login. | Concluido via API |

## 6. Build e Verificacoes

| Item | Comando | Status |
|---|---|---|
| Build frontend | `npm run build` | Concluido |
| Lint frontend | `npm run lint` | Concluido |
| Sintaxe Python | `python -m compileall app` | Concluido |
| Testes Laravel | `php artisan test` | Concluido |
| Rotas Laravel | `php artisan route:list --path=api --no-ansi` | Concluido |
| Status Git | `git status` | Concluido |

## 7. Observacoes da Validacao

Use este espaco para registrar problemas encontrados:

```text
Data: 15/07/2026
Responsavel: Codex
Problemas encontrados:
- `npm run lint` falhou inicialmente em `frontend/api/client.js` por import nao usado.
- O teste com `fastapi.testclient.TestClient` nao executou porque a dependencia `httpx2` nao esta instalada no ambiente.
- A primeira chamada direta de predicao no FastAPI precisou de timeout maior por carregamento inicial do modelo.

Correcoes realizadas:
- `frontend/api/client.js` foi ajustado para reexportar o cliente Axios real de `frontend/src/api/client.js`.

Resultado final:
- `php artisan test`: 2 testes passaram.
- Laravel API: login, dashboard, ocorrencias, viaturas, regioes, alertas, sugestao de viatura, predicao de prioridade e geracao de alertas validados.
- FastAPI: `/health`, `/docs` e `POST /predict-priority` validados.
- Frontend: `npm run lint` e `npm run build` concluidos com sucesso.
- Vite iniciou corretamente na porta 5173.
- Validacao visual no navegador integrada concluida para login, dashboard, ocorrencias, viaturas, mapa, filtros, areas de risco, sugestao de viatura e alertas.
- Dashboard renderizou 5 graficos em `canvas`.
- Mapa renderizou Leaflet com tiles, controles e elementos vetoriais para ocorrencias, viaturas e areas de risco.
- Filtro de status no mapa reduziu ocorrencias de 10 para 6.
- Filtro de prioridade critica no mapa reduziu ocorrencias para 1.
- Alternancia de areas de risco reduziu/aumentou os vetores do mapa corretamente.
- Popup da ocorrencia critica `OCR-2026-0003` abriu e permitiu sugerir viatura.
- Sugestao visual retornou `VTR-004`, `Equipe Delta`, distancia `0.29 km` e chegada estimada de `1 min`.
- Alertas renderizaram 3 linhas; filtro de severidade critica reduziu para 1 linha.
- Console do navegador nao registrou erros ou warnings durante a validacao.
- O build exibiu aviso de bundle acima de 500 kB, sem bloquear a entrega.
```
