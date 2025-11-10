# Generated Implementation Tasks: 001-mobile-user-screens

This file contains the full, speckit-compliant checklist for the feature. It mirrors the intended `tasks.md` content but is written to a separate file to avoid overwrite issues; you can review and rename if it looks good.

Phase 1 — Setup (project-level)
- [ ] T001 Initialize runtime deps and lockfile — install with legacy peer-deps; update `package-lock.json` (root)
  - Path: `package.json`, `package-lock.json`
- [ ] T002 Add CI skeleton (lint → typecheck → test) and a job that runs install with `--legacy-peer-deps`
  - Path: `.github/workflows/ci.yml`
- [ ] T003 Add editor config and Prettier/ESLint config checks to CI (if missing)
  - Path: `.github/workflows/ci.yml`, `.eslintrc.js`, `.prettierrc`

Phase 2 — Foundational (blocking prerequisites)
- [ ] T004 [P] Create design tokens files: `src/design_system/tokens/colors.ts`, `src/design_system/tokens/typography.ts`, `src/design_system/tokens/spacing.ts`
- [ ] T005 [P] Implement basic design primitives: `src/design_system/Box.tsx`, `src/design_system/Text.tsx`, `src/design_system/Button.tsx`, `src/design_system/Input.tsx`
  - Each primitive should have a minimal unit test under `tests/unit/` verifying render and accessibility props.
- [ ] T006 Create API wrapper: `src/services/api.ts` (Axios instance, base config, retry/backoff placeholder)
- [ ] T007 Create typed Redux store bootstrap: `src/store/store.ts` (configureAppStore) and export `RootState`/`AppDispatch`
- [ ] T008 Add typed react-redux hooks wrapper: `src/store/hooks.ts` exporting `useAppSelector` and `useAppDispatch`
- [ ] T009 Implement persistence helper: `src/store/persistence.ts` (loadPersistedState, subscribePersistence, clearPersistedState)
- [ ] T010 Add test helpers and mocks: `tests/setup/mocks/AsyncStorageMock.ts`, `tests/setup/mocks/axiosMock.ts`

Phase 3 — User Story Phases (priority order)

User Story 1 — View user list (US1, Priority P1)
- [ ] T011 [US1] Define User type and local metadata: `src/types/user.ts`
- [ ] T012 [US1] Implement users reducer and actions: `src/store/usersSlice.ts` (ensure selectors for list and byId)
- [ ] T013 [US1] Implement thunk to fetch users and dispatch setUsers: `src/store/usersSlice.ts` (fetchUsers)
- [ ] T014 [US1] Add persistence hydration at store init: update `src/store/store.ts` to call `loadPersistedState()` and use hydrated preloadedState
- [ ] T015 [US1] Create `ListScreen` UI: `src/screens/ListScreen.tsx` — reads from store and renders FlatList with accessibility props
- [ ] T016 [US1] Write unit tests: `tests/unit/store/users.test.ts` (reducer + fetchUsers thunk with mocked Axios)
- [ ] T017 [US1] Write integration test: `tests/integration/us1-hydration.test.ts` — simulate persisted state, mount store and assert `ListScreen` shows persisted users
- [ ] T018 [US1] Add UI: connect `ListScreen` in `App.tsx` and ensure store provider is wired

User Story 2 — Add user (US2, Priority P2)
- [ ] T019 [US2] Implement local add user action and reducer handling in `src/store/usersSlice.ts` (persist pending state metadata)
- [ ] T020 [US2] Implement createUser thunk that queues creation when offline and posts when online: `src/store/usersSlice.ts` / `src/services/syncManager.ts`
- [ ] T021 [US2] Create `EditScreen` add-mode UI: `src/screens/EditScreen.tsx` (form with name/email/phone and validation)
- [ ] T022 [US2] Add local validation utils: `src/utils/validation.ts` and unit tests `tests/unit/utils/validation.test.ts`
- [ ] T023 [US2] Integration test (offline add): `tests/integration/us2-offline-add.test.ts` — add while offline, restart store, assert persisted pending record
- [ ] T024 [US2] Integration test (sync): `tests/integration/us2-sync.test.ts` — mock network available, run syncManager and assert backend call via axiosMock and record becomes synced

User Story 3 — Edit user (US3, Priority P3)
- [ ] T025 [US3] Implement edit action and reducer updates in `src/store/usersSlice.ts` (track local changes with lastModifiedTimestamp)
- [ ] T026 [US3] Extend `EditScreen` to support edit-mode (pre-fill fields, save updates)
- [ ] T027 [US3] Implement sync conflict handling in `src/services/syncManager.ts` (last-write-wins by timestamp) and unit tests `tests/unit/services/syncManager.test.ts`
- [ ] T028 [US3] Integration test (offline edit then sync): `tests/integration/us3-offline-edit.test.ts`
- [ ] T029 [US3] UI test: ensure `ListScreen` reflects edits immediately after save (unit/integration)

Phase 4 — Cross-cutting & polish
- [ ] T030 Add per-record sync state indicator component and use it in `ListScreen`: `src/components/SyncBadge.tsx`
- [ ] T031 Add analytics/logging hooks for sync events: `src/services/logging.ts` and tests
- [ ] T032 Add migration tests and migration helper: extend `src/store/persistence.ts` with migrations and tests `tests/unit/persistence.migrations.test.ts`
- [ ] T033 Add accessibility audit checklist and automated checks for primary flows (list and edit) in CI
- [ ] T034 Add performance smoke test for list render (50 items) and wire to CI as an optional job: `tests/perf/listRender.test.ts`

Dependencies (story order & blocking)
- US1 (T011–T018) must be completed first (MVP). Many tasks in US2 and US3 depend on store/persistence (T007–T009).
- T001/T002/T003 are setup steps and should be present before CI runs other tasks.

Parallel opportunities
- [P] T004 and T005 (design tokens and primitives) can be implemented in parallel with T006/T007/T008 (API and store bootstrap).
- [P] Component-level tests (for Button/Input/Text) can be implemented in parallel with store unit tests.

Task counts and summary
- Total tasks: 34
- Tasks per story: US1 = 8, US2 = 6, US3 = 5, Setup/Foundational/Cross-cutting = 15
- Suggested MVP: Complete US1 tasks (T011–T018) + foundational tasks (T004–T010)

How to run tests locally (example)
```
npm install --legacy-peer-deps
npm run lint
npm test -- --runInBand
```

Notes
- Keep PRs small: prefer one feature per PR (e.g., T011+T012 as one PR; T015 in a separate PR with tests).
- Every task that touches store/persistence must include unit tests that mock AsyncStorage and Axios.
