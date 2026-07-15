# Sprint 07 - Fechamento e Apresentacao

## 1. Objetivo

Este documento define o escopo tecnico e documental da Sprint 07 do projeto VigIA.

A Sprint 07 tem como objetivo preparar o MVP para entrega final academica, consolidando documentacao, testes finais, Canvas, apresentacao e roteiro de demonstracao.

O foco desta sprint nao e adicionar novas funcionalidades centrais, mas garantir que o que ja foi construido esteja organizado, compreensivel, demonstravel e coerente com os objetivos do Projeto Integrador.

## 2. Contexto Atual do MVP

O VigIA ja possui:

- Backend Laravel com API REST protegida por token Bearer.
- Frontend React integrado ao backend.
- Banco PostgreSQL com PostGIS.
- Dashboard operacional com indicadores e graficos.
- Cadastro, listagem e filtros de ocorrencias.
- Cadastro, listagem e filtros de viaturas.
- Mapa operacional com ocorrencias, viaturas e areas de risco.
- Sugestao de viatura disponivel mais proxima.
- Microservico FastAPI para sugestao de prioridade.
- Registro de predicoes de IA em `ai_predictions`.
- Painel e regras iniciais de alertas operacionais.
- Dados simulados para demonstracao academica.

## 3. Escopo da Sprint

Esta sprint deve entregar:

- Revisao dos requisitos entregues.
- Atualizacao do `README.md` principal.
- Documentacao de instalacao e execucao local.
- Documentacao do banco de dados.
- Documentacao das limitacoes do MVP.
- Checklist de testes finais.
- Roteiro de demonstracao academica.
- Canvas do projeto.
- Estrutura de apresentacao final.
- Revisao geral de consistencia da documentacao.

## 4. Fora de Escopo

Nao faz parte desta sprint:

- Criar novas funcionalidades principais.
- Substituir a arquitetura definida nas sprints anteriores.
- Integrar dados reais de seguranca publica.
- Publicar o sistema em producao.
- Criar predicao criminal real.
- Automatizar decisao operacional sem validacao humana.

## 5. Tarefas da Sprint

| Codigo | Tarefa | Status inicial |
|---|---|---|
| S7-01 | Revisar requisitos entregues no MVP. | Pendente |
| S7-02 | Atualizar `README.md` principal com status final do projeto. | Pendente |
| S7-03 | Documentar instalacao e execucao local do backend, frontend e IA. | Pendente |
| S7-04 | Documentar banco de dados, scripts e dados simulados. | Pendente |
| S7-05 | Documentar limitacoes do MVP e cuidados eticos. | Pendente |
| S7-06 | Criar checklist de teste geral de demonstracao. | Pendente |
| S7-07 | Preparar Canvas do projeto. | Pendente |
| S7-08 | Preparar roteiro de apresentacao academica. | Pendente |
| S7-09 | Executar teste geral do fluxo demonstravel. | Pendente |
| S7-10 | Corrigir problemas encontrados na revisao final. | Pendente |
| S7-11 | Revisar links e consistencia da documentacao. | Pendente |
| S7-12 | Consolidar entrega final da Sprint 7. | Pendente |

## 6. Documentacao Final Prevista

Arquivos recomendados para a entrega final:

```text
README.md
docs/README.md
docs/sprints.md
docs/sprint-07/fechamento-apresentacao.md
docs/sprint-07/instalacao-execucao.md
docs/sprint-07/banco-dados.md
docs/sprint-07/limitacoes-mvp.md
docs/sprint-07/canvas.md
docs/sprint-07/roteiro-apresentacao.md
docs/sprint-07/checklist-demonstracao.md
```

## 7. Fluxo de Demonstracao

Fluxo recomendado para a apresentacao:

1. Explicar o problema e o objetivo do VigIA.
2. Mostrar o README e a arquitetura geral.
3. Iniciar backend Laravel, frontend React e FastAPI.
4. Fazer login com usuario administrador.
5. Apresentar o dashboard com indicadores e graficos.
6. Abrir a listagem de ocorrencias.
7. Demonstrar uma ocorrencia com prioridade sugerida pela IA.
8. Abrir a listagem de viaturas.
9. Acessar o mapa operacional.
10. Mostrar ocorrencias, viaturas e areas de risco.
11. Solicitar sugestao de viatura.
12. Abrir painel de alertas.
13. Explicar limitacoes, dados simulados e supervisao humana.
14. Encerrar com Canvas e proximas evolucoes possiveis.

## 8. Comandos de Execucao Local

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

Microservico de IA:

```powershell
cd ai-service
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8001
```

Build do frontend:

```powershell
cd frontend
npm run build
```

URLs locais:

```text
Backend Laravel: http://127.0.0.1:8000
Frontend React: http://127.0.0.1:5173
FastAPI: http://127.0.0.1:8001
FastAPI docs: http://127.0.0.1:8001/docs
```

## 9. Checklist de Teste Geral

| Item | Resultado esperado | Status |
|---|---|---|
| Login | Usuario administrador autentica com sucesso. | Pendente |
| Dashboard | Cards e graficos carregam dados da API. | Pendente |
| Ocorrencias | Listagem exibe dados simulados. | Pendente |
| IA | Sugestao de prioridade retorna valor valido. | Pendente |
| Viaturas | Listagem exibe viaturas simuladas. | Pendente |
| Mapa | Ocorrencias e viaturas aparecem no mapa. | Pendente |
| Sugestao de viatura | Sistema indica viatura disponivel mais proxima. | Pendente |
| Areas de risco | Camada de risco aparece no mapa. | Pendente |
| Alertas | Alertas operacionais aparecem na interface. | Pendente |
| Build frontend | `npm run build` conclui com sucesso. | Pendente |
| Documentacao | Links principais funcionam. | Pendente |

## 10. Criterios de Aceite

A Sprint 07 sera considerada concluida quando:

- O README principal estiver atualizado com a visao final do MVP.
- A documentacao de instalacao e execucao estiver clara.
- A documentacao do banco estiver revisada.
- As limitacoes do MVP estiverem registradas.
- O Canvas do projeto estiver preparado.
- O roteiro de apresentacao estiver preparado.
- O checklist de demonstracao tiver sido executado.
- O fluxo principal do sistema funcionar em ambiente local.
- O build do frontend executar com sucesso.
- A documentacao da entrega final estiver organizada em `docs/sprint-07`.

## 11. Riscos e Decisoes

| Risco | Decisao |
|---|---|
| Tentar adicionar novas funcionalidades no fechamento | Priorizar estabilidade, demonstracao e documentacao. |
| Documentacao ficar dispersa | Concentrar materiais finais em `docs/sprint-07`. |
| Apresentacao depender de muitos passos manuais | Criar roteiro simples e sequencial. |
| IA parecer decisao automatica real | Reforcar que e apoio academico com supervisao humana. |
| Dados simulados serem confundidos com dados reais | Documentar explicitamente que todos os dados sao ficticios. |

## 12. Proximos Passos

1. Criar documentacao de instalacao e execucao.
2. Criar documentacao final do banco de dados.
3. Criar documento de limitacoes do MVP.
4. Criar Canvas do projeto.
5. Criar roteiro de apresentacao.
6. Criar checklist detalhado de demonstracao.
7. Executar validacao final do sistema.
8. Atualizar status das tarefas da Sprint 7.
