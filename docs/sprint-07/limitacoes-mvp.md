# Limitacoes do MVP

## 1. Objetivo

Este documento registra as principais limitacoes tecnicas, academicas e eticas do MVP VigIA.

O objetivo e deixar claro que o projeto e um prototipo academico, baseado em dados simulados, e nao uma ferramenta real de seguranca publica.

## 2. Natureza Academica

O VigIA foi desenvolvido como Projeto Integrador academico.

Ele demonstra:

- Organizacao de uma aplicacao web full stack.
- API REST com Laravel.
- Interface web com React.
- Banco PostgreSQL com PostGIS.
- Mapa operacional.
- Microservico FastAPI.
- Sugestoes simples com IA.
- Indicadores, alertas e graficos.

Ele nao deve ser usado em ambiente real de policiamento, emergencia, despacho ou vigilancia.

## 3. Dados Simulados

Todos os dados usados no projeto sao ficticios.

O MVP nao usa:

- Dados reais de vitimas.
- Dados reais de suspeitos.
- Dados reais de policiais.
- Dados reais de atendentes.
- CPFs, telefones ou documentos reais.
- Placas reais.
- Enderecos completos reais.
- Bases oficiais de ocorrencias.

## 4. Limitacoes da IA

O modulo de IA atua apenas como apoio demonstrativo.

Limitacoes conhecidas:

- A sugestao de prioridade nao substitui decisao humana.
- A confianca retornada nao representa garantia estatistica real.
- O modelo baseado em regras depende de palavras-chave.
- A interpretacao de contexto e limitada.
- Negacoes podem ser interpretadas incorretamente.
- O modelo simples com Scikit-learn usa base simulada.
- Nao existe predicao criminal real.

Exemplo de limitacao:

```text
Roubo sem arma
```

O termo `arma` pode influenciar a classificacao mesmo quando aparece em contexto de negacao.

## 5. Limitacoes Operacionais

O MVP nao possui:

- Despacho real de viaturas.
- Integracao com sistemas oficiais.
- Notificacoes em tempo real.
- Controle completo de perfis e permissoes.
- Auditoria completa para ambiente produtivo.
- Monitoramento de disponibilidade.
- Deploy em producao.
- Testes automatizados completos de ponta a ponta.

## 6. Limitacoes do Mapa

O mapa usa dados simulados para:

- Ocorrencias.
- Viaturas.
- Regioes.
- Areas de risco.

As sugestoes de distancia e chegada sao simplificadas e nao consideram:

- Transito.
- Rotas reais.
- Sentido de vias.
- Bloqueios.
- Condicoes climaticas.
- Disponibilidade operacional real.

## 7. Limitacoes dos Alertas

Os alertas sao gerados por regras iniciais.

Eles nao representam:

- Analise criminal real.
- Predicao de eventos futuros.
- Recomendacao definitiva de despacho.
- Priorizacao obrigatoria de atendimento.

Devem ser interpretados apenas como indicadores simulados para demonstracao.

## 8. Cuidados Eticos e LGPD

O projeto deve respeitar:

- Uso exclusivo de dados ficticios.
- Transparencia sobre sugestoes automatizadas.
- Supervisao humana em decisoes sensiveis.
- Evitar classificacoes discriminatorias.
- Evitar uso operacional sem validacao tecnica, juridica e institucional.

## 9. Evolucoes Futuras

Possiveis evolucoes fora do MVP:

- Testes automatizados mais completos.
- Controle de permissoes por perfil.
- Melhor tratamento de linguagem natural.
- Modelo treinado com metodologia validada.
- Logs e auditoria mais robustos.
- Deploy em ambiente controlado.
- Melhor calculo de rotas.
- Relatorios exportaveis.
- Monitoramento de servicos.
