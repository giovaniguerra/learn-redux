import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import usersReducer from './usersSlice';

const rootReducer = combineReducers({
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default function configureAppStore(preloadedState?: Partial<RootState>) {
  const store = createStore(rootReducer as any, preloadedState as any, applyMiddleware(thunk));
  return store;
}
