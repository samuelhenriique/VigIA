# Canvas do Projeto

## 1. Proposta de Valor

O VigIA e uma plataforma web academica de apoio operacional para registro, visualizacao e acompanhamento de ocorrencias simuladas, com dashboard, mapa, alertas e sugestoes iniciais de IA.

## 2. Problema

Centrais operacionais precisam organizar informacoes de ocorrencias, viaturas e regioes de forma clara para apoiar a tomada de decisao.

No contexto academico, o problema abordado e demonstrar como tecnologia web, geolocalizacao e IA podem ser combinadas em um MVP funcional e responsavel.

## 3. Publico-Alvo

- Avaliadores academicos.
- Professores do Projeto Integrador.
- Estudantes de Analise e Desenvolvimento de Sistemas.
- Usuarios simulados de uma central operacional.

## 4. Solucao

O MVP oferece:

- Login de usuario administrador.
- Dashboard operacional.
- Cadastro e consulta de ocorrencias.
- Cadastro e consulta de viaturas.
- Mapa com ocorrencias, viaturas e areas de risco.
- Sugestao de viatura disponivel mais proxima.
- Sugestao de prioridade por IA.
- Alertas operacionais simulados.
- Documentacao tecnica por sprint.

## 5. Diferenciais

- Integracao full stack com Laravel, React, FastAPI e PostgreSQL.
- Uso de PostGIS para dados geograficos.
- Separacao do modulo de IA em microservico.
- Enfase em dados simulados e decisao humana.
- Documentacao organizada por sprints.

## 6. Funcionalidades-Chave

| Funcionalidade | Valor demonstrado |
|---|---|
| Dashboard | Visao consolidada da operacao simulada. |
| Ocorrencias | Registro e acompanhamento de eventos. |
| Viaturas | Controle de recursos disponiveis. |
| Mapa | Visualizacao geografica dos dados. |
| Sugestao de viatura | Apoio inicial a decisao operacional. |
| IA de prioridade | Exemplo de apoio automatizado supervisionado. |
| Alertas | Identificacao simulada de padroes e riscos. |

## 7. Tecnologias

| Camada | Tecnologias |
|---|---|
| Frontend | React, Vite, TailwindCSS, Leaflet, Chart.js |
| Backend | PHP, Laravel, Sanctum |
| IA | Python, FastAPI, Scikit-learn |
| Banco | PostgreSQL, PostGIS |
| Versionamento | Git, GitHub |

## 8. Recursos Necessarios

- Ambiente local de desenvolvimento.
- Banco PostgreSQL com PostGIS.
- Navegador web.
- Dados simulados.
- Documentacao do projeto.

## 9. Indicadores de Sucesso

- Sistema executa localmente.
- Login funciona.
- Dashboard carrega dados da API.
- Mapa exibe ocorrencias e viaturas.
- IA retorna prioridade valida.
- Sugestao de viatura funciona.
- Alertas aparecem na interface.
- Documentacao permite reproduzir a demonstracao.

## 10. Riscos

| Risco | Mitigacao |
|---|---|
| IA ser interpretada como decisao final | Explicar que e sugestao academica com supervisao humana. |
| Dados simulados parecerem reais | Reforcar nos documentos e na apresentacao. |
| Ambiente local falhar na demonstracao | Usar checklist de teste antes da apresentacao. |
| Escopo crescer no fechamento | Priorizar estabilidade e documentacao. |

## 11. Evolucoes Futuras

- Testes automatizados.
- Deploy em ambiente controlado.
- Relatorios.
- Controle refinado de permissoes.
- Melhor interpretacao de texto no modulo de IA.
- Calculo de rota real para viaturas.
