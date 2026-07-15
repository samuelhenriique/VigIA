# Banco de Dados

## 1. Objetivo

Este documento resume a estrutura do banco de dados do MVP VigIA para a entrega final academica.

O banco usa PostgreSQL com PostGIS e dados simulados.

## 2. Banco Utilizado

Nome recomendado:

```text
vigia_db
```

Extensao necessaria:

```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

## 3. Scripts Principais

| Arquivo | Finalidade |
|---|---|
| `database/schema.sql` | Cria extensao, tabelas, chaves, restricoes e indices. |
| `database/seed.sql` | Insere dados simulados para testes e demonstracao. |

Ordem de execucao:

```powershell
psql -U postgres -d vigia_db -f database/schema.sql
psql -U postgres -d vigia_db -f database/seed.sql
```

## 4. Tabelas Principais

| Tabela | Finalidade |
|---|---|
| `roles` | Perfis de usuario. |
| `users` | Usuarios do sistema. |
| `occurrence_types` | Tipos de ocorrencia. |
| `regions` | Regioes operacionais com nivel de risco simulado. |
| `occurrences` | Ocorrencias simuladas. |
| `vehicles` | Viaturas simuladas. |
| `dispatches` | Vinculos entre ocorrencias e viaturas. |
| `ai_predictions` | Registros das sugestoes de prioridade da IA. |
| `alerts` | Alertas operacionais gerados por regras. |
| `audit_logs` | Registros simulados de auditoria. |

## 5. Campos Geograficos

As tabelas `regions`, `occurrences` e `vehicles` usam campos geograficos para apoiar mapa, distancia e visualizacao operacional.

Exemplos de dados usados:

| Campo | Uso |
|---|---|
| `latitude` | Coordenada textual/numerica para exibicao. |
| `longitude` | Coordenada textual/numerica para exibicao. |
| `geom` | Campo geografico PostGIS. |
| `center_latitude` | Centro simulado da regiao. |
| `center_longitude` | Centro simulado da regiao. |
| `risk_level` | Nivel de risco simulado de 1 a 5. |

## 6. Dados Simulados

O arquivo `database/seed.sql` cria dados ficticios para:

- Perfis.
- Usuario administrador.
- Tipos de ocorrencia.
- Regioes.
- Viaturas.
- Ocorrencias.
- Predicoes de IA.
- Despachos.
- Alertas.
- Auditoria.

Credencial inicial:

```text
E-mail: admin@vigia.local
Senha: password
```

## 7. Consultas de Validacao

Validar ocorrencias:

```sql
SELECT id, code, title, status, ai_priority
FROM occurrences
ORDER BY id;
```

Validar viaturas disponiveis:

```sql
SELECT id, code, team_name, status, active
FROM vehicles
WHERE status = 'disponivel' AND active = true;
```

Validar regioes e risco:

```sql
SELECT id, name, city, state, risk_level
FROM regions
ORDER BY risk_level DESC;
```

Validar predicoes:

```sql
SELECT occurrence_id, model_name, predicted_priority, risk_score, confidence_score
FROM ai_predictions
ORDER BY id;
```

Validar alertas:

```sql
SELECT id, type, title, severity, status, generated_by
FROM alerts
ORDER BY id;
```

## 8. Cuidados

- Os dados sao ficticios e usados apenas para demonstracao academica.
- O sistema nao deve receber dados reais de pessoas, vitimas, suspeitos ou operadores.
- Coordenadas foram usadas apenas para simular comportamento geografico.
- `risk_level` e um indicador didatico, nao uma metrica real de risco urbano.
