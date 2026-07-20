import pytest
from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


@pytest.fixture(autouse=True)
def disable_ml_model(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(
        "app.services.priority_predictor.load_ml_model",
        lambda: None,
    )


@pytest.mark.parametrize(
    ("tipo", "descricao", "severity", "expected"),
    [
        ("Apoio", "Solicitacao sem risco imediato", 1, "baixa"),
        ("Furto", "Subtracao de objeto sem violencia", 2, "media"),
        ("Roubo", "Bem subtraido mediante ameaca", 3, "alta"),
        ("Disparo", "Pessoa ferida por disparo de arma", 5, "critica"),
    ],
)
def test_predict_priority_with_rules(
    tipo: str,
    descricao: str,
    severity: int,
    expected: str,
) -> None:
    response = client.post(
        "/predict-priority",
        json={
            "occurrence_id": 1,
            "tipo_ocorrencia": tipo,
            "regiao": "Centro",
            "descricao": descricao,
            "informed_severity": severity,
            "region_risk_level": 3,
            "latitude": -23.5505200,
            "longitude": -46.6333080,
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["predicted_priority"] == expected
    assert data["model_name"] == "rules-v1"
    assert 0 <= data["risk_score"] <= 100
    assert 0 <= data["confidence_score"] <= 100