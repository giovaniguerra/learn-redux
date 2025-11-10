# Quickstart (User CRUD Feature)

## Install & Run

```powershell
npm install
npm start
npm run android   # or: npm run ios
```

## Manual Test Checklist

1. First launch loads remote users.
2. Relaunch shows cached users instantly.
3. Add user via form → appears at top.
4. Edit existing user → updated fields persist.
5. Delete user → removed permanently.
6. Android only: Tap Device Info → toast + model string.

## Troubleshooting
- If API slow: Check network; fallback to cached list.
- If native module fails: Rebuild Android (`cd android; ./gradlew clean`).
