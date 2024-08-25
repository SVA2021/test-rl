import { AppState } from '@store/app.reducers';
import { createSelector } from '@ngrx/store';

export const selectMessagesFeature = (state: AppState) => state.messages;

export const selectAllMessages = createSelector(selectMessagesFeature, (messages) => messages);

export const selectMessagesByChannelId = createSelector(
  selectMessagesFeature,
  (messages) => (channelId: string) => messages.filter((message) => message.channel_id === channelId),
);
