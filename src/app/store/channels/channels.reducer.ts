import { ChatChannel } from '@core/models/models';
import { createReducer, on } from '@ngrx/store';
import { ChannelsActions } from '@store/channels/channels.actions';

export type ChannelsState = ChatChannel[];
export const initialState: ChannelsState = [];

export const channelsReducer = createReducer(
  initialState,
  on(ChannelsActions.loadChannels, (state, payload) => {
    return [...payload.channels];
  }),
  on(ChannelsActions.reset, () => initialState),
);
