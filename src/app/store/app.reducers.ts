import { Action, ActionReducer } from '@ngrx/store';
import { usersReducer, UsersState } from '@store/users/users.reducer';
import { channelsReducer, ChannelsState } from "@store/channels/channels.reducer";
import { userChannelsReducer, UserChannelsState } from "@store/user-channels/user-channels.reducer";

export interface AppState {
  channels: ChannelsState;
  userChannels: UserChannelsState;
  users: UsersState;
}

export interface AppStore {
  channels: ActionReducer<ChannelsState, Action>;
  userChannels: ActionReducer<UserChannelsState, Action>;
  users: ActionReducer<UsersState, Action>;
}

export const appStore: AppStore = {
  channels: channelsReducer,
  userChannels: userChannelsReducer,
  users: usersReducer,
};
