# Implementation Plan: Redux Mobile App with TypeScript

## Technical Context

### Project Overview
This project involves building a mobile app using React Native with TypeScript. The app will demonstrate Redux concepts as outlined in `topicos_redux.txt`. The app will include user listing and user management (CRUD) features, with a focus on modern development practices.

### Key Technologies
- **React Native**: Framework for building mobile apps.
- **TypeScript**: For type safety and better developer experience.
- **Redux Toolkit**: For state management.
- **Styled Components**: For styling the app.
- **Axios**: For API integration.
- **AsyncStorage**: For caching API responses.
- **Kotlin**: For native Android classes.
- **Kotlin Script (KTS)**: For Gradle configuration.

### APIs
- User APIs are documented at [JSONPlaceholder Guide](https://jsonplaceholder.typicode.com/guide/).

## Constitution Check
- **Small and Simple**: The app will focus on user CRUD functionality.
- **Clean Code**: Code will follow best practices, including TypeScript and Styled Components.
- **No Automated Tests**: Testing will be manual, with steps documented in the README.
- **Git Flow**: Development will follow the Git Flow branching model.
- **Conventional Commits**: All commits will adhere to the Conventional Commits specification.

## Phases

### Phase 0: Setup & Research
- **Tasks**:
  - Initialize a React Native project with TypeScript.
  - Install dependencies: Redux Toolkit, react-redux, Styled Components, Axios, AsyncStorage, React Navigation.
  - Configure Android native code with Kotlin and KTS.
  - Create a basic folder structure: `src/`, `src/store/`, `src/screens/`, `src/components/`.
- **Output**:
  - A basic React Native app with TypeScript and initial configurations.

### Phase 1: State Management Basics
- **Tasks**:
  - Explain Redux architecture: store, actions, reducers.
  - Implement a basic store with `configureStore`.
  - Create slices for user management.
  - Connect Redux to React Native using `Provider`.
- **Output**:
  - A functional app with a global store and basic state management.

### Phase 2: API Integration
- **Tasks**:
  - Use Axios to fetch user data from JSONPlaceholder.
  - Cache API responses using AsyncStorage.
  - Handle loading and error states.
- **Output**:
  - Integrated API with caching and error handling.

### Phase 3: UI Development
- **Tasks**:
  - Design user listing and user form screens using Styled Components.
  - Implement navigation between screens using React Navigation.
  - Optimize UI for mobile performance.
- **Output**:
  - A fully functional and styled mobile app.

### Phase 4: Advanced Topics
- **Tasks**:
  - Introduce middleware (e.g., Redux Thunk).
  - Discuss project structure and best practices.
  - Demonstrate debugging with Redux DevTools.
- **Output**:
  - An app with advanced Redux features and a clear structure.

### Phase 5: Finalization
- **Tasks**:
  - Document the app and teaching steps in the README.
  - Create a summary of Redux concepts covered.
  - Prepare the app for distribution (e.g., APK, TestFlight).
- **Output**:
  - A complete teaching app ready for use.

## Follow-Up
- Update related templates and documentation.
- Ensure alignment with the project constitution.
- Gather feedback from learners to improve the plan.