import { AppState } from '@store/app.reducers';
import { createSelector } from '@ngrx/store';

export const selectUserChannelsFeature = (state: AppState) => state.userChannels;

export const selectAllUserChannels = createSelector(selectUserChannelsFeature, (channels) => channels);

export const selectUsersByChannelId = (channelId: string | undefined) =>
  createSelector(selectUserChannelsFeature, (channels) => channels.filter((channel) => channel.channel_id === channelId));

export const selectChannelsByUserId = (userId: string | undefined) =>
  createSelector(selectUserChannelsFeature, (channels) => channels.filter((channel) => channel.user_id === userId));
