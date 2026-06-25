# API Sprint 2 - Backend Laravel

## 1. Objetivo

Este documento resume os endpoints criados na Sprint 2 do projeto VigIA.

A API foi desenvolvida em Laravel, conectada ao banco PostgreSQL `vigia_db`, usando os dados simulados criados na Sprint 1.

## 2. Execucao Local

Na pasta `backend`, execute:

```powershell
php artisan serve
```

URL padrao:

```text
http://127.0.0.1:8000
```

## 3. Usuario Inicial

```text
E-mail: admin@vigia.local
Senha: password
```

## 4. Autenticacao

### Login

```http
POST /api/login
```

Body:

```json
{
  "email": "admin@vigia.local",
  "password": "password"
}
```

Resposta esperada:

```json
{
  "token": "TOKEN_GERADO",
  "token_type": "Bearer",
  "user": {}
}
```

As demais rotas devem receber o token:

```text
Authorization: Bearer TOKEN_GERADO
Accept: application/json
```

### Usuario autenticado

```http
GET /api/me
```

### Logout

```http
POST /api/logout
```

## 5. Endpoints Principais

### Ocorrencias

```http
GET    /api/occurrences
POST   /api/occurrences
GET    /api/occurrences/{id}
PUT    /api/occurrences/{id}
PATCH  /api/occurrences/{id}
DELETE /api/occurrences/{id}
```

Filtros disponiveis:

```text
status
occurrence_type_id
region_id
ai_priority
date_from
date_to
```

Exemplo:

```http
GET /api/occurrences?status=aberta
```

### Viaturas

```http
GET    /api/vehicles
POST   /api/vehicles
GET    /api/vehicles/{id}
PUT    /api/vehicles/{id}
PATCH  /api/vehicles/{id}
DELETE /api/vehicles/{id}
```

Filtros disponiveis:

```text
status
region_id
active
```

Exemplo:

```http
GET /api/vehicles?status=disponivel
```

### Regioes

```http
GET /api/regions
GET /api/regions/{id}
```

### Tipos de ocorrencia

```http
GET /api/occurrence-types
GET /api/occurrence-types/{id}
```

### Dashboard

```http
GET /api/dashboard/summary
```

Retorna:

- Total de ocorrencias.
- Ocorrencias por status.
- Ocorrencias por prioridade.
- Ocorrencias por tipo.
- Ocorrencias por regiao.
- Total de viaturas.
- Viaturas ativas.
- Viaturas por status.
- Total de alertas.
- Alertas abertos.
- Alertas por status.
- Alertas por severidade.

## 6. Validacao Executada

Smoke test executado em 25/06/2026:

```text
GET /api/dashboard/summary sem token -> 401
POST /api/login -> token Bearer gerado
GET /api/me -> usuario admin retornado
GET /api/regions -> 8 regioes
GET /api/occurrence-types -> 8 tipos
GET /api/occurrences -> 10 ocorrencias
GET /api/occurrences?status=aberta -> 6 ocorrencias
GET /api/vehicles -> 6 viaturas
GET /api/vehicles?status=disponivel -> 4 viaturas
GET /api/dashboard/summary -> totais corretos
POST /api/occurrences com dados invalidos -> 422
CRUD temporario de ocorrencia -> criado, atualizado e removido
CRUD temporario de viatura -> criado, atualizado e removido
POST /api/logout -> token removido
GET /api/me apos logout -> 401
```

Totais confirmados no dashboard:

```text
Ocorrencias: 10
Viaturas: 6
Alertas: 3
```

## 7. Observacoes

- As rotas principais estao protegidas com Laravel Sanctum.
- O campo geografico `geom` e atualizado automaticamente no cadastro e edicao de ocorrencias e viaturas.
- O banco usa apenas dados simulados.
- O delete pode retornar `409 Conflict` se houver registros vinculados por chave estrangeira.
