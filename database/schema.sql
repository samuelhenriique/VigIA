CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    role_id BIGINT NOT NULL REFERENCES roles(id),
    name VARCHAR(120) NOT NULL,
    email VARCHAR(160) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE occurrence_types (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    default_severity SMALLINT NOT NULL CHECK (default_severity BETWEEN 1 AND 5),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE regions (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    city VARCHAR(120) NOT NULL,
    state CHAR(2) NOT NULL,
    risk_level SMALLINT NOT NULL CHECK (risk_level BETWEEN 1 AND 5),
    center_latitude DECIMAL(10, 7) NOT NULL,
    center_longitude DECIMAL(10, 7) NOT NULL,
    geom GEOGRAPHY(POINT, 4326),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (name, city, state)
);

CREATE TABLE occurrences (
    id BIGSERIAL PRIMARY KEY,
    occurrence_type_id BIGINT NOT NULL REFERENCES occurrence_types(id),
    region_id BIGINT NOT NULL REFERENCES regions(id),
    code VARCHAR(30) NOT NULL UNIQUE,
    title VARCHAR(160) NOT NULL,
    description TEXT,
    status VARCHAR(30) NOT NULL,
    informed_severity SMALLINT NOT NULL CHECK (informed_severity BETWEEN 1 AND 5),
    human_priority VARCHAR(20),
    ai_priority VARCHAR(20),
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    geom GEOGRAPHY(POINT, 4326),
    occurred_at TIMESTAMP NOT NULL,
    response_time_minutes INTEGER CHECK (response_time_minutes IS NULL OR response_time_minutes >= 0),
    created_by BIGINT REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT occurrences_status_check CHECK (
        status IN ('aberta', 'em_atendimento', 'finalizada', 'cancelada')
    ),
    CONSTRAINT occurrences_human_priority_check CHECK (
        human_priority IS NULL OR human_priority IN ('baixa', 'media', 'alta', 'critica')
    ),
    CONSTRAINT occurrences_ai_priority_check CHECK (
        ai_priority IS NULL OR ai_priority IN ('baixa', 'media', 'alta', 'critica')
    )
);

CREATE TABLE vehicles (
    id BIGSERIAL PRIMARY KEY,
    region_id BIGINT REFERENCES regions(id),
    code VARCHAR(30) NOT NULL UNIQUE,
    team_name VARCHAR(100),
    status VARCHAR(30) NOT NULL,
    patrol_type VARCHAR(60),
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    geom GEOGRAPHY(POINT, 4326),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT vehicles_status_check CHECK (
        status IN ('disponivel', 'em_atendimento', 'indisponivel', 'manutencao')
    )
);

CREATE TABLE dispatches (
    id BIGSERIAL PRIMARY KEY,
    occurrence_id BIGINT NOT NULL REFERENCES occurrences(id),
    vehicle_id BIGINT NOT NULL REFERENCES vehicles(id),
    assigned_by BIGINT REFERENCES users(id),
    status VARCHAR(30) NOT NULL,
    distance_km DECIMAL(8, 2) CHECK (distance_km IS NULL OR distance_km >= 0),
    estimated_arrival_minutes INTEGER CHECK (
        estimated_arrival_minutes IS NULL OR estimated_arrival_minutes >= 0
    ),
    assigned_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT dispatches_status_check CHECK (
        status IN ('sugerido', 'confirmado', 'recusado', 'concluido')
    )
);

CREATE TABLE ai_predictions (
    id BIGSERIAL PRIMARY KEY,
    occurrence_id BIGINT NOT NULL REFERENCES occurrences(id),
    model_name VARCHAR(100) NOT NULL,
    predicted_priority VARCHAR(20) NOT NULL,
    risk_score DECIMAL(5, 2) NOT NULL CHECK (risk_score BETWEEN 0 AND 100),
    confidence_score DECIMAL(5, 2) CHECK (
        confidence_score IS NULL OR confidence_score BETWEEN 0 AND 100
    ),
    input_summary JSONB,
    explanation TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ai_predictions_priority_check CHECK (
        predicted_priority IN ('baixa', 'media', 'alta', 'critica')
    )
);

CREATE TABLE alerts (
    id BIGSERIAL PRIMARY KEY,
    occurrence_id BIGINT REFERENCES occurrences(id),
    type VARCHAR(60) NOT NULL,
    title VARCHAR(160) NOT NULL,
    description TEXT NOT NULL,
    severity VARCHAR(20) NOT NULL,
    status VARCHAR(30) NOT NULL,
    generated_by VARCHAR(60) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT alerts_severity_check CHECK (
        severity IN ('baixo', 'medio', 'alto', 'critico')
    ),
    CONSTRAINT alerts_status_check CHECK (
        status IN ('aberto', 'visualizado', 'resolvido')
    )
);

CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_name VARCHAR(100) NOT NULL,
    entity_id BIGINT,
    old_values JSONB,
    new_values JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_role_id ON users(role_id);

CREATE INDEX idx_occurrences_status ON occurrences(status);
CREATE INDEX idx_occurrences_occurred_at ON occurrences(occurred_at);
CREATE INDEX idx_occurrences_occurrence_type_id ON occurrences(occurrence_type_id);
CREATE INDEX idx_occurrences_region_id ON occurrences(region_id);
CREATE INDEX idx_occurrences_ai_priority ON occurrences(ai_priority);
CREATE INDEX idx_occurrences_geom ON occurrences USING GIST (geom);

CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_vehicles_region_id ON vehicles(region_id);
CREATE INDEX idx_vehicles_geom ON vehicles USING GIST (geom);

CREATE INDEX idx_dispatches_occurrence_id ON dispatches(occurrence_id);
CREATE INDEX idx_dispatches_vehicle_id ON dispatches(vehicle_id);
CREATE INDEX idx_dispatches_status ON dispatches(status);

CREATE INDEX idx_ai_predictions_occurrence_id ON ai_predictions(occurrence_id);

CREATE INDEX idx_alerts_occurrence_id ON alerts(occurrence_id);
CREATE INDEX idx_alerts_status ON alerts(status);
CREATE INDEX idx_alerts_severity ON alerts(severity);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_name, entity_id);
