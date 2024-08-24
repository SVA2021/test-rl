export interface ChatUser {
  id: string; //uuid
  username: string;
  is_online: boolean;
}

export interface User extends ChatUser {
  password: string;
}

export interface ChatChannel {
  id: string; //uuid
  name: string;
}

export interface Message {
  id: string; //uuid
  from_user: string; //uuid
  channel_id: string; //uuid
  content: string;
}

export interface UserChannel {
  user_id: string; //uuid
  channel_id: string; //uuid
}

export interface UserLoginReq {
  username: string;
  password: string;
}

export interface ChannelDetailed extends ChatChannel {
  messages: Message[];
  users: string[];
}
