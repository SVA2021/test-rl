import { ChatChannel } from "@core/models/models";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const ChannelsActions = createActionGroup({
  source: 'Channels',
  events: {
    Reset: emptyProps(),
    'Fetch channels': emptyProps(),
    'Load channels': props<{ channels: ChatChannel[] }>(),
  },
})
