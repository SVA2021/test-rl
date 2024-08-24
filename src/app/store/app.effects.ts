import { UsersEffects } from '@store/users/users.effects';
import { ChannelsEffects } from "@store/channels/channels.effects";

export const appEffects = [ChannelsEffects, UsersEffects];
