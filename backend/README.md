# Backend do VigIA

API REST do projeto, desenvolvida com Laravel. Esta parte concentra autenticação, ocorrências, viaturas, despachos, alertas e a integração com o serviço de classificação de prioridade.

## Executar localmente

```powershell
composer install
Copy-Item .env.example .env
php artisan key:generate
php artisan serve --host=127.0.0.1 --port=8000
```

Antes de iniciar, confira no `.env` as credenciais do PostgreSQL e o endereço do serviço Python.

## Testes

```powershell
php artisan test
```
