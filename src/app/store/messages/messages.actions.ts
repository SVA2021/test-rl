import { Message } from '@core/models/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const MessagesActions = createActionGroup({
  source: 'Messages',
  events: {
    Reset: emptyProps(),
    'Fetch messages': emptyProps(),
    'Load messages': props<{ messages: Message[] }>(),
    'Post message': props<{ message: Message }>(),
  },
});
