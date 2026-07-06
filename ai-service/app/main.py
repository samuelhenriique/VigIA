from fastapi import FastAPI

from app.schemas import PriorityPredictionRequest, PriorityPredictionResponse
from app.services.priority_predictor import predict_priority

app = FastAPI(
    title="VigIA AI Service",
    description="Microservico de IA para sugestao de prioridade de ocorrencias",
    version="0.1.0",
)

@app.get("/health", tags=["Health"])
def health_check() -> dict[str, str]:
    return {"status": "ok"}

@app.post(
    "/predict-priority",
    response_model=PriorityPredictionResponse,
    tags=["prediction"],
)
def predict_ocurrence_priority(
    payload: PriorityPredictionRequest,
) -> PriorityPredictionResponse:
    return predict_priority(payload)