import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatChannel, Message, UserChannel } from '@core/models/models';

@Injectable({
  providedIn: 'root',
})
export class ChannelsApiService {
  private readonly httpClient = inject(HttpClient);

  getChannels() {
    return this.httpClient.get<ChatChannel[]>('@api/channels');
  }

  getFullMessages() {
    return this.httpClient.get<Message[]>('@api/messages');
  }

  postMessageToChannel(message: Message) {
    return this.httpClient.post<Message>('@api/messages', message);
  }

  getFullUsersChannels() {
    return this.httpClient.get<UserChannel[]>('@api/user_channels');
  }

  addUserToChannel(body: UserChannel) {
    return this.httpClient.post<UserChannel>('@api/user_channels', body);
  }
}
