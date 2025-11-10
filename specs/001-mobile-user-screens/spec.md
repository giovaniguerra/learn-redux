# Feature Specification: Mobile — Users (two screens)

**Feature Branch**: `001-mobile-user-screens`  
**Created**: 2025-11-10  
**Status**: Draft  
**Input**: Quero criar um app mobile com duas telas: lista de usuários e adicionar/editar usuário. Navegação com dois botões. Schema do usuário: https://jsonplaceholder.typicode.com/users/1. Lista: https://jsonplaceholder.typicode.com/users. Abordagem: offline-first.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ver lista de usuários (Priority: P1)

Usuário abre o app e visualiza uma lista paginada/rolável de usuários previamente sincronizados. Quando o dispositivo estiver online, a lista tenta sincronizar em segundo plano e atualiza quando novos dados estiverem disponíveis.

Why this priority: Tela principal e critério de sucesso do MVP — sem a lista o app não atende o propósito básico.

Independent Test: Preparar um repositório de teste com usuários mock; verificar que a lista carrega localmente quando offline e atualiza após sincronização quando online.

Acceptance Scenarios:
1. Given: app foi aberto antes e já sincronizou dados; When: usuário abre o app offline; Then: a lista mostra os usuários armazenados localmente.
2. Given: usuário abre app online; When: sincronização encontra novas entradas; Then: lista é atualizada e UI reflete novos usuários.

---

### User Story 2 - Adicionar usuário (Priority: P2)

Usuário navega para a tela de adicionar, preenche os campos mínimos (nome, email, telefone) e salva. Se estiver offline, o usuário é criado localmente e marcado para sincronização; quando online, o registro é enviado ao backend e o identificador externo é reconciliado.

Why this priority: Criação é funcionalidade importante, mas a exibição da lista é mais crítica inicialmente.

Independent Test: Criar um usuário em modo offline, reiniciar o app e verificar persistência local; em seguida, simular online e confirmar envio/sincronização.

Acceptance Scenarios:
1. Given: app offline; When: usuário adiciona novo contato e salva; Then: contato aparece na lista local com estado "pendente".
2. Given: app volta online; When: sincronização ocorre; Then: contato replica para backend e estado muda para "sincronizado".

---

### User Story 3 - Editar usuário (Priority: P3)

Usuário seleciona um item da lista, edita campos e salva. Edição funciona offline e sincroniza quando o dispositivo estiver online. Em caso de conflito (edições remotas), aplicar estratégia de reconciliação documentada (ver Assumptions).

Independent Test: Editar localmente em modo offline, depois forçar sincronização e verificar que alterações foram persistidas e reconciliadas corretamente.

Acceptance Scenarios:
1. Given: usuário sincronizado; When: outro cliente altera o mesmo registro; Then: ao sincronizar, a estratégia de reconciliação (last-write-wins por timestamp) é aplicada e usuário notificado se necessário.

---

### Edge Cases

- Falha parcial de rede durante sincronização (algumas entidades falham enquanto outras passam).
- Edição simultânea do mesmo usuário em múltiplos dispositivos (conflitos de sync).
- Dados inválidos/ausentes vindos do usuário (validação de campos obrigatórios).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST exibir uma lista de usuários previamente sincronizados mesmo quando offline.
- **FR-002**: O sistema MUST permitir adicionar um usuário localmente enquanto offline e marcar o registro para sincronização.
- **FR-003**: O sistema MUST permitir editar um usuário localmente enquanto offline e marcar a alteração para sincronização.
- **FR-004**: O sistema MUST reconciliar registros criados/alterados localmente com o backend quando o dispositivo voltar online.
- **FR-005**: O system MUST indicar o estado de sincronização por registro (ex.: sincronizado, pendente, erro).
- **FR-006**: As operações de leitura/escrita locais MUST ser atômicas e tolerantes a falhas para evitar corrupção de dados.

### Non-functional Requirements

- **NFR-001**: A interface de lista MUST exibir os itens carregados localmente em <= 500ms p95 em dispositivos alvo (meta inicial).
- **NFR-002**: Sincronizações incrementais MUST minimizar uso de dados: enviar apenas registros alterados.
- **NFR-003**: A experiência offline MUST permitir CRUD local sem perda de dados em reinicializações do app.

## Constitution Compliance *(mandatory)*

- Code Quality: Spec assumes adherence to project code quality gates (typechecks/linting). All modules MUST have clear boundaries and unit tests for core logic (data store, sync manager, list renderer).
- Tests: Deliver unit tests for the local store and sync logic; integration tests for list → add/edit flows; contract tests to validate interactions with the external endpoints (GET /users, GET /users/1, POST/PUT as needed).
- UX: Use shared design tokens and accessible components for list items and forms. Primary flows MUST be keyboard and screen-reader friendly (labels, roles, focus order).
- Performance: Measure list load latency and sync duration; target list render p95 <= 500ms; document benchmarks in the plan.

## Key Entities *(include if feature involves data)*

- **User**: representation based on JSONPlaceholder schema (partial):
  - id (external id) — integer or string assigned by backend
  - name — string (required)
  - username — string
  - email — string (required, validated)
  - address — object (street, suite, city, zipcode) [optional for MVP]
  - phone — string
  - website — string
  - company — object (name) [optional]

*(Local records MAY include metadata fields: localId, lastModifiedTimestamp, syncState {pending/synced/error})*

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can open the app offline and view the last-synced user list (observable by an automated smoke test) — 100% of attempts in test scenario.
- **SC-002**: Creating a user offline and then reconnecting results in the user appearing on the server within the sync window (within 60s under normal network) in 95% of runs in staging tests.
- **SC-003**: List rendering latency for 50 users is <= 500ms p95 on target devices in benchmark runs.
- **SC-004**: At least one unit test per core module (store, sync, list renderer) and integration test covering add→sync flow are present and pass in CI.

## Assumptions

- The codebase is a React Native mobile app and the team will prefer TypeScript for type-safety (this is an assumption to guide implementation; if incorrect, update before planning).
- The backend will accept creation and update operations compatible with JSONPlaceholder-style resources (the spec uses their schema as reference). For a real backend, API contract details will be finalized in the plan.
- Sync conflict resolution default: last-write-wins by timestamp. If stronger guarantees required, plan will include conflict resolution policy and UX for merge.

## Next steps

1. Confirm acceptance of assumptions (esp. conflict resolution and chosen local persistence model).
2. Prepare `plan.md` with technical choices (store technology, sync strategy, CI benchmarks) and per-PR checklist linking to this spec.
3. Implement baseline test harness and add unit tests for store and sync logic before UI implementation.

