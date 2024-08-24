import { AppState } from "@store/app.reducers";
import { createSelector } from "@ngrx/store";

export const selectChannelsFeature = (state: AppState) => state.channels;

export const selectChannels = createSelector(selectChannelsFeature, (channels) => channels);

export const selectChannelById = createSelector(selectChannelsFeature, (channels) => (channelId: string) => channels.find((channel) => channel.id === channelId))
