from pathlib import Path

import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline


BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / "data" / "occurrences_training.csv"
MODEL_DIR = BASE_DIR / "models"
MODEL_PATH = MODEL_DIR / "priority_model.joblib"


def build_training_text(row) -> str:
    return " ".join(
        [
            str(row["tipo_ocorrencia"]),
            str(row["regiao"]),
            str(row["descricao"]),
            f"gravidade_{row['informed_severity']}",
            f"risco_regiao_{row['region_risk_level']}",
        ]
    )


def train_model() -> None:
    df = pd.read_csv(DATA_PATH)

    required_columns = [
        "tipo_ocorrencia",
        "regiao",
        "descricao",
        "informed_severity",
        "region_risk_level",
        "priority",
    ]

    missing_columns = [column for column in required_columns if column not in df.columns]

    if missing_columns:
        raise ValueError(f"Colunas obrigatorias ausentes: {missing_columns}")

    df["training_text"] = df.apply(build_training_text, axis=1)

    x = df["training_text"]
    y = df["priority"]

    model = Pipeline(
        steps=[
            ("vectorizer", TfidfVectorizer()),
            (
                "classifier",
                LogisticRegression(
                    max_iter=1000,
                    class_weight="balanced",
                ),
            ),
        ]
    )

    model.fit(x, y)

    MODEL_DIR.mkdir(exist_ok=True)
    joblib.dump(model, MODEL_PATH)

    print(f"Modelo treinado e salvo em: {MODEL_PATH}")
    print("Distribuicao das classes:")
    print(y.value_counts())


if __name__ == "__main__":
    train_model()