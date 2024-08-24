import { ChannelDetailed, ChatChannel, ChatUser, User, UserChannel } from '@core/models/models';

function getChatUserFromUser(user: User): ChatUser {
  return {
    id: user.id,
    username: user.username,
    is_online: user.is_online,
  };
}

export function getChatUsersFromUsers(users: User[]): ChatUser[] {
  return users.map(getChatUserFromUser);
}

export function getRandomBoolean(): boolean {
  return Math.random() < 0.5;
}

export function getChannels(userChannels: UserChannel[]): string[] {
  return userChannels.map((userChannel) => userChannel.channel_id);
}

export function getChannelsDetailedFromChannels(channels: ChatChannel[]): ChannelDetailed[] {
  return channels.map((channel) => ({
    id: channel.id,
    name: channel.name,
    messages: [],
    users: [],
  }));
}
