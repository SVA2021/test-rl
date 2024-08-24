import { ChatUser } from '@core/models/models';
import { createReducer, on } from '@ngrx/store';
import { UsersActions } from '@store/users/users.actions';

export type UsersState = ChatUser[];
export const initialState: UsersState = [];

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, (state, payload) => {
    return [...payload.users];
  }),
  on(UsersActions.reset, () => initialState),
);
