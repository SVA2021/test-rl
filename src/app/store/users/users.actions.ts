import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ChatUser } from '@core/models/models';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    Reset: emptyProps(),
    'Fetch users': emptyProps(),
    'Load users': props<{ users: ChatUser[] }>(),
  },
});
