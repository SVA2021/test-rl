import { ChatUser, User } from '@core/models/models';

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
