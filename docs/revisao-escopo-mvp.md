# Revisao do Escopo do MVP - VigIA

## 1. Objetivo da Revisao

Esta revisao confirma o escopo do MVP do projeto VigIA antes do inicio do desenvolvimento do backend Laravel.

O objetivo e garantir que o projeto continue viavel para entrega academica, evitando funcionalidades grandes demais para a primeira versao.

## 2. Decisao de Escopo

O MVP esta aprovado como uma plataforma web academica, com dados simulados, voltada ao apoio operacional em seguranca publica.

A primeira versao deve demonstrar o funcionamento do fluxo principal:

1. Registrar ocorrencias simuladas.
2. Consultar ocorrencias no painel.
3. Visualizar ocorrencias e viaturas.
4. Sugerir prioridade da ocorrencia.
5. Sugerir viatura disponivel.
6. Exibir indicadores e alertas.

## 3. Funcionalidades Aprovadas Para o MVP

### Ocorrencias

- Cadastro de ocorrencias.
- Listagem de ocorrencias.
- Edicao de ocorrencias.
- Consulta detalhada de ocorrencia.
- Filtro por tipo, status, prioridade, regiao e periodo.

### Viaturas

- Cadastro de viaturas.
- Listagem de viaturas.
- Edicao de viaturas.
- Controle de status da viatura.
- Identificacao de viaturas disponiveis.

### Dashboard

- Total de ocorrencias.
- Ocorrencias por status.
- Ocorrencias por prioridade.
- Ocorrencias por tipo.
- Ocorrencias por regiao.
- Alertas operacionais em aberto.

### Mapa

- Exibicao de ocorrencias no mapa.
- Exibicao de viaturas no mapa.
- Diferenciacao visual por prioridade ou status.
- Filtros basicos.

### Inteligencia Artificial

- Sugestao inicial de prioridade.
- Registro da predicao no banco.
- Explicacao simples da sugestao.
- Evolucao posterior para modelo com Scikit-learn.

### Alertas

- Alertas de ocorrencia critica.
- Alertas de concentracao em regiao de risco.
- Alertas de ocorrencias semelhantes em curto intervalo.

### Seguranca e Auditoria

- Login basico.
- Controle simples de perfil.
- Registro de logs principais.
- Uso exclusivo de dados simulados.

## 4. Funcionalidades Fora do MVP

As funcionalidades abaixo nao serao desenvolvidas na primeira versao:

- Integracao com sistemas reais da policia.
- Integracao com COPOM, SADE, PMSC Mobile ou 190.
- Uso de dados reais de vitimas, suspeitos, policiais ou atendentes.
- Aplicativo mobile nativo.
- Reconhecimento facial.
- OCR.
- Integracao com cameras.
- Integracao com telefone, radio ou WhatsApp.
- Despacho real de viaturas.
- Monitoramento em tempo real em producao.
- IA autonoma para tomada de decisao.
- Hospedagem obrigatoria em nuvem.
- Modelo preditivo definitivo.

## 5. Stack Confirmada

| Camada | Tecnologia Confirmada |
|---|---|
| Frontend | React, JavaScript, TailwindCSS, Leaflet, Chart.js |
| Backend | Laravel, PHP, APIs REST |
| IA | Python, FastAPI, Pandas, NumPy, Scikit-learn |
| Banco | PostgreSQL, PostGIS |
| Versionamento | Git, GitHub |

## 6. Banco Confirmado

Banco local:

```text
vigia_db
```

Tabelas principais:

- `roles`
- `users`
- `occurrence_types`
- `regions`
- `occurrences`
- `vehicles`
- `dispatches`
- `ai_predictions`
- `alerts`
- `audit_logs`

Scripts confirmados:

- `database/schema.sql`
- `database/seed.sql`

## 7. Dados Confirmados

O MVP usara apenas dados simulados.

Dados ja criados:

- 3 perfis de usuario.
- 1 usuario administrador.
- 8 tipos de ocorrencia.
- 8 regioes simuladas.
- 6 viaturas simuladas.
- 10 ocorrencias simuladas.
- Predicoes de IA simuladas.
- Despachos simulados.
- Alertas simulados.

## 8. Criterios Para Iniciar o Backend

O backend pode ser iniciado porque:

- O escopo do MVP esta definido.
- Os requisitos foram documentados.
- A modelagem do banco foi criada.
- O banco PostgreSQL foi configurado.
- O PostGIS esta funcionando.
- As tabelas foram criadas.
- Os dados simulados foram inseridos.
- As consultas de validacao retornaram os dados esperados.

## 9. Riscos Controlados

| Risco | Decisao |
|---|---|
| Escopo grande demais | Manter apenas funcionalidades essenciais no MVP. |
| Uso indevido de dados reais | Usar somente dados simulados. |
| IA complexa demais | Comecar com regra simples e evoluir depois. |
| Dependencia de sistema oficial | Nao integrar com sistemas reais. |
| Falta de tempo | Priorizar fluxo funcional e demonstravel. |

## 10. Decisao Final

O escopo do MVP esta aprovado para inicio do desenvolvimento do backend Laravel.

Proxima etapa:

```text
Sprint 2 - Backend Laravel
Periodo: 07/07/2026 a 20/07/2026
```

Primeira atividade tecnica da Sprint 2:

```text
Instalar e configurar o Laravel no diretorio backend.
```
