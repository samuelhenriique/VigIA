# VigIA

MVP acadêmico de apoio operacional para registro, visualização e priorização de ocorrências. O sistema reúne dashboard, viaturas, mapa, alertas e sugestões de prioridade por inteligência artificial.

> O VigIA utiliza dados simulados. A IA serve apenas como apoio e não substitui a decisão humana.

## Tecnologias

- Frontend: React, TailwindCSS, Leaflet e Chart.js.
- Backend: PHP, Laravel e API REST.
- IA: Python, FastAPI e Scikit-learn.
- Banco: PostgreSQL e PostGIS.

## Funcionalidades

- Autenticação de usuário.
- Cadastro e consulta de ocorrências e viaturas.
- Dashboard com indicadores e gráficos.
- Mapa com ocorrências, viaturas e áreas de risco.
- Sugestão de prioridade e de viatura.
- Alertas operacionais.

## Estrutura

```text
VigIA/
  ai-service/  Serviço de inteligência artificial
  backend/     API Laravel
  database/    Scripts do PostgreSQL/PostGIS
  frontend/    Interface React
```

## Requisitos

- PHP 8.4 e Composer.
- Node.js e npm.
- Python 3.12 ou superior.
- PostgreSQL com PostGIS.

## Configuração inicial

Crie o banco `vigia_db` e execute, na raiz do projeto:

```powershell
psql -U postgres -d vigia_db -f database/schema.sql
psql -U postgres -d vigia_db -f database/seed.sql
```

Configure o backend:

```powershell
cd backend
composer install
Copy-Item .env.example .env
php artisan key:generate
```

No arquivo `backend/.env`, configure:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=vigia_db
DB_USERNAME=postgres
DB_PASSWORD=sua_senha

AI_SERVICE_URL=http://127.0.0.1:8001
```

Instale o serviço de IA:

```powershell
cd ../ai-service
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

Instale o frontend:

```powershell
cd ../frontend
npm install
```

## Executando

Mantenha três terminais abertos.

Backend:

```powershell
cd backend
C:\php84\php.exe artisan serve --host=127.0.0.1 --port=8000
```

Serviço de IA:

```powershell
cd ai-service
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8001
```

Frontend:

```powershell
cd frontend
npm run dev -- --host 127.0.0.1 --port 5173
```

Acesse `http://127.0.0.1:5173`.

## Acesso de demonstração

```text
E-mail: admin@vigia.local
Senha: password
```
