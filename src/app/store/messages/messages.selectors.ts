import { AppState } from '@store/app.reducers';
import { createSelector } from '@ngrx/store';

export const selectMessagesFeature = (state: AppState) => state.messages;

export const selectAllMessages = createSelector(selectMessagesFeature, (messages) => messages);

export const selectMessagesByChannelId = (channelId: string | undefined) =>
  createSelector(selectMessagesFeature, (messages) => messages.filter((message) => message.channel_id === channelId));
