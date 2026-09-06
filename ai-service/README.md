# Serviço de prioridade

API em FastAPI usada para sugerir a prioridade de uma ocorrência. O serviço tenta carregar o modelo treinado com Scikit-learn e, se ele não estiver disponível, utiliza as regras definidas em `app/services/priority_predictor.py`.

A resposta é uma sugestão para o operador. A decisão final continua sendo humana.

## Executar localmente

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8001
```

A documentação da API fica disponível em `http://127.0.0.1:8001/docs`.

## Treinar o modelo

O treinamento usa os registros de `data/occurrences_training.csv` e atualiza o arquivo `models/priority_model.joblib`.

```powershell
.\.venv\Scripts\python.exe -m app.train_model
```

## Testes

```powershell
.\.venv\Scripts\python.exe -m pytest
```
