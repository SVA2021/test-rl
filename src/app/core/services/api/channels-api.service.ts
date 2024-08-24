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

  addChannel(channel: ChatChannel) {
    return this.httpClient.post<ChatChannel>('@api/channels', channel);
  }

  getChannelMessages(channel_id: string) {
    return this.httpClient.get('@api/messages', { params: { channel_id } });
  }

  postMessageToChannel(message: Message) {
    return this.httpClient.post('@api/messages', message);
  }

  getChannelUsers(channel_id: string) {
    return this.httpClient.get('@api/user-channel', { params: { channel_id } });
  }

  addUserToChannel(body: UserChannel) {
    return this.httpClient.post('@api/user-channel', body);
  }
}
