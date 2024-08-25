import { UsersEffects } from '@store/users/users.effects';
import { ChannelsEffects } from '@store/channels/channels.effects';
import { UserChannelsEffects } from '@store/user-channels/user-channels.effects';
import { MessagesEffects } from '@store/messages/messages.effects';

export const appEffects = [ChannelsEffects, MessagesEffects, UsersEffects, UserChannelsEffects];
