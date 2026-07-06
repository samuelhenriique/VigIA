# Sprint 03 - Frontend React

## 1. Objetivo

Esta sprint teve como objetivo criar a primeira versao funcional do frontend do VigIA em React, com telas internas protegidas por autenticacao e integracao com a API Laravel criada na Sprint 02.

O foco foi permitir que o usuario acessasse o sistema, navegasse pelo painel operacional e visualizasse dados reais vindos do backend.

## 2. Escopo Entregue

Foram entregues:

- Projeto React criado no diretorio `frontend`.
- Configuracao com Vite.
- Configuracao visual com TailwindCSS.
- Cliente HTTP com Axios.
- Rotas com React Router.
- Tela de login.
- Armazenamento do token Bearer no `localStorage`.
- Envio automatico do token nas requisicoes protegidas.
- Rota protegida com `PrivateRoute`.
- Layout principal com menu interno.
- Logout integrado com a API.
- Dashboard integrado ao endpoint do Laravel.
- Listagem de ocorrencias.
- Listagem de viaturas.

## 3. Tecnologias Usadas

| Tecnologia | Uso |
|---|---|
| React | Criacao da interface. |
| Vite | Ambiente de desenvolvimento e build. |
| TailwindCSS | Estilizacao das telas. |
| Axios | Comunicacao com a API Laravel. |
| React Router | Navegacao entre telas. |
| Lucide React | Biblioteca de icones disponivel no projeto. |

## 4. Estrutura Principal

Arquivos principais da Sprint 03:

```text
frontend/
  src/
    api/
      client.js
    layouts/
      AppLayout.jsx
    pages/
      Login.jsx
      Dashboard.jsx
      Ocorrencias.jsx
      Viaturas.jsx
    routes/
      PrivateRoute.jsx
    App.jsx
    main.jsx
```

## 5. Cliente Axios

Arquivo:

```text
frontend/src/api/client.js
```

Responsabilidade:

- Definir a URL base da API Laravel.
- Ler o token salvo no `localStorage`.
- Enviar automaticamente o header `Authorization`.

URL base configurada:

```text
http://127.0.0.1:8000/api
```

Header enviado quando ha token:

```text
Authorization: Bearer TOKEN
```

## 6. Autenticacao

Tela:

```text
frontend/src/pages/Login.jsx
```

Endpoint usado:

```http
POST /api/login
```

Fluxo:

1. Usuario informa e-mail e senha.
2. Frontend envia os dados para `/api/login`.
3. Laravel retorna token, tipo do token e usuario.
4. Frontend salva os dados no `localStorage`.
5. Usuario e redirecionado para `/dashboard`.

Dados salvos localmente:

```text
token
token_type
user
```

Usuario usado nos testes:

```text
E-mail: admin@vigia.local
Senha: password
```

## 7. Rotas

Arquivo:

```text
frontend/src/App.jsx
```

Rotas criadas:

| Rota | Tela | Protegida |
|---|---|---|
| `/` | Redireciona para `/login` | Nao |
| `/login` | Login | Nao |
| `/dashboard` | Dashboard | Sim |
| `/ocorrencias` | Listagem de ocorrencias | Sim |
| `/viaturas` | Listagem de viaturas | Sim |

Observacao:

A rota `/mapa` foi adicionada posteriormente na Sprint 04.

## 8. Rota Protegida

Arquivo:

```text
frontend/src/routes/PrivateRoute.jsx
```

Responsabilidade:

- Verificar se existe token no `localStorage`.
- Permitir acesso as telas internas quando ha token.
- Redirecionar para `/login` quando nao ha token.

## 9. Layout Interno

Arquivo:

```text
frontend/src/layouts/AppLayout.jsx
```

O layout inclui:

- Nome do sistema.
- Menu para telas internas.
- Botao de logout.
- Area central para renderizar a tela atual.

Na Sprint 03, o menu principal tinha:

```text
Dashboard
Ocorrencias
Viaturas
Sair
```

A opcao `Mapa` foi adicionada na Sprint 04.

## 10. Dashboard

Tela:

```text
frontend/src/pages/Dashboard.jsx
```

Endpoint usado:

```http
GET /api/dashboard/summary
```

Dados exibidos:

- Total de ocorrencias.
- Total de viaturas.
- Quantidade de viaturas ativas.
- Total de alertas.
- Quantidade de alertas abertos.

## 11. Listagem de Ocorrencias

Tela:

```text
frontend/src/pages/Ocorrencias.jsx
```

Endpoint usado:

```http
GET /api/occurrences
```

Dados exibidos:

- ID.
- Status.
- Prioridade sugerida pela IA.
- Descricao.

## 12. Listagem de Viaturas

Tela:

```text
frontend/src/pages/Viaturas.jsx
```

Endpoint usado:

```http
GET /api/vehicles
```

Dados exibidos:

- ID.
- Codigo.
- Status.
- Indicacao se a viatura esta ativa.

## 13. Logout

Endpoint usado:

```http
POST /api/logout
```

Fluxo:

1. Frontend chama o endpoint `/api/logout`.
2. Remove `token`, `token_type` e `user` do `localStorage`.
3. Redireciona o usuario para `/login`.

Mesmo se a chamada ao backend falhar, o frontend limpa a sessao local.

## 14. Execucao Local

Na pasta `frontend`, execute:

```powershell
npm install
npm run dev
```

URL local padrao:

```text
http://127.0.0.1:5173
```

Para gerar build:

```powershell
npm run build
```

## 15. Criterios de Aceite Validados

A Sprint 03 foi considerada concluida porque:

- O frontend executa localmente com Vite.
- O login autentica com a API Laravel.
- O token e salvo no `localStorage`.
- As rotas internas ficam protegidas.
- O usuario autenticado acessa o dashboard.
- O dashboard consome dados reais da API.
- A tela de ocorrencias consome `GET /api/occurrences`.
- A tela de viaturas consome `GET /api/vehicles`.
- O logout limpa a sessao local e retorna para `/login`.
- O build do frontend foi validado com `npm run build`.

## 16. Observacoes

- O frontend depende do backend Laravel rodando em `http://127.0.0.1:8000`.
- As rotas protegidas dependem do token Bearer retornado pelo login.
- Os dados exibidos sao simulados, vindos do banco `vigia_db`.
- O cadastro e edicao pelas telas ainda nao foram o foco desta sprint.
