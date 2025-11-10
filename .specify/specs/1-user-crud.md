# Feature Specification: User CRUD App

## Feature Description
This feature involves building a user CRUD (Create, Read, Update, Delete) application with two main screens:
1. **User Listing Screen:** Displays a list of users with options to edit or delete.
2. **User Form Screen:** Allows adding a new user or editing an existing user.

## User Scenarios & Testing

### Scenario 1: Viewing Users
- **Given**: The user opens the app.
- **When**: The app loads the user listing screen.
- **Then**: A list of users is displayed, fetched from the global state.

### Scenario 2: Adding a New User
- **Given**: The user is on the user listing screen.
- **When**: The user taps the "Add User" button.
- **Then**: The user form screen is displayed, allowing the user to input details and save.

### Scenario 3: Editing an Existing User
- **Given**: The user is on the user listing screen.
- **When**: The user taps the "Edit" button next to a user.
- **Then**: The user form screen is displayed, pre-filled with the user's details, allowing edits.

### Scenario 4: Deleting a User
- **Given**: The user is on the user listing screen.
- **When**: The user taps the "Delete" button next to a user.
- **Then**: The user is removed from the list and the global state is updated.

## Functional Requirements

1. **User Listing Screen**
   - Display a list of users fetched from the Redux store.
   - Provide buttons for editing and deleting users.

2. **User Form Screen**
   - Allow adding a new user with fields for name, email, and phone.
   - Allow editing an existing user with pre-filled fields.
   - Validate required fields (e.g., name and email).

3. **Global State Management**
   - Use Redux Toolkit to manage user data.
   - Implement actions for adding, editing, and deleting users.

4. **Navigation**
   - Use React Navigation to switch between the listing and form screens.

## Success Criteria

1. Users can view a list of users within 2 seconds of opening the app.
2. Users can add, edit, and delete users, with changes reflected immediately in the list.
3. The app handles validation errors gracefully, displaying user-friendly messages.
4. The app maintains state persistence using AsyncStorage.

## Assumptions

1. The app will use Redux Toolkit for state management.
2. Navigation will be implemented using React Navigation.
3. State persistence will be handled using AsyncStorage.

## Key Entities

1. **User**
   - Fields: `id`, `name`, `email`, `phone`
   - Relationships: None

## Dependencies

1. Redux Toolkit
2. React Navigation
3. AsyncStorage

## Notes
- This feature does not include automated tests, as per the project constitution.
- All commits must follow the Conventional Commits specification.

---

**Branch Name**: `1-user-crud`