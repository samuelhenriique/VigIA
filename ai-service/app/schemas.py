from typing import Any

from pydantic import BaseModel, Field


class PriorityPredictionRequest(BaseModel):
    occurrence_id: int | None = Field(default=None, ge=1)
    tipo_ocorrencia: str = Field(..., min_length=1)
    regiao: str = Field(..., min_length=1)
    descricao: str = Field(..., min_length=1)
    informed_severity: int | None = Field(default=None, ge=1, le=5)
    region_risk_level: int | None = Field(default=None, ge=1, le=5)
    latitude: float | None = Field(default=None, ge=-90, le=90)
    longitude: float | None = Field(default=None, ge=-180, le=180)


class PriorityPredictionResponse(BaseModel):
    predicted_priority: str
    risk_score: int = Field(..., ge=0, le=100)
    confidence_score: int = Field(..., ge=0, le=100)
    model_name: str
    explanation: str
    input_summary: dict[str, Any]