# Sprint 04 - Mapa e Geolocalizacao

## 1. Objetivo

Esta sprint teve como objetivo adicionar uma tela de mapa operacional ao VigIA, exibindo ocorrencias e viaturas com base em latitude e longitude, alem de permitir filtros e sugestao da viatura disponivel mais proxima.

O foco foi transformar os dados ja existentes no backend em uma visualizacao geografica simples e util para o MVP.

## 2. Escopo Entregue

Foram entregues:

- Integracao do Leaflet e React Leaflet ao frontend.
- Criacao da rota protegida `/mapa`.
- Criacao da tela `Mapa.jsx`.
- Exibicao de ocorrencias no mapa.
- Exibicao de viaturas no mapa.
- Cores diferentes por prioridade da ocorrencia.
- Cores diferentes por status da viatura.
- Filtros por status, prioridade, tipo e regiao.
- Filtro por status da viatura.
- Endpoint para listar viaturas disponiveis.
- Endpoint para sugerir viatura para uma ocorrencia.
- Calculo inicial de distancia entre ocorrencia e viatura.
- Painel de sugestao de viatura no frontend.

## 3. Tecnologias Usadas

| Tecnologia | Uso |
|---|---|
| Leaflet | Renderizacao do mapa. |
| React Leaflet | Integracao do Leaflet com React. |
| OpenStreetMap | Camada visual do mapa. |
| Axios | Consumo dos endpoints Laravel. |
| Laravel | Endpoints de ocorrencias, viaturas e sugestao. |
| PostgreSQL/PostGIS | Armazenamento de coordenadas e campos geograficos. |

## 4. Arquivos Principais

Frontend:

```text
frontend/src/pages/Mapa.jsx
frontend/src/App.jsx
frontend/src/layouts/AppLayout.jsx
frontend/package.json
```

Backend:

```text
backend/routes/api.php
backend/app/Http/Controllers/Api/OccurrenceController.php
backend/app/Http/Controllers/Api/VehicleController.php
```

Banco:

```text
database/schema.sql
```

## 5. Rota do Frontend

Rota criada:

```text
/mapa
```

Arquivo:

```text
frontend/src/App.jsx
```

A rota fica dentro de `PrivateRoute`, portanto so pode ser acessada por usuario autenticado.

## 6. Navegacao

Arquivo:

```text
frontend/src/layouts/AppLayout.jsx
```

Foi adicionada a opcao:

```text
Mapa
```

Essa opcao leva o usuario para:

```text
/mapa
```

## 7. Dados Carregados no Mapa

Tela:

```text
frontend/src/pages/Mapa.jsx
```

Ao abrir a tela, o frontend busca:

```http
GET /api/occurrences
GET /api/vehicles
GET /api/regions
GET /api/occurrence-types
```

Esses dados alimentam:

- Marcadores de ocorrencias.
- Marcadores de viaturas.
- Opcoes dos filtros de regiao.
- Opcoes dos filtros de tipo de ocorrencia.

## 8. Marcadores de Ocorrencias

As ocorrencias sao exibidas no mapa quando possuem:

```text
latitude
longitude
```

Cada ocorrencia aparece como `CircleMarker`.

Cores por prioridade:

| Prioridade | Cor |
|---|---|
| `baixa` | Verde |
| `media` | Amarelo |
| `alta` | Laranja |
| `critica` | Vermelho |
| Nao definida | Azul |

O popup da ocorrencia exibe:

- Codigo e titulo.
- Status.
- Prioridade.
- Tipo.
- Regiao.
- Botao para sugerir viatura.

## 9. Marcadores de Viaturas

As viaturas sao exibidas no mapa quando possuem:

```text
latitude
longitude
```

Cada viatura aparece como `CircleMarker`.

Cores por status:

| Status | Cor |
|---|---|
| `disponivel` | Verde |
| `em_atendimento` | Azul |
| `indisponivel` | Cinza |
| `manutencao` | Roxo |

O popup da viatura exibe:

- Codigo.
- Equipe.
- Status.
- Tipo de patrulhamento.
- Regiao.

## 10. Filtros do Mapa

Filtros de ocorrencias:

- Status da ocorrencia.
- Prioridade.
- Tipo da ocorrencia.
- Regiao.

Filtros de viaturas:

- Status da viatura.
- Regiao.

Tambem foi criado o botao:

```text
Limpar filtros
```

Esse botao limpa todos os filtros e volta a exibir todos os marcadores.

## 11. Endpoint de Viaturas Disponiveis

Endpoint criado:

```http
GET /api/vehicles/available
```

Controller:

```text
backend/app/Http/Controllers/Api/VehicleController.php
```

Regra:

Retorna apenas viaturas com:

```text
status = disponivel
active = true
```

## 12. Endpoint de Sugestao de Viatura

Endpoint criado:

```http
GET /api/occurrences/{id}/suggest-vehicle
```

Controller:

```text
backend/app/Http/Controllers/Api/OccurrenceController.php
```

Regra:

1. Localiza a ocorrencia pelo ID.
2. Busca viaturas ativas e disponiveis.
3. Calcula a distancia entre a ocorrencia e cada viatura.
4. Ordena pela menor distancia.
5. Retorna a viatura mais proxima.

Resposta esperada:

```json
{
  "occurrence": {},
  "suggested_vehicle": {},
  "criteria": "Viatura ativa, disponivel e mais proxima da ocorrencia."
}
```

Quando nao ha viatura disponivel, retorna `404` com `suggested_vehicle` igual a `null`.

## 13. Calculo de Distancia

O calculo inicial foi implementado no backend com base nas coordenadas:

```text
latitude da ocorrencia
longitude da ocorrencia
latitude da viatura
longitude da viatura
```

A formula usa o raio da Terra em quilometros:

```text
6371 km
```

O resultado e salvo temporariamente no objeto da viatura retornada como:

```text
distance_km
estimated_arrival_minutes
```

A chegada estimada considera uma velocidade media simulada de:

```text
40 km/h
```

## 14. Painel de Sugestao no Frontend

Quando o usuario clica em:

```text
Sugerir viatura
```

O frontend chama:

```http
GET /api/occurrences/{id}/suggest-vehicle
```

Se houver sugestao, a interface exibe:

- Codigo da viatura.
- Equipe.
- Distancia em quilometros.
- Chegada estimada em minutos.
- Criterio usado na sugestao.

## 15. Relacao com o Banco

As tabelas usadas possuem campos:

```text
latitude
longitude
geom
```

Tabelas principais:

- `occurrences`
- `vehicles`

Ao criar ou atualizar ocorrencias e viaturas, o backend atualiza o campo `geom` com PostGIS.

## 16. Execucao Local

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

URLs locais:

```text
Backend: http://127.0.0.1:8000
Frontend: http://127.0.0.1:5173
```

## 17. Criterios de Aceite Validados

A Sprint 04 foi considerada concluida porque:

- A rota `/mapa` esta disponivel apenas para usuarios autenticados.
- O mapa exibe ocorrencias com coordenadas.
- O mapa exibe viaturas com coordenadas.
- Os filtros alteram os marcadores exibidos.
- O endpoint `GET /api/vehicles/available` retorna somente viaturas ativas e disponiveis.
- O endpoint `GET /api/occurrences/{id}/suggest-vehicle` retorna a viatura disponivel mais proxima.
- A sugestao de viatura aparece na tela do mapa.
- O build do frontend foi validado com `npm run build`.
- O fluxo de mapa, filtros e sugestao foi validado manualmente.

## 18. Observacoes

- A sugestao de viatura ainda e uma regra simples baseada em disponibilidade e distancia.
- O sistema nao realiza despacho real de viatura.
- Os dados usados sao simulados.
- O mapa usa OpenStreetMap como camada visual.
- A evolucao futura pode incluir areas de risco e indicadores graficos na Sprint 06.
