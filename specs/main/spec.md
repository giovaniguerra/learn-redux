# Feature Specification: User CRUD (with API, Cache, and Native Android)

**Feature Branch**: `main`  
**Created**: 2025-11-09  
**Status**: Draft  
**Input**: Incorporates JSONPlaceholder API integration, AsyncStorage caching, and Android native Kotlin module.

## User Stories & Priorities

### User Story 1 - View and refresh users (Priority: P1)
Users can view a paginated list of users fetched from JSONPlaceholder and cached locally for offline use.

- Independent Test: Launch app on a fresh install → list loads from API, subsequent launches load instantly from cache; manual refresh refetches API.
- Acceptance Scenarios:
  1. Given first run with no cache, when opening Home, then users are fetched from `GET /users` and displayed within 2 seconds.
  2. Given existing cache, when reopening app, then list renders from cache instantly and updates in background from API.
  3. Given pull-to-refresh, when user pulls, then cache is updated and UI reflects latest data.

### User Story 2 - Add a new user (Priority: P2)
Users can add a new user locally; change is persisted to AsyncStorage and reflected in the list.

- Independent Test: From list, create user → user appears immediately and persists across app restarts.
- Acceptance Scenarios:
  1. Given valid form inputs, when saving, then a new user item appears at top of the list with a locally generated ID and is cached.
  2. Given missing required fields, when saving, then the form shows validation messages for name and email.

### User Story 3 - Edit an existing user (Priority: P2)
Users can edit an existing user; changes persist to cache and update UI.

- Independent Test: Edit a user’s name → list item updates and survives app restart.
- Acceptance Scenarios:
  1. Given a selected user, when editing fields and saving, then the item reflects new values and cache updates.
  2. Given invalid email format, when saving, then a validation error is shown.

### User Story 4 - Delete a user (Priority: P3)
Users can delete a user from the list; deletion persists to cache and updates UI.

- Independent Test: Delete an item → it disappears and remains deleted after restart.
- Acceptance Scenarios:
  1. Given a user in list, when tapping delete and confirming, then the item is removed and cache written.

### User Story 5 - Android native module (Kotlin) (Priority: P3)
App exposes a simple Android native Kotlin module to return device info and show a toast from React Native.

- Independent Test: Press a “Device Info” button → shows toast via native call and displays model string in UI.
- Acceptance Scenarios:
  1. Given Android device, when pressing button, then a native toast appears.
  2. Given Android device, when pressing button, then a device model string from native layer renders on screen.

## Requirements

- Redux Toolkit + Redux Persist/AsyncStorage for state and cache
- Axios for API calls to JSONPlaceholder (`https://jsonplaceholder.typicode.com/users`)
- React Navigation for two screens (List, Form)
- TypeScript and Styled Components
- Android native code (Kotlin) bridged to React Native

## Entities

- User: id, name, email, phone, username?, website?, address?, company? (subset rendered on list)

## Notes
- JSONPlaceholder mutating endpoints aren’t persisted server-side. For create/update/delete, apply local state updates and cache to AsyncStorage; server calls may be simulated/optional.
- No automated tests required by constitution. Manual test criteria included per story.
