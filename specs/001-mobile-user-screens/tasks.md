# Implementation Tasks: 001-mobile-user-screens

This file contains an ordered set of small, testable tasks (each should be a
small PR) to implement the feature. Focus on TDD for store/persistence/sync.

Phase 1 — Project scaffold & tooling
1. Project: update `package.json` with runtime dependency exact pins and install.
   - Pin runtime deps (see `plan.md`) and run a dev build to verify no immediate
   conflicts.
   - TASK (verify deps): Run `npm install --package-lock-only` and/or `pnpm install` in CI
      mode to validate peer deps. For this project we will install with the
      `--legacy-peer-deps` flag to bypass temporary peer-dependency conflicts
      (per team decision). Example commands to document in `quickstart.md`:

      ```powershell
      npm install --legacy-peer-deps
      # or to only generate lockfile without full install
      npm install --package-lock-only --legacy-peer-deps
      ```
      If upstream libraries update and peer deps resolve, we'll remove the flag
      and migrate the lockfile.
2. Tooling: add / validate TypeScript, ESLint, Prettier, basic CI pipeline with
   steps: lint → typecheck → test.

Phase 2 — Design system & components
3. Create `src/design_system/tokens/colors.ts`, `typography.ts`, `spacing.ts`.
4. Implement core primitives: `src/design_system/Text.tsx`, `Box.tsx`, `Button.tsx`, `Input.tsx`.
   - Unit tests for accessibility and styling contract.

Phase 3 — Redux store + custom persistence
5. Create `src/store/index.ts` to configure Redux store and middleware (redux-thunk).
6. Implement React binding helpers (no `react-redux`):
    - Add `src/store/hooks.ts` with `useAppSelector`, `useAppDispatch`, and a
       small `useSubscribe` built on `useSyncExternalStore` to connect components
       to the store in a performant, typed way.
    - Add a lightweight `Provider` wrapper if needed to expose the store via
       React context for legacy code paths.
7. Implement `src/store/persistence.ts` — custom persistence helper that:
   - Reads persisted keys on init, runs migrations, and returns hydrated initial state.
   - Subscribes to store changes and writes debounced/batched payloads to AsyncStorage.
   - Exposes a small API for `forceFlush()` used by tests.
8. Implement `src/store/usersSlice.ts` — actions, reducer, selectors and thunks
   for list/add/edit. Thunks must call Axios via `services/api.ts`.
9. Unit tests: store reducers, persistence (migrations), thunks with mocked AsyncStorage/Axios.

Phase 4 — API service & sync manager
9. Implement `src/services/api.ts` wrapping Axios with retry/backoff.
10. Implement `src/services/syncManager.ts` that queues local actions and flushes
    them when online; integrate with NetInfo/AppState.
11. Integration tests for add→enqueue→sync flows (mock network toggles).

Phase 5 — Screens & navigation
12. Implement `src/screens/ListScreen.tsx` and `src/screens/EditScreen.tsx` using
    design system components.
13. Implement `src/navigation/TwoButtonNavigator.tsx` (simple two-button nav).
14. Wire screens to Redux store and thunks; add component-level tests.

Phase 6 — CI, tests, polish
15. Add CI checks: lint → typecheck → unit tests → integration tests.
16. Accessibility checks and performance smoke tests for list rendering/hydration.

Immediate next actions (priority):
- Verify dependency resolution (see task 1 details). If unresolved, update `plan.md`
   with the chosen remediation (React 18, swap styling, or accept legacy peer deps).
- Implement `src/store/hooks.ts` and unit-test it before wiring screens.

Notes
- Keep PRs small and test-first. Each task above should include at least one
  unit test (or integration test) that demonstrates the desired behavior.
