# Roteiro de Apresentacao

## 1. Objetivo

Este roteiro organiza a apresentacao academica do MVP VigIA.

Tempo sugerido:

```text
10 a 15 minutos
```

## 2. Abertura

Apresentar o VigIA como:

```text
Plataforma web inteligente de apoio operacional para registro, visualizacao e acompanhamento de ocorrencias simuladas.
```

Destacar:

- Projeto academico.
- Dados ficticios.
- Apoio a decisao, nao decisao automatica.
- MVP desenvolvido em sprints.

## 3. Problema

Explicar que uma central operacional precisa:

- Registrar ocorrencias.
- Visualizar recursos disponiveis.
- Acompanhar regioes.
- Priorizar atendimentos.
- Identificar alertas.
- Consultar informacoes rapidamente.

## 4. Solucao Construida

Apresentar os componentes:

- Frontend React.
- Backend Laravel.
- Banco PostgreSQL/PostGIS.
- Microservico FastAPI.
- Dashboard, mapa, alertas e IA.

## 5. Demonstracao Pratica

### 5.1 Login

Abrir:

```text
http://127.0.0.1:5173
```

Usar:

```text
admin@vigia.local
password
```

Mostrar que as rotas internas exigem autenticacao.

### 5.2 Dashboard

Mostrar:

- Totais operacionais.
- Graficos por prioridade, tipo, regiao, viaturas e alertas.
- Dados vindos da API Laravel.

### 5.3 Ocorrencias

Mostrar:

- Listagem de ocorrencias.
- Status.
- Prioridade humana.
- Prioridade sugerida pela IA.
- Relacao com tipo e regiao.

### 5.4 Sugestao de Prioridade

Selecionar ou usar uma ocorrencia simulada e executar a sugestao de prioridade.

Explicar:

- Laravel envia dados para FastAPI.
- FastAPI retorna prioridade, risco, confianca e explicacao.
- Laravel registra em `ai_predictions`.
- `occurrences.ai_priority` e atualizado.

### 5.5 Viaturas

Mostrar:

- Listagem de viaturas.
- Status operacional.
- Regiao vinculada.

### 5.6 Mapa Operacional

Mostrar:

- Ocorrencias no mapa.
- Viaturas no mapa.
- Filtros.
- Areas de risco simuladas.

### 5.7 Sugestao de Viatura

Selecionar uma ocorrencia no mapa e solicitar sugestao.

Explicar:

- Sistema considera viaturas ativas e disponiveis.
- Calcula distancia aproximada.
- Retorna a viatura mais proxima.

### 5.8 Alertas

Mostrar:

- Painel de alertas.
- Severidade.
- Status.
- Origem do alerta.
- Exemplo de regra usada.

## 6. Arquitetura

Resumo para explicar:

```text
React -> Laravel API -> PostgreSQL/PostGIS
                 |
                 v
              FastAPI IA
```

Pontos principais:

- Laravel centraliza a API.
- FastAPI fica isolado como microservico de IA.
- PostgreSQL/PostGIS armazena dados relacionais e geograficos.
- React consome a API e apresenta a interface.

## 7. Limitacoes

Reforcar:

- O MVP usa dados simulados.
- Nao ha predicao criminal real.
- IA nao substitui decisao humana.
- Distancia de viatura e simplificada.
- Alertas sao regras didaticas.
- Sistema nao esta publicado em producao.

## 8. Encerramento

Concluir destacando:

- O MVP atende ao objetivo academico.
- O projeto integra frontend, backend, banco, mapa e IA.
- A arquitetura permite evolucoes futuras.
- A documentacao registra instalacao, uso, limitacoes e fluxo de demonstracao.
