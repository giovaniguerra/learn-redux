---

description: "Task list for User CRUD feature"
---

# Tasks: User CRUD (with API, Cache, and Native Android)

**Input**: Design documents from `/specs/main/`
**Prerequisites**: plan.md (required), spec.md (user stories), data-model.md, contracts/openapi.yaml, quickstart.md

**Tests**: Not requested by constitution; manual acceptance per story included in spec.

**Organization**: Tasks grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Update `package.json` with deps: `@reduxjs/toolkit`, `react-redux`, `@react-native-async-storage/async-storage`, `redux-persist`, `axios`, `@react-navigation/native`, `@react-navigation/native-stack`, `react-native-screens`, `react-native-safe-area-context`, `styled-components`, `@types/styled-components`
- [x] T002 Create base folders in `src/`: `app/`, `features/users/`, `services/`, `screens/`, `navigation/`, `components/`, `styles/`, `native/`
- [x] T003 [P] Create Redux store with persist config in `src/app/store.ts`
- [x] T004 [P] Create Axios API client in `src/services/api/client.ts`
- [x] T005 [P] Configure navigation container and stack in `src/navigation/index.tsx`
- [x] T006 Add app entry composition (Provider, PersistGate, NavigationContainer) in `App.tsx`
- [x] T007 [P] Create theme and styled-components setup in `src/styles/theme.ts`
- [x] T008 Configure TypeScript paths/types if needed in `tsconfig.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T009 Create `usersSlice` with types and initial state in `src/features/users/usersSlice.ts`
- [x] T010 [P] Add selectors and helpers in `src/features/users/selectors.ts`
- [x] T011 [P] Wire `users` reducer into persisted root reducer in `src/app/store.ts`
- [x] T012 [P] Implement Users API service (list endpoint) in `src/services/usersApi.ts`
- [x] T013 Add root stack routes (UsersList, UserForm) in `src/navigation/index.tsx`
- [x] T014 [P] Create validation utilities (name/email) in `src/utils/validation.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View and refresh users (Priority: P1) 🎯 MVP

**Goal**: List users from API with cache + pull-to-refresh

**Independent Test**: Fresh install loads from API; relaunch reads cache; pull-to-refresh updates list

### Implementation

- [ ] T015 [P] [US1] Create list screen UI in `src/screens/UsersListScreen.tsx`
- [ ] T016 [P] [US1] Create list item component in `src/components/UserListItem.tsx`
- [ ] T017 [US1] Thunks: fetchUsers (API→store→persist) in `src/features/users/usersThunks.ts`
- [ ] T018 [US1] Connect list screen to store (selectors, dispatch) in `src/screens/UsersListScreen.tsx`
- [ ] T019 [US1] Implement pull-to-refresh and background refresh in `src/screens/UsersListScreen.tsx`
- [ ] T020 [US1] Handle loading/error/empty states in `src/screens/UsersListScreen.tsx`

**Checkpoint**: US1 fully functional and testable independently

---

## Phase 4: User Story 2 - Add a new user (Priority: P2)

**Goal**: Add user locally with validation and persistence

**Independent Test**: Create user and verify it persists across restarts

### Implementation

- [ ] T021 [P] [US2] Create form screen UI (create mode) in `src/screens/UserFormScreen.tsx`
- [ ] T022 [US2] Add createUser reducer/action in `src/features/users/usersSlice.ts`
- [ ] T023 [US2] Wire navigation from list FAB/button → form in `src/screens/UsersListScreen.tsx`
- [ ] T024 [US2] Validate name/email; show messages in `src/screens/UserFormScreen.tsx`
- [ ] T025 [US2] Persist created user to cache via store in `src/features/users/usersSlice.ts`

**Checkpoint**: US2 independently testable (create-only path)

---

## Phase 5: User Story 3 - Edit an existing user (Priority: P2)

**Goal**: Edit user and persist changes

**Independent Test**: Edit field(s) and verify persistence across restart

### Implementation

- [ ] T026 [P] [US3] Form screen edit mode (prefill by ID) in `src/screens/UserFormScreen.tsx`
- [ ] T027 [US3] Add updateUser reducer/action in `src/features/users/usersSlice.ts`
- [ ] T028 [US3] Navigate to edit from list item action in `src/components/UserListItem.tsx`
- [ ] T029 [US3] Validation and error states in `src/screens/UserFormScreen.tsx`

**Checkpoint**: US3 complete and independent

---

## Phase 6: User Story 4 - Delete a user (Priority: P3)

**Goal**: Delete user and persist removal

**Independent Test**: Delete an item and confirm it stays deleted after restart

### Implementation

- [ ] T030 [P] [US4] Add deleteUser reducer/action in `src/features/users/usersSlice.ts`
- [ ] T031 [US4] Hook delete action to list item (with confirm) in `src/components/UserListItem.tsx`
- [ ] T032 [US4] Ensure cache writes after delete via persisted reducer in `src/app/store.ts`

**Checkpoint**: US4 complete and independent

---

## Phase 7: User Story 5 - Android native module (Kotlin) (Priority: P3)

**Goal**: Expose Kotlin native module for device info and toast

**Independent Test**: Button triggers native toast and displays device model string

### Implementation

- [ ] T033 [P] [US5] Create Kotlin module `DeviceInfoModule.kt` in `android/app/src/main/java/<pkg>/DeviceInfoModule.kt`
- [ ] T034 [P] [US5] Register package `DeviceInfoPackage.kt` in `android/app/src/main/java/<pkg>/DeviceInfoPackage.kt`
- [ ] T035 [US5] Link module in `MainApplication.java|kt` under packages list
- [ ] T036 [US5] JS bridge wrapper `DeviceInfoModule.ts` in `src/native/DeviceInfoModule.ts`
- [ ] T037 [US5] UI button and integration on list screen in `src/screens/UsersListScreen.tsx`

**Checkpoint**: US5 native integration demonstrable on Android

---

## Phase N: Polish & Cross-Cutting

- [ ] T038 [P] Add basic theming and spacing normalization in `src/styles/theme.ts`
- [ ] T039 Improve empty/error states copy and visuals in `src/screens/UsersListScreen.tsx`
- [ ] T040 [P] Update `README.md` quickstart and `specs/main/quickstart.md`
- [ ] T041 Ensure `changelogs.md` updated for significant changes in repository root

---

## Dependencies & Execution Order

### Phase Dependencies
- Setup (Phase 1): none
- Foundational (Phase 2): depends on Setup completion; blocks all stories
- US1 (P1): depends on Phase 2
- US2 (P2): depends on US1 structure but testable independently
- US3 (P2): depends on US1 and US2 entities
- US4 (P3): depends on US1 entities
- US5 (P3): independent of data stories; depends on Setup (Android build)

### User Story Dependencies
- US1 → base
- US2 → create
- US3 → edit (depends on entity shape in US2/US1)
- US4 → delete (depends on entity shape in US1)
- US5 → native (independent of CRUD)

### Within Each User Story
- Models before services before UI wiring
- Validate before save
- Persisted state after each mutation

### Parallel Opportunities
- T003/T004/T005/T007 can run in parallel
- Within US1: T015 and T016 parallel; T017 can start after T012
- US5 can start any time after Android build is healthy

---

## Implementation Strategy

### MVP First (User Story 1 Only)
1. Complete Phase 1 + 2
2. Implement US1 list + caching
3. Demo and validate

### Incremental Delivery
1. Add US2 (create)
2. Add US3 (edit)
3. Add US4 (delete)
4. Add US5 (native)

