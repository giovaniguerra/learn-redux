# Implementation Plan: User CRUD (API + Cache + Native Android)

**Branch**: `main` | **Date**: 2025-11-09 | **Spec**: `/specs/main/spec.md`
**Input**: Feature specification from `/specs/main/spec.md`

## Summary

Build a simple React Native app with two screens (Users List and User Form) that:
- Fetches users from JSONPlaceholder (`GET /users`) via Axios
- Stores users in Redux Toolkit with persistence via Redux Persist + AsyncStorage for offline use
- Supports local create, edit, and delete (mutations are local due to JSONPlaceholder limitations)
- Adds a small Android native module (Kotlin) to show a toast and return device info

No automated tests (per constitution); validation and acceptance are manual and described in the spec.

## Technical Context

**Language/Version**: React Native 0.82.0 (TypeScript)  
**Primary Dependencies**: 
- `@reduxjs/toolkit`, `react-redux`
- `redux-persist`, `@react-native-async-storage/async-storage`
- `axios`
- `@react-navigation/native`, `@react-navigation/native-stack`, `react-native-screens`, `react-native-safe-area-context`
- `styled-components` (+ `@types/styled-components`)
**Storage**: Redux Persist + AsyncStorage (users slice persisted)  
**Testing**: No automated tests (constitutional constraint); manual acceptance per user story  
**Target Platform**: Android primary; iOS support planned — Android minSdk 24, targetSdk 34+; iOS 13+  
**Project Type**: mobile  
**Performance Goals**: 60 fps UI; initial list render ≤ 2s on first run; instant render from cache on relaunch  
**Constraints**: Offline-capable (cache-first with background refresh); minimal dependencies; composition-first UI  
**Scale/Scope**: Single feature, 2 screens, one Redux slice; small codebase

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Small and Simple: PASS — Scope limited to users list + form, minimal libs.
- Clean Code: PASS — Consistent TypeScript, feature folders, selectors/helpers.
- No Automated Tests: PASS — Only manual acceptance; no test frameworks added.
- Composition Over Inheritance: PASS — Functional components and composition.
- Changelog Maintenance: PASS — Tasks include updating `changelogs.md` per commit.
- Additional Constraints (RN Android/iOS; avoid unnecessary deps): PASS — Only essential libs listed.
- Development Workflow (branches): SHOULD — Prefer feature branch (e.g., `001-user-crud`); current work on `main` acceptable for solo project but feature branches recommended.
- Conventional Commits: PASS — Will use Conventional Commits for history.

No violations identified; if min OS versions or RN version introduce constraints, re-evaluate post Phase 1.

## Project Structure

### Documentation (this feature)

```text
specs/main/
├── plan.md
├── research.md          # Phase 0 decisions (to be generated)
├── data-model.md
├── quickstart.md
├── contracts/
│   └── openapi.yaml
└── tasks.md
```

### Source Code (repository root)

Android package name: `br.com.gbguerra.learnredux`

```text
src/
├── app/
│   └── store.ts
├── features/
│   └── users/
│       ├── usersSlice.ts
│       ├── usersThunks.ts
│       └── selectors.ts
├── services/
│   ├── api/
│   │   └── client.ts
│   └── usersApi.ts
├── screens/
│   ├── UsersListScreen.tsx
│   └── UserFormScreen.tsx
├── components/
│   └── UserListItem.tsx
├── navigation/
│   └── index.tsx
├── styles/
│   └── theme.ts
├── utils/
│   └── validation.ts
└── native/
    └── DeviceInfoModule.ts

android/
└── app/src/main/java/br/com/gbguerra/learnredux/
    ├── DeviceInfoModule.kt
    └── DeviceInfoPackage.kt

# tests/ intentionally omitted per constitution (no automated tests)
```

**Structure Decision**: Mobile single-app structure with feature-based folders. One Redux slice (`users`),
shared services, and two screens. Android native code housed under app package. No tests directory created
due to constitutional constraint.

## Complexity Tracking

No constitutional violations; no complexity exceptions required.
