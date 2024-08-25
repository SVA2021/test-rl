import { Message } from '@core/models/models';
import { createReducer, on } from '@ngrx/store';
import { MessagesActions } from '@store/messages/messages.actions';

export type MessagesState = Message[];
export const initialState: MessagesState = [];

export const messagesReducer = createReducer(
  initialState,
  on(MessagesActions.loadMessages, (state, payload) => {
    return [...payload.messages];
  }),
  on(MessagesActions.postMessage, (state, payload) => {
    return [...state, payload.message];
  }),
  on(MessagesActions.reset, () => initialState),
);
