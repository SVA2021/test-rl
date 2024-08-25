import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatChannel, Message, UserChannel } from '@core/models/models';
import { map } from 'rxjs';
import { getChannels } from '@core/helpers/helpers';

@Injectable({
  providedIn: 'root',
})
export class ChannelsApiService {
  private readonly httpClient = inject(HttpClient);

  getChannels() {
    return this.httpClient.get<ChatChannel[]>('@api/channels');
  }

  addChannel(channel: ChatChannel) {
    return this.httpClient.post<ChatChannel>('@api/channels', channel);
  }

  getFullMessages() {
    return this.httpClient.get<Message[]>('@api/messages');
  }

  getChannelMessages(channel_id: string) {
    return this.httpClient.get<Message[]>('@api/messages', { params: { channel_id } });
  }

  postMessageToChannel(message: Message) {
    return this.httpClient.post<Message>('@api/messages', message);
  }

  getFullUsersChannels() {
    return this.httpClient.get<UserChannel[]>('@api/user_channels');
  }

  // side effect этот обычно выполняется на бэке
  getChannelUsers(channel_id: string) {
    return this.httpClient
      .get<UserChannel[]>('@api/user_channels', { params: { channel_id } })
      .pipe(map((userChannels) => getChannels(userChannels)));
  }

  addUserToChannel(body: UserChannel) {
    return this.httpClient.post<UserChannel>('@api/user_channels', body);
  }
}
