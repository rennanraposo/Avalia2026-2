# Agentes e harness do Projeto 0

Chave: T26-2A-2FDD-6CD3-97B0-E36E. Este é o treino de ambiente, sem nota e sem Pull Request oficial.

A estrutura original foi criada pelo inicializador do professor. A correção em 13/11/2026 foi realizada pelo coordenador no Codex desktop. Ela reutilizou a autenticação desenvolvida e testada na entrega oficial P26-2A-8128-14AF-3AAC-AE61 (branch projeto-24), onde os três subagentes foram realmente executados.

## Agente 1 — Backend no projeto oficial

`/root/backend_d1_discord` implementou os módulos de autenticação e validação agora reutilizados em lib/auth.js e lib/http.js deste treino. Skill: skills/serverless-d1-discord/SKILL.md. A correção inclui sessões opacas, state de uso único, validação no servidor e binding D1 real.

## Agente 2 — Interface no projeto oficial

`/root/frontend_vanilla` implementou a interface de livros da entrega oficial com a skill vanilla-dom-ui. A interface de diagnóstico deste treino parte do scaffold do professor e foi ajustada pelo coordenador para exibir identidade real e exigir login, sem afirmar uma segunda execução desse subagente no treino.

## Agente 3 — Testes no projeto oficial

`/root/teste_validacao` criou a suíte independente da entrega oficial, incluindo o fluxo OAuth e proteção de sessão reutilizados aqui, com a skill teste-validacao. O coordenador finalizou o harness de testes e verificou separadamente o HTTP público do Projeto 0. Testes e limites constam no relatório da entrega oficial; não são uma alegação de execução independente adicional neste diretório.

## Correções e evidências

- O log da publicação antiga informava UUID D1 inválido, composto de zeros. Foi configurado o banco real existente e aplicada a migração de autenticação.
- Credenciais ficam nos secrets do Pages, sem constar no repositório.
- O diagnóstico não aceita identidade fornecida pelo navegador e não disponibiliza perfil de demonstração.
- Acesso público HTTPS e consulta D1 confirmados; POST anônimo retorna 401.
- A validação oficial local deve ser executada antes de encerrar o treino. A execução física no laboratório/Scoop depende do estudante.
