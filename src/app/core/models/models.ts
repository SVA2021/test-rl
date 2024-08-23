export interface User {
  id: string; //uuid
  username: string;
  password: string;
  is_online: boolean;
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
