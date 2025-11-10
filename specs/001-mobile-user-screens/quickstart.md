# Quickstart: Mobile — Users (two screens)

This quickstart helps contributors get the feature running locally for development
and testing. It assumes a macOS or Linux machine for iOS/android simulator
development. Windows users can use Android tooling.

1. Install dependencies

```bash
# Install Node and Yarn/PNPM as preferred
nvm install --lts
npm install -g yarn
yarn install
```

2. Install CocoaPods (iOS)

```bash
cd ios
pod install
cd ..
```

3. Run the app

Android (emulator / device):

```bash
yarn android
```

iOS (simulator):

```bash
yarn ios
```

4. Tests

Unit & integration (Jest):

```bash
yarn test
```

E2E (if configured - recommendation: Detox):

```bash
# Setup per Detox docs and run: npx detox test
```

5. Development notes

- Story: use `src/design_system` tokens and primitives when creating UI.
- API calls MUST be made from Redux thunks; avoid calling services directly from components.
- Local data stored via `redux-persist` + AsyncStorage; sync handled by `services/syncManager`.

6. Benchmarks & performance checks

- Run the list rendering performance benchmark with the test harness (to be added)
  and ensure p95 <= 500ms for ~50 users on target devices. Document results in `research.md`.
