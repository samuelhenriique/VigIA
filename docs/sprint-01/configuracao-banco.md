# Configuracao do Banco de Dados - VigIA

## 1. Objetivo

Este documento explica como configurar o banco de dados local do projeto VigIA usando PostgreSQL, PostGIS e pgAdmin.

O banco sera usado para armazenar os dados simulados do MVP, incluindo ocorrencias, viaturas, regioes, predicoes de IA, alertas e logs.

## 2. Requisitos

Antes de iniciar, e necessario ter instalado:

- PostgreSQL.
- pgAdmin 4.
- PostGIS.

Durante a instalacao do PostgreSQL, anote a senha do usuario `postgres`, pois ela sera usada no pgAdmin.

## 3. Criar o Banco no pgAdmin

1. Abra o pgAdmin.
2. Acesse o servidor PostgreSQL local.
3. Clique com o botao direito em `Databases`.
4. Selecione `Create > Database`.
5. Preencha:

```text
Database: vigia_db
Owner: postgres
```

6. Clique em `Save`.

## 4. Ativar o PostGIS

Clique no banco `vigia_db` e abra:

```text
Tools > Query Tool
```

Execute:

```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

Depois teste:

```sql
SELECT PostGIS_Version();
```

Resultado esperado:

```text
3.6 USE_GEOS=1 USE_PROJ=1 USE_STATS=1
```

A versao pode variar, mas o importante e o comando retornar uma versao do PostGIS.

## 5. Criar as Tabelas

No pgAdmin, com o banco `vigia_db` selecionado:

1. Abra `Tools > Query Tool`.
2. Clique no icone de abrir arquivo.
3. Selecione:

```text
C:\Users\gugag\OneDrive\Area de Trabalho\VigIA\database\schema.sql
```

Observacao: no Windows, o nome real da pasta pode aparecer como `Area de Trabalho` ou com acento, dependendo da exibicao do sistema.

4. Execute o script completo.

O arquivo `schema.sql` cria:

- Extensao PostGIS, caso ainda nao exista.
- Tabelas do sistema.
- Chaves estrangeiras.
- Restricoes basicas.
- Indices comuns.
- Indices espaciais.

## 6. Validar as Tabelas Criadas

Execute:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

Tabelas esperadas do VigIA:

```text
ai_predictions
alerts
audit_logs
dispatches
occurrence_types
occurrences
regions
roles
users
vehicles
```

Tambem podem aparecer tabelas ou views do PostGIS:

```text
geography_columns
geometry_columns
spatial_ref_sys
```

Isso e normal.

## 7. Inserir Dados Simulados

No pgAdmin, com o banco `vigia_db` selecionado:

1. Abra `Tools > Query Tool`.
2. Clique no icone de abrir arquivo.
3. Selecione:

```text
C:\Users\gugag\OneDrive\Area de Trabalho\VigIA\database\seed.sql
```

4. Execute o script completo.

O arquivo `seed.sql` insere:

- Perfis de acesso.
- Usuario inicial.
- Tipos de ocorrencia.
- Regioes simuladas.
- Viaturas simuladas.
- Ocorrencias simuladas.
- Predicoes de IA simuladas.
- Despachos simulados.
- Alertas simulados.
- Log inicial.

## 8. Usuario Inicial

O seed cria um usuario inicial para testes futuros no Laravel:

```text
E-mail: admin@vigia.local
Senha prevista: password
Perfil: administrador
```

A senha esta salva no banco como hash compativel com Laravel.

## 9. Validar os Dados Inseridos

Quantidade de ocorrencias:

```sql
SELECT COUNT(*) FROM occurrences;
```

Resultado esperado:

```text
10
```

Listar ocorrencias:

```sql
SELECT code, title, status, ai_priority
FROM occurrences
ORDER BY code;
```

Listar viaturas:

```sql
SELECT code, team_name, status
FROM vehicles
ORDER BY code;
```

Listar alertas:

```sql
SELECT title, severity, status
FROM alerts
ORDER BY created_at;
```

## 10. Consultas Uteis com PostGIS

Calcular distancia entre uma ocorrencia e uma viatura:

```sql
SELECT
    o.code AS ocorrencia,
    v.code AS viatura,
    ROUND((ST_Distance(o.geom, v.geom) / 1000)::numeric, 2) AS distancia_km
FROM occurrences o
CROSS JOIN vehicles v
WHERE o.code = 'OCR-2026-0001'
  AND v.status = 'disponivel'
ORDER BY distancia_km
LIMIT 3;
```

Buscar ocorrencias por regiao:

```sql
SELECT o.code, o.title, r.name AS regiao, o.ai_priority
FROM occurrences o
JOIN regions r ON r.id = o.region_id
ORDER BY r.name, o.code;
```

## 11. Cuidados

- Nao inserir dados reais de pessoas.
- Nao inserir CPF, telefone, placa real, endereco completo ou nomes reais de envolvidos.
- Manter os dados do MVP como simulados.
- Usar o banco local apenas para desenvolvimento academico.

## 12. Problemas Comuns

### Erro: extension "postgis" is not available

Significa que o PostGIS nao esta instalado no PostgreSQL.

Solucao:

1. Abra o Stack Builder.
2. Selecione a instalacao do PostgreSQL.
3. Instale `PostGIS Bundle`.
4. Volte ao pgAdmin e execute:

```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

### Erro: function postgis_version() does not exist

Normalmente significa que a extensao ainda nao foi ativada no banco atual.

Solucao:

1. Verifique se o Query Tool esta aberto no banco `vigia_db`.
2. Execute:

```sql
CREATE EXTENSION IF NOT EXISTS postgis;
SELECT PostGIS_Version();
```

### Erro: relation already exists

Significa que as tabelas ja foram criadas.

Se os dados estao funcionando, nao precisa executar o `schema.sql` novamente.

## 13. Arquivos Relacionados

- `database/schema.sql`
- `database/seed.sql`
- `docs/sprint-01/modelagem-banco.md`
- `docs/sprint-01/requisitos.md`
