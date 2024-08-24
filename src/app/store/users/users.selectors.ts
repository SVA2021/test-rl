import { AppState } from '@store/app.reducers';
import { createSelector } from '@ngrx/store';

export const selectUsersFeature = (state: AppState) => state.users;

export const selectUsers = createSelector(selectUsersFeature, (users) => users);
