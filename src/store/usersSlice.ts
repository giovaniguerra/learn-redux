import { Action } from 'redux';
import axios from 'axios';

export type User = {
  id: number;
  name: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
};

export type UsersState = {
  byId: Record<number, User>;
  allIds: number[];
  lastSynced?: number;
};

const initialState: UsersState = {
  byId: {},
  allIds: [],
};

// Action types
const SET_USERS = 'users/SET_USERS';
const ADD_USER = 'users/ADD_USER';

type SetUsersAction = {
  type: typeof SET_USERS;
  payload: User[];
};

type AddUserAction = {
  type: typeof ADD_USER;
  payload: User;
};

type UsersAction = SetUsersAction | AddUserAction | Action<string>;

export function usersReducer(state = initialState, action: UsersAction): UsersState {
  switch (action.type) {
    case SET_USERS: {
      const users = (action as SetUsersAction).payload;
      const byId: Record<number, User> = {};
      const allIds: number[] = [];
      for (const u of users) {
        byId[u.id] = u;
        allIds.push(u.id);
      }
      return { ...state, byId, allIds, lastSynced: Date.now() };
    }
    case ADD_USER: {
      const u = (action as AddUserAction).payload;
      return {
        ...state,
        byId: { ...state.byId, [u.id]: u },
        allIds: state.allIds.includes(u.id) ? state.allIds : [...state.allIds, u.id],
      };
    }
    default:
      return state;
  }
}

// Action creators
export const setUsers = (users: User[]): SetUsersAction => ({ type: SET_USERS, payload: users });
export const addUser = (user: User): AddUserAction => ({ type: ADD_USER, payload: user });

// Thunks
export const fetchUsers = () => async (dispatch: any) => {
  const resp = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
  dispatch(setUsers(resp.data));
};

export const createUser = (user: Omit<User, 'id'>) => async (dispatch: any) => {
  const resp = await axios.post<User>('https://jsonplaceholder.typicode.com/users', user);
  dispatch(addUser(resp.data));
};

export default usersReducer;
