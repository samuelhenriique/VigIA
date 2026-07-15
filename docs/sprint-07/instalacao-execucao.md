# Instalacao e Execucao Local

## 1. Objetivo

Este documento orienta a execucao local do MVP VigIA para revisao final e apresentacao academica.

O projeto possui tres servicos principais:

- Backend Laravel em `backend`.
- Frontend React em `frontend`.
- Microservico FastAPI em `ai-service`.

## 2. Requisitos Locais

Ferramentas necessarias:

| Ferramenta | Uso |
|---|---|
| PHP 8.3 ou superior | Executar o backend Laravel. |
| Composer | Instalar dependencias PHP. |
| Node.js e npm | Executar e compilar o frontend React. |
| Python | Executar o microservico FastAPI. |
| PostgreSQL | Banco de dados principal. |
| PostGIS | Recursos geograficos do banco. |
| Git | Versionamento do projeto. |

## 3. Banco de Dados

Banco recomendado:

```text
vigia_db
```

O banco deve ter a extensao PostGIS habilitada.

Scripts principais:

```text
database/schema.sql
database/seed.sql
```

Ordem recomendada:

1. Criar o banco `vigia_db` no PostgreSQL.
2. Executar `database/schema.sql`.
3. Executar `database/seed.sql`.

Exemplo com `psql`:

```powershell
psql -U postgres -d vigia_db -f database/schema.sql
psql -U postgres -d vigia_db -f database/seed.sql
```

## 4. Backend Laravel

Acesse o diretorio:

```powershell
cd backend
```

Instale as dependencias:

```powershell
composer install
```

Crie o arquivo `.env` a partir do exemplo:

```powershell
copy .env.example .env
```

Configure o banco:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=vigia_db
DB_USERNAME=postgres
DB_PASSWORD=sua_senha_do_postgres
```

Configure a URL do microservico de IA:

```env
AI_SERVICE_URL=http://127.0.0.1:8001
```

Gere a chave da aplicacao:

```powershell
php artisan key:generate
```

Execute o backend:

```powershell
php artisan serve
```

URL local:

```text
http://127.0.0.1:8000
```

## 5. Microservico FastAPI

Acesse o diretorio:

```powershell
cd ai-service
```

Crie o ambiente virtual:

```powershell
python -m venv .venv
```

Ative o ambiente:

```powershell
.\.venv\Scripts\Activate.ps1
```

Se o PowerShell bloquear a ativacao:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
```

Instale as dependencias:

```powershell
pip install -r requirements.txt
```

Execute o servico:

```powershell
uvicorn app.main:app --reload --port 8001
```

URLs locais:

```text
FastAPI: http://127.0.0.1:8001
FastAPI docs: http://127.0.0.1:8001/docs
```

## 6. Frontend React

Acesse o diretorio:

```powershell
cd frontend
```

Instale as dependencias:

```powershell
npm install
```

Execute o frontend:

```powershell
npm run dev
```

URL local padrao:

```text
http://127.0.0.1:5173
```

O cliente Axios do frontend esta configurado para consumir:

```text
http://127.0.0.1:8000/api
```

## 7. Credenciais de Teste

Usuario administrador simulado:

```text
E-mail: admin@vigia.local
Senha: password
```

## 8. Validacao Rapida

Com os tres servicos em execucao:

1. Acesse `http://127.0.0.1:5173`.
2. Faca login com o usuario administrador.
3. Verifique se o dashboard carrega.
4. Acesse ocorrencias, viaturas, mapa e alertas.
5. Execute uma sugestao de prioridade por IA.
6. Execute uma sugestao de viatura no mapa.

## 9. Build do Frontend

Para validar a compilacao final:

```powershell
cd frontend
npm run build
```

O build deve finalizar sem erro bloqueante.
