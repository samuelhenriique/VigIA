import unicodedata

from app.schemas import PriorityPredictionRequest, PriorityPredictionResponse


MODEL_NAME = "rules-v1"

PRIORITY_LEVELS = {
    "baixa": 1,
    "media": 2,
    "alta": 3,
    "critica": 4,
}

BASE_SCORES = {
    "baixa": {
        "risk_score": 30,
        "confidence_score": 50,
    },
    "media": {
        "risk_score": 55,
        "confidence_score": 65,
    },
    "alta": {
        "risk_score": 75,
        "confidence_score": 80,
    },
    "critica": {
        "risk_score": 90,
        "confidence_score": 90,
    },
}

RULES = {
    "critica": [
        "arma",
        "armado",
        "disparo",
        "tiro",
        "baleado",
        "ferido",
        "morte",
        "homicidio",
        "sequestro",
        "refem",
        "risco de morte",
    ],
    "alta": [
        "roubo",
        "agressao",
        "ameaca",
        "violencia domestica",
        "invasao",
        "furto em andamento",
    ],
    "media": [
        "furto",
        "suspeita",
        "perturbacao",
        "dano",
        "vandalismo",
        "acidente sem vitima",
    ],
    "baixa": [
        "apoio",
        "denuncia generica",
        "orientacao",
        "solicitacao sem risco imediato",
    ],
}


def predict_priority(
    payload: PriorityPredictionRequest,
) -> PriorityPredictionResponse:
    searchable_text = normalize_text(
        " ".join(
            [
                payload.tipo_ocorrencia,
                payload.regiao,
                payload.descricao,
            ]
        )
    )

    priority, matched_terms = classify_by_terms(searchable_text)
    priority = apply_severity_tie_breaker(priority, payload.informed_severity)

    scores = BASE_SCORES[priority].copy()
    scores["risk_score"] = apply_region_risk_adjustment(
        scores["risk_score"],
        payload.region_risk_level,
        priority,
    )

    return PriorityPredictionResponse(
        predicted_priority=priority,
        risk_score=scores["risk_score"],
        confidence_score=scores["confidence_score"],
        model_name=MODEL_NAME,
        explanation=build_explanation(priority, matched_terms),
        input_summary={
            "occurrence_id": payload.occurrence_id,
            "tipo_ocorrencia": payload.tipo_ocorrencia,
            "regiao": payload.regiao,
            "matched_terms": matched_terms,
            "informed_severity": payload.informed_severity,
            "region_risk_level": payload.region_risk_level,
        },
    )


def normalize_text(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value)
    without_accents = "".join(
        char for char in normalized if not unicodedata.combining(char)
    )

    return without_accents.casefold()


def classify_by_terms(searchable_text: str) -> tuple[str, list[str]]:
    selected_priority = "baixa"
    matched_terms: list[str] = []

    for priority, terms in RULES.items():
        current_matches = [
            term for term in terms if normalize_text(term) in searchable_text
        ]

        if current_matches and PRIORITY_LEVELS[priority] > PRIORITY_LEVELS[selected_priority]:
            selected_priority = priority
            matched_terms = current_matches

    return selected_priority, matched_terms


def apply_severity_tie_breaker(priority: str, informed_severity: int | None) -> str:
    if informed_severity == 5:
        return "critica"

    if informed_severity == 4 and PRIORITY_LEVELS[priority] < PRIORITY_LEVELS["alta"]:
        return "alta"

    return priority


def apply_region_risk_adjustment(
    risk_score: int,
    region_risk_level: int | None,
    priority: str,
) -> int:
    if region_risk_level is None or region_risk_level < 4:
        return risk_score

    if priority == "critica":
        return risk_score

    return min(risk_score + 5, 100)


def build_explanation(priority: str, matched_terms: list[str]) -> str:
    if matched_terms:
        return (
            f"Prioridade {priority} sugerida pelos termos identificados: "
            f"{', '.join(matched_terms)}."
        )

    return (
        f"Prioridade {priority} sugerida porque nao foram encontrados termos "
        "de risco superior nas regras iniciais."
    )