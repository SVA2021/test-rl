import { Action, ActionReducer } from '@ngrx/store';
import { usersReducer, UsersState } from '@store/users/users.reducer';
import { channelsReducer, ChannelsState } from "@store/channels/channels.reducer";
import { userChannelsReducer, UserChannelsState } from "@store/user-channels/user-channels.reducer";
import { messagesReducer, MessagesState } from "@store/messages/messages.reducer";

export interface AppState {
  channels: ChannelsState;
  messages: MessagesState;
  userChannels: UserChannelsState;
  users: UsersState;
}

export interface AppStore {
  channels: ActionReducer<ChannelsState, Action>;
  messages: ActionReducer<MessagesState, Action>;
  userChannels: ActionReducer<UserChannelsState, Action>;
  users: ActionReducer<UsersState, Action>;
}

export const appStore: AppStore = {
  channels: channelsReducer,
  messages: messagesReducer,
  userChannels: userChannelsReducer,
  users: usersReducer,
};
