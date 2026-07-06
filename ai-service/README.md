# VigIA AI Service

Microservico em FastAPI responsavel por sugerir a prioridade de ocorrencias simuladas do projeto VigIA.

Esta primeira versao usa o modelo `rules-v1`, baseado em regras e palavras-chave. Ele ainda nao usa Scikit-learn.

## 1. Objetivo

O `ai-service` recebe dados de uma ocorrencia, analisa tipo, regiao, descricao, gravidade informada e risco da regiao, e retorna uma prioridade sugerida para apoio operacional.

A prioridade retornada e apenas uma sugestao. A decisao final continua sendo humana e deve permanecer sob responsabilidade do operador do sistema.

## 2. Estrutura

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

Arquivos principais:

| Arquivo | Funcao |
|---|---|
| `app/main.py` | Cria a API FastAPI e expoe os endpoints. |
| `app/schemas.py` | Define os modelos de entrada e saida com Pydantic. |
| `app/services/priority_predictor.py` | Contem a regra inicial de predicao `rules-v1`. |
| `requirements.txt` | Lista as dependencias Python do microservico. |

## 3. Requisitos

- Python instalado.
- Ambiente virtual criado em `.venv`.
- Dependencias instaladas a partir de `requirements.txt`.

## 4. Criar e ativar ambiente local

Na pasta `ai-service`, execute:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Se o PowerShell bloquear a ativacao do ambiente virtual, execute:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
```

## 5. Instalar dependencias

Com o ambiente virtual ativado:

```powershell
pip install -r requirements.txt
```

## 6. Executar a API

Na pasta `ai-service`, com o ambiente virtual ativado:

```powershell
uvicorn app.main:app --reload --port 8001
```

URL local:

```text
http://127.0.0.1:8001
```

Documentacao automatica do FastAPI:

```text
http://127.0.0.1:8001/docs
```

## 7. Endpoints

### Health check

```http
GET /health
```

Resposta esperada:

```json
{
  "status": "ok"
}
```

### Predicao de prioridade

```http
POST /predict-priority
```

Payload de exemplo:

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

Resposta esperada:

```json
{
  "predicted_priority": "critica",
  "risk_score": 90,
  "confidence_score": 90,
  "model_name": "rules-v1",
  "explanation": "Prioridade critica sugerida pelos termos identificados: arma, armado.",
  "input_summary": {
    "occurrence_id": 1,
    "tipo_ocorrencia": "Roubo",
    "regiao": "Centro",
    "matched_terms": ["arma", "armado"],
    "informed_severity": 4,
    "region_risk_level": 5
  }
}
```

## 8. Prioridades retornadas

O endpoint retorna apenas os valores aceitos pelo banco do projeto:

```text
baixa
media
alta
critica
```

## 9. Regras iniciais do modelo

### Critica

Termos como:

```text
arma, armado, disparo, tiro, baleado, ferido, morte, homicidio, sequestro, refem, risco de morte
```

### Alta

Termos como:

```text
roubo, agressao, ameaca, violencia domestica, invasao, furto em andamento
```

### Media

Termos como:

```text
furto, suspeita, perturbacao, dano, vandalismo, acidente sem vitima
```

### Baixa

Termos como:

```text
apoio, denuncia generica, orientacao, solicitacao sem risco imediato
```

## 10. Observacao sobre negacoes

A versao `rules-v1` ainda nao interpreta negacoes.

Exemplo:

```text
Roubo sem arma
```

Mesmo contendo a palavra `sem`, o modelo ainda encontra o termo `arma` e pode classificar como `critica`.

Essa limitacao deve ser corrigida em uma evolucao futura da regra ou com um modelo simples de machine learning.

## 11. Testes manuais recomendados

### Caso critico

```json
{
  "occurrence_id": 1,
  "tipo_ocorrencia": "Roubo",
  "regiao": "Centro",
  "descricao": "Individuo armado realizando roubo em andamento",
  "informed_severity": 4,
  "region_risk_level": 5
}
```

Resultado esperado:

```text
critica
```

### Caso alto

```json
{
  "occurrence_id": 2,
  "tipo_ocorrencia": "Roubo",
  "regiao": "Centro",
  "descricao": "Roubo de celular em via publica",
  "informed_severity": 3,
  "region_risk_level": 3
}
```

Resultado esperado:

```text
alta
```

### Caso medio

```json
{
  "occurrence_id": 3,
  "tipo_ocorrencia": "Perturbacao",
  "regiao": "America",
  "descricao": "Som alto recorrente durante a madrugada",
  "informed_severity": 2,
  "region_risk_level": 2
}
```

Resultado esperado:

```text
media
```

### Caso baixo

```json
{
  "occurrence_id": 4,
  "tipo_ocorrencia": "Apoio",
  "regiao": "Centro",
  "descricao": "Solicitacao de apoio operacional sem risco imediato",
  "informed_severity": 1,
  "region_risk_level": 1
}
```

Resultado esperado:

```text
baixa
```

## 12. Validacao de sintaxe

Para verificar se os arquivos Python compilam:

```powershell
python -m compileall app
```

## 13. Uso no MVP

Fluxo previsto:

```text
Laravel consulta ou recebe uma ocorrencia.
Laravel envia os dados para POST /predict-priority.
FastAPI retorna a prioridade sugerida.
Laravel salva a sugestao em occurrences.ai_priority.
Laravel registra a predicao completa em ai_predictions.
Frontend exibe a prioridade no dashboard, mapa e listagem.
```

## 14. Cuidados

- Usar apenas dados simulados.
- Nao enviar nomes reais, CPF, telefone, placa real ou endereco completo.
- `confidence_score` e uma estimativa baseada em regras, nao uma metrica estatistica real.
- A API deve rodar separada do Laravel, preferencialmente na porta `8001`.
