import { Action, ActionReducer } from '@ngrx/store';
import { usersReducer, UsersState } from '@store/users/users.reducer';
import { channelsReducer, ChannelsState } from "@store/channels/channels.reducer";

export interface AppState {
  channels: ChannelsState;
  users: UsersState;
}

export interface AppStore {
  channels: ActionReducer<ChannelsState, Action>;
  users: ActionReducer<UsersState, Action>;
}

export const appStore: AppStore = {
  channels: channelsReducer,
  users: usersReducer,
};
