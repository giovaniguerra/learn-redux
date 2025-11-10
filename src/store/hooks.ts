import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState } from './store';
import type { ThunkDispatch } from 'redux-thunk';

// Typed hooks wrapper — central place to keep typing consistent
export const useAppDispatch = () => useDispatch<ThunkDispatch<RootState, unknown, any>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// keep file focused on typed hooks; no default export
