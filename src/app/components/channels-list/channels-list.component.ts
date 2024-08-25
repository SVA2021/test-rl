import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChannelsActions } from '@store/channels/channels.actions';
import { selectChannels } from '@store/channels/channels.selectors';
import { AsyncPipe, NgIf, UpperCasePipe } from '@angular/common';
import { TuiButton, TuiLoader } from '@taiga-ui/core';
import { ChatChannel } from '@core/models/models';
import { ReplaySubject, takeUntil } from 'rxjs';
import { ActiveDataService } from '@core/services/active-data.service';

@Component({
  selector: 'app-channels-list',
  standalone: true,
  imports: [AsyncPipe, NgIf, TuiLoader, TuiButton, UpperCasePipe],
  templateUrl: './channels-list.component.html',
  styleUrl: './channels-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelsListComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly activeDataService = inject(ActiveDataService);
  private readonly destroy$ = new ReplaySubject(1);

  activeChannel: ChatChannel | null = null;
  fullChannels$ = this.store.select(selectChannels).pipe(takeUntil(this.destroy$));

  ngOnInit() {
    this.store.dispatch(ChannelsActions.fetchChannels());

    this.activeDataService
      .getActiveChannel()
      .pipe(takeUntil(this.destroy$))
      .subscribe((channel) => {
        this.activeChannel = channel;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  setActiveChannel(channel: ChatChannel) {
    if (channel.id === this.activeChannel?.id) {
      return;
    }
    this.activeDataService.setActiveChannel(channel);
  }

  isChannelActive(channel: ChatChannel) {
    return this.activeChannel?.id === channel.id;
  }
}
