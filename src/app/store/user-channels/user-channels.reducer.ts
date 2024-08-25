import { UserChannel } from '@core/models/models';
import { createReducer, on } from '@ngrx/store';
import { UserChannelsActions } from '@store/user-channels/user-channels.actions';

export type UserChannelsState = UserChannel[];
export const initialState: UserChannelsState = [];

export const userChannelsReducer = createReducer(
  initialState,
  on(UserChannelsActions.loadUserChannels, (state, payload) => {
    return [...payload.channels];
  }),
  on(UserChannelsActions.reset, () => initialState),
);
