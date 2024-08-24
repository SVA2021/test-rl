import { Action, ActionReducer } from '@ngrx/store';
import { usersReducer, UsersState } from '@store/users/users.reducer';

export interface AppState {
  users: UsersState;
}

export interface AppStore {
  users: ActionReducer<UsersState, Action>;
}

export const appStore: AppStore = {
  users: usersReducer,
};
