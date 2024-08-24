import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatChannel } from '@core/models/models';

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
}
