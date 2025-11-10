import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'learnredux:v1:users';
const META_KEY = 'learnredux:v1:meta';

export type PersistedPayload = {
  __persistVersion: number;
  users?: unknown;
  meta?: unknown;
};

export async function loadPersistedState(): Promise<PersistedPayload | null> {
  try {
    const [usersRaw, metaRaw] = await AsyncStorage.multiGet([USERS_KEY, META_KEY]);
    const usersVal = usersRaw[1];
    const metaVal = metaRaw[1];
    if (!usersVal && !metaVal) return null;
    const payload: PersistedPayload = { __persistVersion: 1 };
    if (usersVal) payload.users = JSON.parse(usersVal);
    if (metaVal) payload.meta = JSON.parse(metaVal);
    return payload;
  } catch (err) {
    // Surface the error in logs so issues can be diagnosed in CI/dev
    // but return null so the app can continue with a fresh state.
  console.warn('loadPersistedState error', err);
    return null;
  }
}

let flushTimer: ReturnType<typeof setTimeout> | null = null;

export function subscribePersistence(getState: () => any, serialize: (state: any) => PersistedPayload) {
  return () => {
    const handler = () => {
      if (flushTimer) clearTimeout(flushTimer);
      flushTimer = setTimeout(async () => {
        try {
          const payload = serialize(getState());
          const sets: [string, string][] = [];
          if (payload.users) sets.push([USERS_KEY, JSON.stringify(payload.users)]);
          if (payload.meta) sets.push([META_KEY, JSON.stringify(payload.meta)]);
          await AsyncStorage.multiSet(sets);
        } catch (e) {
          console.warn('persist write error', e);
        }
      }, 500);
    };
    return handler;
  };
}

export async function clearPersistedState() {
  await AsyncStorage.multiRemove([USERS_KEY, META_KEY]);
}
