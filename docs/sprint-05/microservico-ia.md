# Sprint 05 - Microservico de IA

## 1. Objetivo

Este documento define o escopo tecnico da Sprint 05 do projeto VigIA.

A Sprint 05 tem como objetivo criar um microservico em Python com FastAPI para sugerir a prioridade de ocorrencias policiais simuladas. O servico deve atuar como apoio operacional, recebendo dados de uma ocorrencia, aplicando uma regra inicial de classificacao e retornando uma sugestao de prioridade para o backend Laravel.

Nesta sprint, a prioridade continua sendo uma sugestao. A decisao final permanece humana e pode ser confirmada ou ajustada pelo operador do sistema.

## 2. Contexto no MVP

O VigIA ja possui:

- Backend Laravel com API REST.
- Frontend React integrado ao backend.
- Banco PostgreSQL com PostGIS.
- Cadastro e listagem de ocorrencias.
- Cadastro e listagem de viaturas.
- Mapa operacional com ocorrencias e viaturas.
- Sugestao de viatura disponivel mais proxima.
- Campos `occurrences.ai_priority` e tabela `ai_predictions` preparados para registrar predicoes.

A Sprint 05 adiciona o primeiro modulo real de IA do MVP, iniciando por regras simples e preparando a evolucao para um modelo com Scikit-learn.

## 3. Responsabilidade do ai-service

O `ai-service` sera um microservico separado do Laravel.

Ele deve fazer:

- Receber dados de uma ocorrencia enviada pelo backend Laravel.
- Analisar tipo, regiao, descricao e gravidade informada.
- Aplicar regras iniciais de classificacao.
- Retornar uma prioridade sugerida.
- Retornar uma pontuacao de risco.
- Retornar uma confianca estimada.
- Retornar uma explicacao simples da sugestao.
- Identificar o nome e a versao do modelo usado.

Ele nao deve fazer nesta primeira versao:

- Cadastrar ocorrencias.
- Alterar ocorrencias diretamente no banco.
- Autenticar usuarios.
- Substituir a API Laravel.
- Tomar decisoes finais de despacho.
- Usar dados reais de pessoas, vitimas, suspeitos ou operadores.

## 4. Arquitetura Prevista

Fluxo previsto:

```text
Frontend React
    |
    v
Backend Laravel
    |
    v
ai-service FastAPI
    |
    v
Resposta com prioridade sugerida
    |
    v
Backend Laravel registra em occurrences.ai_priority e ai_predictions
```

O Laravel continua sendo a API principal do sistema. O FastAPI atua apenas como servico auxiliar de predicao.

## 5. Estrutura Planejada

Estrutura prevista para o microservico:

```text
ai-service/
  app/
    main.py
    schemas.py
    services/
      priority_predictor.py
  requirements.txt
  README.md
```

Responsabilidades dos arquivos:

| Arquivo | Responsabilidade |
|---|---|
| `app/main.py` | Criar a aplicacao FastAPI e expor os endpoints. |
| `app/schemas.py` | Definir os schemas de entrada e saida com Pydantic. |
| `app/services/priority_predictor.py` | Concentrar a regra de classificacao de prioridade. |
| `requirements.txt` | Listar dependencias Python do servico. |
| `README.md` | Documentar instalacao, execucao local e exemplos de uso. |

## 6. Endpoint Inicial

Endpoint inicial do microservico:

```http
POST /predict-priority
```

Finalidade:

```text
Receber dados de uma ocorrencia e retornar uma prioridade sugerida.
```

Este endpoint sera consumido futuramente pelo Laravel.

## 7. Entrada Esperada

Payload recomendado:

```json
{
  "occurrence_id": 1,
  "tipo_ocorrencia": "Roubo",
  "regiao": "Centro",
  "descricao": "Individuo armado realizando roubo em andamento",
  "informed_severity": 4,
  "region_risk_level": 5,
  "latitude": -26.3044,
  "longitude": -48.8487
}
```

Campos:

| Campo | Obrigatorio | Descricao |
|---|---|---|
| `occurrence_id` | Nao | ID da ocorrencia no Laravel, quando ja existir no banco. |
| `tipo_ocorrencia` | Sim | Nome do tipo da ocorrencia. Ex.: roubo, furto, agressao. |
| `regiao` | Sim | Nome da regiao operacional ou bairro. |
| `descricao` | Sim | Texto resumido da ocorrencia simulada. |
| `informed_severity` | Nao | Gravidade informada de 1 a 5, quando disponivel. |
| `region_risk_level` | Nao | Nivel de risco da regiao de 1 a 5, quando disponivel. |
| `latitude` | Nao | Latitude da ocorrencia. |
| `longitude` | Nao | Longitude da ocorrencia. |

Observacoes:

- Os campos devem usar apenas dados simulados.
- A descricao nao deve conter nomes reais, CPF, telefone, placa real ou endereco completo.
- A classificacao inicial deve funcionar mesmo sem latitude e longitude.

## 8. Resposta Esperada

Resposta recomendada:

```json
{
  "predicted_priority": "critica",
  "risk_score": 90,
  "confidence_score": 90,
  "model_name": "rules-v1",
  "explanation": "Prioridade critica sugerida porque a descricao indica uso de arma.",
  "input_summary": {
    "tipo_ocorrencia": "Roubo",
    "regiao": "Centro",
    "matched_terms": ["armado", "roubo"]
  }
}
```

Campos:

| Campo | Descricao |
|---|---|
| `predicted_priority` | Prioridade sugerida: `baixa`, `media`, `alta` ou `critica`. |
| `risk_score` | Pontuacao de risco de 0 a 100. |
| `confidence_score` | Confianca estimada de 0 a 100. |
| `model_name` | Nome e versao do modelo ou regra usada. |
| `explanation` | Explicacao simples da sugestao. |
| `input_summary` | Resumo dos dados e termos usados na analise. |

## 9. Prioridades Permitidas

As prioridades devem seguir os valores ja aceitos pelo banco:

```text
baixa
media
alta
critica
```

Esses valores sao compativeis com:

- `occurrences.ai_priority`
- `occurrences.human_priority`
- `ai_predictions.predicted_priority`

## 10. Regra Inicial de Classificacao

A primeira versao do modelo sera baseada em regras.

### Prioridade critica

Retornar `critica` quando o tipo ou a descricao indicar risco extremo, como:

- arma
- armado
- disparo
- tiro
- baleado
- ferido
- morte
- homicidio
- sequestro
- refem
- risco de morte

Pontuacao sugerida:

```text
risk_score: 90
confidence_score: 90
```

### Prioridade alta

Retornar `alta` quando o tipo ou a descricao indicar risco relevante e necessidade de resposta rapida, como:

- roubo
- agressao
- ameaca
- violencia domestica
- invasao
- furto em andamento

Pontuacao sugerida:

```text
risk_score: 75
confidence_score: 80
```

### Prioridade media

Retornar `media` quando o tipo ou a descricao indicar ocorrencia sem risco extremo imediato, mas com necessidade de acompanhamento, como:

- furto
- suspeita
- perturbacao
- dano
- vandalismo
- acidente sem vitima

Pontuacao sugerida:

```text
risk_score: 55
confidence_score: 65
```

### Prioridade baixa

Retornar `baixa` quando nenhum criterio anterior for identificado ou quando a descricao indicar baixa urgencia operacional, como:

- apoio
- denuncia generica
- orientacao
- solicitacao sem risco imediato

Pontuacao sugerida:

```text
risk_score: 30
confidence_score: 50
```

## 11. Criterios de Desempate

Quando mais de uma regra for encontrada:

1. A maior prioridade deve prevalecer.
2. Termos de prioridade `critica` devem sempre superar termos de prioridade menor.
3. `informed_severity` igual a 5 pode elevar a classificacao para `critica`.
4. `informed_severity` igual a 4 pode elevar a classificacao para `alta`.
5. `region_risk_level` alto pode aumentar o `risk_score`, mas nao deve decidir sozinho uma prioridade critica.

## 12. Integracao com Laravel

Fluxo de integracao previsto:

1. Laravel recebe ou consulta uma ocorrencia.
2. Laravel monta o payload com tipo, regiao, descricao, gravidade e risco da regiao.
3. Laravel envia o payload para `POST /predict-priority`.
4. FastAPI retorna a prioridade sugerida.
5. Laravel salva a prioridade em `occurrences.ai_priority`.
6. Laravel registra a resposta completa em `ai_predictions`.
7. Frontend exibe a prioridade sugerida na listagem, dashboard e mapa.

Mapeamento para o banco:

| Resposta FastAPI | Campo no banco |
|---|---|
| `predicted_priority` | `ai_predictions.predicted_priority` e `occurrences.ai_priority` |
| `risk_score` | `ai_predictions.risk_score` |
| `confidence_score` | `ai_predictions.confidence_score` |
| `model_name` | `ai_predictions.model_name` |
| `input_summary` | `ai_predictions.input_summary` |
| `explanation` | `ai_predictions.explanation` |

## 13. Validacoes Esperadas

O FastAPI deve validar:

- `tipo_ocorrencia` obrigatorio.
- `regiao` obrigatoria.
- `descricao` obrigatoria.
- `informed_severity`, quando enviado, deve estar entre 1 e 5.
- `region_risk_level`, quando enviado, deve estar entre 1 e 5.
- `latitude`, quando enviada, deve estar entre -90 e 90.
- `longitude`, quando enviada, deve estar entre -180 e 180.

Erros de validacao devem retornar status HTTP `422`.

## 14. Exemplos de Uso

### Exemplo critico

Entrada:

```json
{
  "tipo_ocorrencia": "Roubo",
  "regiao": "Centro",
  "descricao": "Individuo armado realizando roubo em andamento",
  "informed_severity": 4
}
```

Saida esperada:

```json
{
  "predicted_priority": "critica",
  "risk_score": 90,
  "confidence_score": 90,
  "model_name": "rules-v1",
  "explanation": "Prioridade critica sugerida porque a descricao indica uso de arma.",
  "input_summary": {
    "tipo_ocorrencia": "Roubo",
    "regiao": "Centro",
    "matched_terms": ["armado", "roubo"]
  }
}
```

### Exemplo medio

Entrada:

```json
{
  "tipo_ocorrencia": "Perturbacao",
  "regiao": "America",
  "descricao": "Som alto recorrente durante a madrugada",
  "informed_severity": 2
}
```

Saida esperada:

```json
{
  "predicted_priority": "media",
  "risk_score": 55,
  "confidence_score": 65,
  "model_name": "rules-v1",
  "explanation": "Prioridade media sugerida por se tratar de ocorrencia sem indicio de risco extremo imediato.",
  "input_summary": {
    "tipo_ocorrencia": "Perturbacao",
    "regiao": "America",
    "matched_terms": ["perturbacao"]
  }
}
```

## 15. Dependencias Previstas

Dependencias iniciais:

```text
fastapi
uvicorn
pydantic
```

Dependencias previstas para evolucao com modelo simples:

```text
pandas
numpy
scikit-learn
joblib
```

Na primeira entrega funcional, Scikit-learn pode ser preparado, mas o modelo baseado em regras deve vir primeiro para garantir uma integracao simples com Laravel.

## 16. Execucao Local Prevista

Com o ambiente Python configurado, a execucao local prevista sera:

```powershell
cd ai-service
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

URL local prevista:

```text
http://127.0.0.1:8001
```

Documentacao automatica do FastAPI:

```text
http://127.0.0.1:8001/docs
```

## 17. Testes Manuais Previstos

Casos minimos para validar a Sprint 05:

| Caso | Entrada | Resultado esperado |
|---|---|---|
| Prioridade critica | Descricao com `armado` ou `disparo` | `predicted_priority = critica` |
| Prioridade alta | Tipo `Roubo` sem termo critico | `predicted_priority = alta` |
| Prioridade media | Tipo `Perturbacao` ou `Furto` | `predicted_priority = media` |
| Prioridade baixa | Descricao sem termo de risco | `predicted_priority = baixa` |
| Payload invalido | Ausencia de `descricao` | HTTP `422` |

## 18. Entregaveis da Sprint 05

- Projeto Python criado no diretorio `ai-service`.
- API FastAPI funcionando localmente.
- Endpoint `POST /predict-priority`.
- Schema de entrada e saida documentado.
- Modelo inicial `rules-v1`.
- Regras iniciais de classificacao implementadas.
- README do `ai-service`.
- Integracao Laravel -> FastAPI.
- Registro da predicao em `ai_predictions`.
- Atualizacao de `occurrences.ai_priority`.
- Validacao manual dos principais cenarios.

## 19. Criterios de Aceite

A Sprint 05 sera considerada concluida quando:

- O `ai-service` executar localmente na porta `8001`.
- A documentacao automatica do FastAPI estiver acessivel em `/docs`.
- O endpoint `POST /predict-priority` aceitar dados de ocorrencia.
- O endpoint retornar `predicted_priority`, `risk_score`, `confidence_score`, `model_name`, `explanation` e `input_summary`.
- As prioridades retornadas forem apenas `baixa`, `media`, `alta` ou `critica`.
- O modelo inicial baseado em regras estiver funcionando.
- O Laravel conseguir chamar o FastAPI.
- O Laravel registrar a prioridade sugerida em `occurrences.ai_priority`.
- O Laravel registrar a predicao completa em `ai_predictions`.
- Os testes manuais com exemplos critico, alto, medio e baixo forem executados.

## 20. Riscos e Decisoes

| Risco | Decisao |
|---|---|
| IA ficar complexa demais para o MVP | Comecar com regras simples e evoluir depois. |
| FastAPI assumir responsabilidade do Laravel | Manter o FastAPI apenas como servico de predicao. |
| Dificuldade de integracao entre servicos | Definir contrato JSON claro antes da implementacao. |
| Dados sensiveis no payload | Usar somente dados simulados e descricoes sem identificacao real. |
| Confianca parecer precisao real | Documentar que `confidence_score` e estimativa baseada em regras. |

## 21. Proximos Passos

1. Criar a estrutura `ai-service`.
2. Configurar ambiente Python.
3. Instalar FastAPI e Uvicorn.
4. Criar os schemas de entrada e saida.
5. Implementar o preditor `rules-v1`.
6. Criar o endpoint `POST /predict-priority`.
7. Validar exemplos manualmente.
8. Integrar o Laravel ao microservico.
9. Registrar as respostas em `ai_predictions`.
