import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatChannel } from '@core/models/models';

@Injectable({
  providedIn: 'root',
})
export class ActiveDataService {
  private activeChannel$ = new BehaviorSubject<ChatChannel | null>(null);

  setActiveChannel(channel: ChatChannel | null) {
    this.activeChannel$.next(channel);
  }

  getActiveChannel() {
    return this.activeChannel$.asObservable();
  }
}
