import { AppState } from '@store/app.reducers';
import { createSelector } from '@ngrx/store';

export const selectUserChannelsFeature = (state: AppState) => state.userChannels;

export const selectAllUserChannels = createSelector(selectUserChannelsFeature, (channels) => channels);

export const selectUsersByChannelId = createSelector(
  selectUserChannelsFeature,
  (channels) => (channelId: string) => channels.find((channel) => channel.channel_id === channelId),
);

export const selectChannelsByUserId = createSelector(
  selectUserChannelsFeature,
  (channels) => (userId: string) => channels.filter((channel) => channel.user_id === userId),
);
