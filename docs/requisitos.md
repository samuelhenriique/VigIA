# Requisitos do Projeto VigIA

## 1. Visao Geral

O VigIA e uma plataforma web inteligente de apoio operacional para centrais de seguranca publica. O sistema tem como objetivo auxiliar o registro, a visualizacao, a priorizacao e o acompanhamento de ocorrencias policiais em um ambiente academico controlado, utilizando dados simulados e recursos de inteligencia artificial como apoio a decisao.

A solucao nao substitui a decisao humana. As sugestoes geradas pelo sistema devem ser interpretadas como apoio operacional, mantendo a responsabilidade final com o usuario autorizado.

## 2. Objetivo do MVP

O MVP do projeto VigIA sera uma plataforma web funcional de apoio operacional, utilizando dados simulados, com cadastro de ocorrencias e viaturas, visualizacao em dashboard e mapa interativo, sugestao de prioridade de ocorrencias e indicacao de viatura mais adequada com base na disponibilidade e proximidade geografica.

Nesta etapa, nao serao utilizados dados reais de seguranca publica nem havera integracao com sistemas oficiais. A inteligencia artificial sera aplicada como recurso de apoio a decisao em ambiente academico controlado.

## 3. Escopo do MVP

### 3.1 Dentro do Escopo

- Cadastro, listagem, edicao e consulta de ocorrencias.
- Cadastro, listagem, edicao e consulta de viaturas.
- Cadastro ou carga inicial de tipos de ocorrencia.
- Cadastro ou carga inicial de regioes/bairros.
- Visualizacao das ocorrencias em painel operacional.
- Visualizacao das ocorrencias em mapa interativo.
- Visualizacao das viaturas disponiveis em mapa interativo.
- Filtros por tipo de ocorrencia, status, prioridade, regiao e periodo.
- Sugestao automatica de prioridade da ocorrencia.
- Sugestao da viatura mais adequada para atendimento.
- Dashboard com indicadores operacionais.
- Alertas simples para ocorrencias semelhantes em regiao proxima e curto intervalo de tempo.
- Uso de dados simulados para validacao.
- Registro de logs das principais acoes.
- Login basico e controle simples de perfil de usuario.

### 3.2 Fora do Escopo do MVP

- Integracao com sistemas reais da policia, COPOM, SADE, PMSC Mobile ou 190.
- Uso de dados pessoais reais de vitimas, suspeitos, policiais ou atendentes.
- Aplicativo mobile nativo.
- Reconhecimento facial, OCR, cameras ou videomonitoramento.
- Despacho real de viaturas.
- Monitoramento em tempo real com infraestrutura de producao.
- Modelo de inteligencia artificial definitivo ou juridicamente validado.
- Tomada de decisao automatica sem supervisao humana.
- Hospedagem obrigatoria em nuvem.
- Integracao com WhatsApp, telefone, radio ou dispositivos externos.

## 4. Atores do Sistema

### Administrador

Usuario responsavel por gerenciar cadastros, usuarios, tipos de ocorrencia, viaturas e configuracoes basicas do sistema.

### Operador

Usuario responsavel por registrar ocorrencias, acompanhar o painel operacional, consultar sugestoes do sistema e acompanhar status de atendimento.

### Gestor Operacional

Usuario responsavel por analisar indicadores, mapas, regioes de risco e relatorios gerados pela plataforma.

## 5. Requisitos Funcionais

| Codigo | Requisito |
|---|---|
| RF-01 | O sistema devera permitir o cadastro de ocorrencias policiais simuladas. |
| RF-02 | O sistema devera permitir a edicao e consulta de ocorrencias cadastradas. |
| RF-03 | O sistema devera permitir o cadastro e gerenciamento de viaturas. |
| RF-04 | O sistema devera permitir o cadastro ou carga inicial de tipos de ocorrencia. |
| RF-05 | O sistema devera permitir o cadastro ou carga inicial de regioes/bairros. |
| RF-06 | O sistema devera exibir ocorrencias em um painel operacional. |
| RF-07 | O sistema devera exibir ocorrencias em mapa interativo com base em latitude e longitude. |
| RF-08 | O sistema devera exibir viaturas em mapa interativo com base em latitude e longitude. |
| RF-09 | O sistema devera permitir filtros por tipo de ocorrencia, status, prioridade, regiao e periodo. |
| RF-10 | O sistema devera classificar ou sugerir automaticamente a prioridade da ocorrencia. |
| RF-11 | O sistema devera sugerir a viatura mais adequada considerando disponibilidade e proximidade geografica. |
| RF-12 | O sistema devera apresentar indicadores operacionais em dashboard. |
| RF-13 | O sistema devera apresentar graficos de ocorrencias por tipo, regiao, status e periodo. |
| RF-14 | O sistema devera indicar regioes com maior concentracao de ocorrencias com base nos dados historicos simulados. |
| RF-15 | O sistema devera identificar ocorrencias semelhantes registradas em curto intervalo de tempo e regiao proxima. |
| RF-16 | O sistema devera gerar alertas operacionais quando identificar possiveis padroes de ocorrencias. |
| RF-17 | O sistema devera permitir login de usuarios autorizados. |
| RF-18 | O sistema devera aplicar controle de acesso por perfil de usuario. |
| RF-19 | O sistema devera registrar logs das principais acoes realizadas. |
| RF-20 | O sistema devera permitir consulta de relatorios simples por tipo de ocorrencia, regiao, data e prioridade. |

## 6. Requisitos Nao Funcionais

| Codigo | Requisito |
|---|---|
| RNF-01 | O sistema devera possuir interface web responsiva. |
| RNF-02 | O sistema devera utilizar APIs REST para comunicacao entre frontend, backend e modulo de IA. |
| RNF-03 | O backend principal devera ser desenvolvido em Laravel. |
| RNF-04 | O frontend devera ser desenvolvido em React. |
| RNF-05 | O modulo de IA devera ser desenvolvido em Python com FastAPI. |
| RNF-06 | O banco de dados devera utilizar PostgreSQL. |
| RNF-07 | O tratamento de dados geograficos devera utilizar PostGIS quando aplicavel. |
| RNF-08 | O sistema devera utilizar dados simulados ou anonimizados para testes academicos. |
| RNF-09 | O sistema nao devera armazenar dados pessoais sensiveis reais. |
| RNF-10 | O sistema devera considerar principios da LGPD, privacidade e seguranca da informacao. |
| RNF-11 | As principais entradas do sistema deverao ser validadas antes de serem salvas. |
| RNF-12 | As rotas protegidas deverao exigir autenticacao. |
| RNF-13 | O sistema devera manter arquitetura modular para permitir evolucao futura. |
| RNF-14 | As consultas principais do painel deverao responder em tempo adequado para uso demonstrativo. |
| RNF-15 | O codigo devera ser versionado com Git. |

## 7. Regras de Negocio

| Codigo | Regra |
|---|---|
| RN-01 | Toda ocorrencia devera possuir tipo, localizacao, data, horario e status. |
| RN-02 | Toda ocorrencia devera possuir uma prioridade sugerida ou informada. |
| RN-03 | Uma ocorrencia somente podera ser atribuida a uma viatura disponivel. |
| RN-04 | Ocorrencias criticas deverao aparecer com destaque no painel operacional. |
| RN-05 | A prioridade podera ser sugerida pela IA, mas a decisao final permanecera humana. |
| RN-06 | A sugestao de viatura devera considerar disponibilidade e distancia ate a ocorrencia. |
| RN-07 | O mapa de risco devera ser gerado com base em dados historicos simulados. |
| RN-08 | O mapa de risco nao podera ser utilizado como unica fonte para tomada de decisao. |
| RN-09 | O sistema devera gerar alerta quando houver ocorrencias semelhantes em locais proximos e curto intervalo de tempo. |
| RN-10 | Dados pessoais sensiveis nao deverao ser usados na base de testes academica. |
| RN-11 | As acoes principais deverao ser registradas para rastreabilidade. |
| RN-12 | A IA devera ter carater de apoio operacional, sem automatizar decisoes finais. |

## 8. Dados Simulados Necessarios

Os dados simulados devem representar um ambiente ficticio, sem identificacao de pessoas reais.

### Ocorrencias

- Identificador da ocorrencia.
- Tipo da ocorrencia.
- Descricao resumida.
- Data e horario.
- Bairro ou regiao.
- Latitude e longitude.
- Nivel de gravidade.
- Status da ocorrencia.
- Prioridade sugerida.
- Viatura atribuida, quando houver.
- Tempo estimado ou registrado de resposta.

### Viaturas

- Identificador da viatura.
- Codigo da equipe.
- Status da viatura.
- Latitude e longitude atual.
- Regiao de atuacao.
- Tipo de patrulhamento, se aplicavel.

### Regioes

- Nome do bairro ou regiao.
- Coordenadas de referencia.
- Nivel historico de risco simulado.

### Dados para IA

- Tipo da ocorrencia.
- Horario.
- Dia da semana.
- Localizacao.
- Historico simulado da regiao.
- Gravidade estimada.
- Frequencia de ocorrencias semelhantes.
- Disponibilidade de viaturas.
- Prioridade final atribuida na base simulada.

## 9. Fluxo Principal do Sistema

1. O operador registra uma ocorrencia na plataforma.
2. O backend salva a ocorrencia no banco de dados.
3. O sistema consulta dados historicos simulados relacionados ao tipo, horario e localizacao.
4. O modulo de IA sugere uma prioridade para a ocorrencia.
5. O sistema identifica viaturas disponiveis.
6. O sistema calcula a proximidade entre viaturas e ocorrencia.
7. O sistema sugere a viatura mais adequada.
8. O painel operacional exibe ocorrencia, prioridade, localizacao e status.
9. O dashboard atualiza indicadores e graficos.
10. O sistema verifica possiveis padroes de ocorrencias semelhantes.
11. Caso exista padrao relevante, o sistema gera um alerta operacional.

## 10. Criterios de Aceite do MVP

O MVP sera considerado pronto quando:

- For possivel acessar o sistema com usuario autenticado.
- For possivel cadastrar, listar, editar e consultar ocorrencias.
- For possivel cadastrar, listar, editar e consultar viaturas.
- O painel operacional exibir ocorrencias cadastradas.
- O mapa exibir ocorrencias e viaturas.
- O sistema sugerir prioridade para uma ocorrencia.
- O sistema sugerir uma viatura disponivel para atendimento.
- O dashboard apresentar indicadores e graficos basicos.
- O sistema gerar pelo menos um tipo de alerta operacional.
- O sistema utilizar apenas dados simulados.
- A documentacao explicar as limitacoes, o uso academico e os cuidados com LGPD.

## 11. Tecnologias Definidas

| Camada | Tecnologia |
|---|---|
| Frontend | React, JavaScript, TailwindCSS, Leaflet, Chart.js |
| Backend | PHP, Laravel, APIs REST |
| IA | Python, FastAPI, Pandas, NumPy, Scikit-learn |
| Banco de dados | PostgreSQL, PostGIS |
| Versionamento | Git e GitHub |
| Ambiente | Visual Studio Code, Windows ou Linux |

## 12. Observacoes Academicas

- O projeto deve deixar claro que se trata de um prototipo academico.
- O uso de IA deve ser explicado como apoio a decisao.
- A validacao inicial deve ocorrer com dados simulados.
- O sistema nao deve prometer substituicao de profissionais de seguranca publica.
- A documentacao final deve apresentar riscos, limitacoes, aspectos eticos e cuidados com privacidade.
