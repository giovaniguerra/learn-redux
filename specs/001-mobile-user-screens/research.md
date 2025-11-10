# Research: Mobile — Users (two screens)

Date: 2025-11-10

Purpose: Resolve open technical choices required to implement the offline-first React
Native app with Redux-driven API calls, styled-components UI, AsyncStorage persistence,
and Axios networking.

Decisions

- Decision: Language & framework versions
  - Decision: Use TypeScript (>=4.9) and React Native (>=0.70). These versions are
    modern and compatible with styled-components and current community tooling.
  - Rationale: TypeScript provides static typing required by the constitution; RN
    0.70+ offers stable APIs and tooling.
  - Alternatives considered: RN older versions (not recommended); Expo managed
    workflow (possible but team preference unknown).

- Decision: Redux middleware
  - Decision: Use `redux-thunk` for asynchronous logic and API orchestration.
  - Rationale: Simpler to reason about for a small app, lower cognitive overhead
    than `redux-saga`. Thunks can dispatch actions that update sync metadata.

- Decision: Local persistence
  - Decision: Use `redux-persist` with AsyncStorage as the backing store. Persist
    the `users` slice and minimal metadata. For large datasets consider switching
    to MMKV or SQLite later.
  - Rationale: Fast to implement and integrates with Redux; AsyncStorage is cross-platform.

- Decision: Sync strategy & conflict resolution
  - Decision: Implement a custom `syncManager` service that queues offline actions
    (create/edit) and flushes them when connectivity returns. Conflict resolution
    default: last-write-wins by ISO timestamp; document UX for manual conflict
    resolution in a follow-up if needed.
  - Rationale: Custom sync manager keeps control in-app and plays well with Redux.

- Decision: UI toolkit
  - Decision: Use `styled-components/native` for styling and create a small
    design system under `src/design_system` containing tokens for colors, typography,
    and spacing plus primitives (Text, Box, Button, Input).
  - Rationale: Matches the user's request and encourages composable components.

- Decision: API client
  - Decision: Use Axios with a central `services/api.ts` wrapper. Support retries
    with exponential backoff for transient errors and attach idempotency keys for
    write operations.

Open items (NEEDS CLARIFICATION)

- Exact React Native and TypeScript versions to pin in `package.json` (suggest: RN 0.72, TS 5.x) — Q1
- Choose E2E framework: Detox vs Playwright mobile vs Appium — Q2
- Secrets management strategy for production (secure store, CI secrets) — Q3

For Q1–Q3 provide answers in planning review or accept suggested defaults.

Findings summary: The chosen stack (TypeScript, React Native, Redux-thunk,
redux-persist, Axios, styled-components) meets the constitution's emphasis on
type safety, testing, and composable UI. The sync approach uses Redux thunks and
a dedicated sync manager for clear ownership and testability.
