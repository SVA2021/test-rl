import { UserChannel } from '@core/models/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UserChannelsActions = createActionGroup({
  source: 'User Channels',
  events: {
    Reset: emptyProps(),
    'Fetch user channels': emptyProps(),
    'Load user channels': props<{ channels: UserChannel[] }>(),
  },
});
