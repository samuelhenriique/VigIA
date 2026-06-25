-- Dados simulados iniciais do projeto VigIA.
-- Execute este arquivo no banco vigia_db pelo pgAdmin.
-- Usuario inicial para testes futuros:
-- E-mail: admin@vigia.local
-- Senha prevista para Laravel: password

INSERT INTO roles (name, description)
VALUES
    ('administrador', 'Usuario com acesso completo ao sistema.'),
    ('operador', 'Usuario responsavel pelo registro e acompanhamento de ocorrencias.'),
    ('gestor', 'Usuario responsavel por acompanhar indicadores e relatorios.')
ON CONFLICT (name) DO UPDATE
SET description = EXCLUDED.description,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO users (role_id, name, email, password, active)
VALUES (
    (SELECT id FROM roles WHERE name = 'administrador'),
    'Administrador VigIA',
    'admin@vigia.local',
    '$2y$12$pat2dPF5lwCqvdQzJR0zAeIgQ32LELkRKlE7R0AIvMpUoh/YKCNxm',
    TRUE
)
ON CONFLICT (email) DO UPDATE
SET name = EXCLUDED.name,
    role_id = EXCLUDED.role_id,
    password = EXCLUDED.password,
    active = EXCLUDED.active,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO occurrence_types (name, default_severity, active)
VALUES
    ('Furto', 2, TRUE),
    ('Roubo', 4, TRUE),
    ('Violencia domestica', 5, TRUE),
    ('Acidente de transito', 3, TRUE),
    ('Perturbacao', 1, TRUE),
    ('Trafico de drogas', 4, TRUE),
    ('Estelionato', 2, TRUE),
    ('Ameaca', 3, TRUE)
ON CONFLICT (name) DO UPDATE
SET default_severity = EXCLUDED.default_severity,
    active = EXCLUDED.active,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO regions (name, city, state, risk_level, center_latitude, center_longitude, geom)
VALUES
    ('Centro', 'Florianopolis', 'SC', 4, -27.5948700, -48.5482200, ST_SetSRID(ST_MakePoint(-48.5482200, -27.5948700), 4326)::geography),
    ('Trindade', 'Florianopolis', 'SC', 3, -27.5894800, -48.5201400, ST_SetSRID(ST_MakePoint(-48.5201400, -27.5894800), 4326)::geography),
    ('Estreito', 'Florianopolis', 'SC', 3, -27.5901800, -48.5837800, ST_SetSRID(ST_MakePoint(-48.5837800, -27.5901800), 4326)::geography),
    ('Capoeiras', 'Florianopolis', 'SC', 4, -27.5993000, -48.5972100, ST_SetSRID(ST_MakePoint(-48.5972100, -27.5993000), 4326)::geography),
    ('Ingleses', 'Florianopolis', 'SC', 2, -27.4370900, -48.3956700, ST_SetSRID(ST_MakePoint(-48.3956700, -27.4370900), 4326)::geography),
    ('Canasvieiras', 'Florianopolis', 'SC', 2, -27.4304200, -48.4614700, ST_SetSRID(ST_MakePoint(-48.4614700, -27.4304200), 4326)::geography),
    ('Lagoa da Conceicao', 'Florianopolis', 'SC', 3, -27.6040300, -48.4674100, ST_SetSRID(ST_MakePoint(-48.4674100, -27.6040300), 4326)::geography),
    ('Coqueiros', 'Florianopolis', 'SC', 2, -27.6111200, -48.5886300, ST_SetSRID(ST_MakePoint(-48.5886300, -27.6111200), 4326)::geography)
ON CONFLICT (name, city, state) DO UPDATE
SET risk_level = EXCLUDED.risk_level,
    center_latitude = EXCLUDED.center_latitude,
    center_longitude = EXCLUDED.center_longitude,
    geom = EXCLUDED.geom,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO vehicles (region_id, code, team_name, status, patrol_type, latitude, longitude, geom, active)
VALUES
    ((SELECT id FROM regions WHERE name = 'Centro'), 'VTR-001', 'Equipe Alfa', 'disponivel', 'Patrulhamento urbano', -27.5961000, -48.5493000, ST_SetSRID(ST_MakePoint(-48.5493000, -27.5961000), 4326)::geography, TRUE),
    ((SELECT id FROM regions WHERE name = 'Trindade'), 'VTR-002', 'Equipe Bravo', 'disponivel', 'Patrulhamento preventivo', -27.5909000, -48.5222000, ST_SetSRID(ST_MakePoint(-48.5222000, -27.5909000), 4326)::geography, TRUE),
    ((SELECT id FROM regions WHERE name = 'Estreito'), 'VTR-003', 'Equipe Charlie', 'em_atendimento', 'Patrulhamento urbano', -27.5912000, -48.5829000, ST_SetSRID(ST_MakePoint(-48.5829000, -27.5912000), 4326)::geography, TRUE),
    ((SELECT id FROM regions WHERE name = 'Capoeiras'), 'VTR-004', 'Equipe Delta', 'disponivel', 'Patrulhamento preventivo', -27.6004000, -48.5957000, ST_SetSRID(ST_MakePoint(-48.5957000, -27.6004000), 4326)::geography, TRUE),
    ((SELECT id FROM regions WHERE name = 'Ingleses'), 'VTR-005', 'Equipe Echo', 'indisponivel', 'Patrulhamento turistico', -27.4383000, -48.3971000, ST_SetSRID(ST_MakePoint(-48.3971000, -27.4383000), 4326)::geography, TRUE),
    ((SELECT id FROM regions WHERE name = 'Lagoa da Conceicao'), 'VTR-006', 'Equipe Fox', 'disponivel', 'Patrulhamento turistico', -27.6051000, -48.4686000, ST_SetSRID(ST_MakePoint(-48.4686000, -27.6051000), 4326)::geography, TRUE)
ON CONFLICT (code) DO UPDATE
SET region_id = EXCLUDED.region_id,
    team_name = EXCLUDED.team_name,
    status = EXCLUDED.status,
    patrol_type = EXCLUDED.patrol_type,
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude,
    geom = EXCLUDED.geom,
    active = EXCLUDED.active,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO occurrences (
    occurrence_type_id,
    region_id,
    code,
    title,
    description,
    status,
    informed_severity,
    human_priority,
    ai_priority,
    latitude,
    longitude,
    geom,
    occurred_at,
    response_time_minutes,
    created_by
)
VALUES
    ((SELECT id FROM occurrence_types WHERE name = 'Furto'), (SELECT id FROM regions WHERE name = 'Centro'), 'OCR-2026-0001', 'Furto em area comercial', 'Registro ficticio de furto de objeto em area comercial movimentada.', 'aberta', 2, NULL, 'media', -27.5954200, -48.5488100, ST_SetSRID(ST_MakePoint(-48.5488100, -27.5954200), 4326)::geography, '2026-06-23 08:15:00', NULL, (SELECT id FROM users WHERE email = 'admin@vigia.local')),
    ((SELECT id FROM occurrence_types WHERE name = 'Roubo'), (SELECT id FROM regions WHERE name = 'Centro'), 'OCR-2026-0002', 'Roubo em via publica', 'Registro ficticio de roubo em via publica sem identificacao de pessoas reais.', 'em_atendimento', 4, 'alta', 'alta', -27.5939800, -48.5469000, ST_SetSRID(ST_MakePoint(-48.5469000, -27.5939800), 4326)::geography, '2026-06-23 09:40:00', 12, (SELECT id FROM users WHERE email = 'admin@vigia.local')),
    ((SELECT id FROM occurrence_types WHERE name = 'Violencia domestica'), (SELECT id FROM regions WHERE name = 'Capoeiras'), 'OCR-2026-0003', 'Ocorrencia familiar critica', 'Registro ficticio sem dados pessoais para simulacao de atendimento prioritario.', 'aberta', 5, NULL, 'critica', -27.5989500, -48.5981400, ST_SetSRID(ST_MakePoint(-48.5981400, -27.5989500), 4326)::geography, '2026-06-23 10:05:00', NULL, (SELECT id FROM users WHERE email = 'admin@vigia.local')),
    ((SELECT id FROM occurrence_types WHERE name = 'Acidente de transito'), (SELECT id FROM regions WHERE name = 'Estreito'), 'OCR-2026-0004', 'Acidente com bloqueio parcial', 'Registro ficticio de acidente de transito com impacto no fluxo local.', 'finalizada', 3, 'media', 'media', -27.5898000, -48.5819500, ST_SetSRID(ST_MakePoint(-48.5819500, -27.5898000), 4326)::geography, '2026-06-22 18:30:00', 18, (SELECT id FROM users WHERE email = 'admin@vigia.local')),
    ((SELECT id FROM occurrence_types WHERE name = 'Perturbacao'), (SELECT id FROM regions WHERE name = 'Lagoa da Conceicao'), 'OCR-2026-0005', 'Perturbacao em area residencial', 'Registro ficticio de perturbacao sem identificacao de envolvidos.', 'aberta', 1, NULL, 'baixa', -27.6033000, -48.4667800, ST_SetSRID(ST_MakePoint(-48.4667800, -27.6033000), 4326)::geography, '2026-06-23 01:20:00', NULL, (SELECT id FROM users WHERE email = 'admin@vigia.local')),
    ((SELECT id FROM occurrence_types WHERE name = 'Trafico de drogas'), (SELECT id FROM regions WHERE name = 'Trindade'), 'OCR-2026-0006', 'Movimentacao suspeita recorrente', 'Registro ficticio de movimentacao suspeita em area monitorada.', 'aberta', 4, NULL, 'alta', -27.5887000, -48.5194300, ST_SetSRID(ST_MakePoint(-48.5194300, -27.5887000), 4326)::geography, '2026-06-23 11:10:00', NULL, (SELECT id FROM users WHERE email = 'admin@vigia.local')),
    ((SELECT id FROM occurrence_types WHERE name = 'Estelionato'), (SELECT id FROM regions WHERE name = 'Coqueiros'), 'OCR-2026-0007', 'Golpe virtual comunicado', 'Registro ficticio de comunicacao de golpe virtual sem dados pessoais.', 'finalizada', 2, 'baixa', 'baixa', -27.6107200, -48.5879000, ST_SetSRID(ST_MakePoint(-48.5879000, -27.6107200), 4326)::geography, '2026-06-21 14:00:00', 35, (SELECT id FROM users WHERE email = 'admin@vigia.local')),
    ((SELECT id FROM occurrence_types WHERE name = 'Ameaca'), (SELECT id FROM regions WHERE name = 'Ingleses'), 'OCR-2026-0008', 'Ameaca verbal registrada', 'Registro ficticio de ameaca verbal para teste de fluxo operacional.', 'aberta', 3, NULL, 'media', -27.4366000, -48.3949500, ST_SetSRID(ST_MakePoint(-48.3949500, -27.4366000), 4326)::geography, '2026-06-23 12:25:00', NULL, (SELECT id FROM users WHERE email = 'admin@vigia.local')),
    ((SELECT id FROM occurrence_types WHERE name = 'Furto'), (SELECT id FROM regions WHERE name = 'Trindade'), 'OCR-2026-0009', 'Furto proximo a terminal', 'Registro ficticio de furto em local com fluxo intenso de pessoas.', 'aberta', 2, NULL, 'media', -27.5902500, -48.5210600, ST_SetSRID(ST_MakePoint(-48.5210600, -27.5902500), 4326)::geography, '2026-06-23 12:45:00', NULL, (SELECT id FROM users WHERE email = 'admin@vigia.local')),
    ((SELECT id FROM occurrence_types WHERE name = 'Roubo'), (SELECT id FROM regions WHERE name = 'Capoeiras'), 'OCR-2026-0010', 'Roubo em ponto de comercio', 'Registro ficticio de roubo em estabelecimento comercial.', 'em_atendimento', 4, 'alta', 'alta', -27.5999000, -48.5964000, ST_SetSRID(ST_MakePoint(-48.5964000, -27.5999000), 4326)::geography, '2026-06-23 13:15:00', 9, (SELECT id FROM users WHERE email = 'admin@vigia.local'))
ON CONFLICT (code) DO UPDATE
SET occurrence_type_id = EXCLUDED.occurrence_type_id,
    region_id = EXCLUDED.region_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    status = EXCLUDED.status,
    informed_severity = EXCLUDED.informed_severity,
    human_priority = EXCLUDED.human_priority,
    ai_priority = EXCLUDED.ai_priority,
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude,
    geom = EXCLUDED.geom,
    occurred_at = EXCLUDED.occurred_at,
    response_time_minutes = EXCLUDED.response_time_minutes,
    created_by = EXCLUDED.created_by,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO ai_predictions (
    occurrence_id,
    model_name,
    predicted_priority,
    risk_score,
    confidence_score,
    input_summary,
    explanation
)
SELECT
    o.id,
    'rule_based_mvp_v1',
    o.ai_priority,
    CASE o.ai_priority
        WHEN 'critica' THEN 92.00
        WHEN 'alta' THEN 78.00
        WHEN 'media' THEN 55.00
        ELSE 28.00
    END,
    CASE o.ai_priority
        WHEN 'critica' THEN 88.00
        WHEN 'alta' THEN 82.00
        WHEN 'media' THEN 74.00
        ELSE 69.00
    END,
    jsonb_build_object(
        'tipo', ot.name,
        'regiao', r.name,
        'gravidade', o.informed_severity,
        'horario', to_char(o.occurred_at, 'HH24:MI')
    ),
    'Prioridade sugerida com base em tipo de ocorrencia, gravidade informada, horario e nivel de risco da regiao.'
FROM occurrences o
JOIN occurrence_types ot ON ot.id = o.occurrence_type_id
JOIN regions r ON r.id = o.region_id
WHERE NOT EXISTS (
    SELECT 1
    FROM ai_predictions ap
    WHERE ap.occurrence_id = o.id
      AND ap.model_name = 'rule_based_mvp_v1'
);

INSERT INTO dispatches (
    occurrence_id,
    vehicle_id,
    assigned_by,
    status,
    distance_km,
    estimated_arrival_minutes,
    assigned_at
)
SELECT
    (SELECT id FROM occurrences WHERE code = 'OCR-2026-0002'),
    (SELECT id FROM vehicles WHERE code = 'VTR-001'),
    (SELECT id FROM users WHERE email = 'admin@vigia.local'),
    'confirmado',
    1.35,
    8,
    '2026-06-23 09:43:00'
WHERE NOT EXISTS (
    SELECT 1 FROM dispatches d
    JOIN occurrences o ON o.id = d.occurrence_id
    WHERE o.code = 'OCR-2026-0002'
);

INSERT INTO dispatches (
    occurrence_id,
    vehicle_id,
    assigned_by,
    status,
    distance_km,
    estimated_arrival_minutes,
    assigned_at
)
SELECT
    (SELECT id FROM occurrences WHERE code = 'OCR-2026-0010'),
    (SELECT id FROM vehicles WHERE code = 'VTR-004'),
    (SELECT id FROM users WHERE email = 'admin@vigia.local'),
    'confirmado',
    0.85,
    6,
    '2026-06-23 13:18:00'
WHERE NOT EXISTS (
    SELECT 1 FROM dispatches d
    JOIN occurrences o ON o.id = d.occurrence_id
    WHERE o.code = 'OCR-2026-0010'
);

INSERT INTO alerts (occurrence_id, type, title, description, severity, status, generated_by)
SELECT
    (SELECT id FROM occurrences WHERE code = 'OCR-2026-0009'),
    'padrao_semelhante',
    'Furtos recentes na regiao da Trindade',
    'O sistema identificou ocorrencias de furto em regiao proxima e intervalo recente. Alerta ficticio para validacao do MVP.',
    'medio',
    'aberto',
    'regra'
WHERE NOT EXISTS (
    SELECT 1 FROM alerts WHERE title = 'Furtos recentes na regiao da Trindade'
);

INSERT INTO alerts (occurrence_id, type, title, description, severity, status, generated_by)
SELECT
    (SELECT id FROM occurrences WHERE code = 'OCR-2026-0003'),
    'prioridade_critica',
    'Ocorrencia critica aguardando despacho',
    'Ocorrencia classificada como critica pela sugestao automatica e ainda sem despacho confirmado.',
    'critico',
    'aberto',
    'ia'
WHERE NOT EXISTS (
    SELECT 1 FROM alerts WHERE title = 'Ocorrencia critica aguardando despacho'
);

INSERT INTO alerts (occurrence_id, type, title, description, severity, status, generated_by)
SELECT
    (SELECT id FROM occurrences WHERE code = 'OCR-2026-0010'),
    'area_risco',
    'Alta concentracao de ocorrencias em Capoeiras',
    'Regiao com nivel de risco simulado elevado e ocorrencias recentes de maior gravidade.',
    'alto',
    'visualizado',
    'sistema'
WHERE NOT EXISTS (
    SELECT 1 FROM alerts WHERE title = 'Alta concentracao de ocorrencias em Capoeiras'
);

INSERT INTO audit_logs (user_id, action, entity_name, entity_id, new_values, ip_address)
SELECT
    (SELECT id FROM users WHERE email = 'admin@vigia.local'),
    'seed_executed',
    'database',
    NULL,
    jsonb_build_object('arquivo', 'database/seed.sql', 'ambiente', 'academico'),
    '127.0.0.1'
WHERE NOT EXISTS (
    SELECT 1 FROM audit_logs WHERE action = 'seed_executed'
);
