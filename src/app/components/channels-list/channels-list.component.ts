import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChannelsActions } from '@store/channels/channels.actions';
import { selectChannels } from '@store/channels/channels.selectors';
import { AsyncPipe, NgForOf, NgIf, UpperCasePipe } from '@angular/common';
import { TuiAlertService, TuiButton, TuiDialogContext, TuiDialogService, TuiLoader } from '@taiga-ui/core';
import { ChatChannel, User, UserChannel } from '@core/models/models';
import { combineLatest, map, ReplaySubject, takeUntil } from 'rxjs';
import { ActiveDataService } from '@core/services/active-data.service';
import { AuthService } from '@core/services/auth.service';
import { selectChannelsByUserId } from '@store/user-channels/user-channels.selectors';
import { UserChannelsActions } from '@store/user-channels/user-channels.actions';
import type { PolymorpheusContent } from '@taiga-ui/polymorpheus';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { TuiContext, TuiLet, tuiPure, TuiStringHandler } from '@taiga-ui/cdk';
import { ChannelsApiService } from '@core/services/api/channels-api.service';

@Component({
  selector: 'app-channels-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    TuiLoader,
    TuiButton,
    UpperCasePipe,
    TuiSelectModule,
    ReactiveFormsModule,
    TuiLet,
    TuiTextfieldControllerModule,
    NgForOf,
  ],
  templateUrl: './channels-list.component.html',
  styleUrl: './channels-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelsListComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly authService = inject(AuthService);
  private readonly activeDataService = inject(ActiveDataService);
  private readonly channelsApiService = inject(ChannelsApiService);
  private readonly alerts = inject(TuiAlertService);
  private readonly dialogs = inject(TuiDialogService);
  private readonly destroy$ = new ReplaySubject(1);

  private activeChannel: ChatChannel | null = null;
  activeUser: User | null = this.authService.getUser();
  private allUserChannels$ = this.store
    .select(selectChannelsByUserId(this.activeUser?.id))
    .pipe(takeUntil(this.destroy$));
  private fullChannels$ = this.store.select(selectChannels).pipe(takeUntil(this.destroy$));
  activeUserChannels$ = combineLatest([this.allUserChannels$, this.fullChannels$]).pipe(
    takeUntil(this.destroy$),
    map(([userChannels, channels]) => this.getFilteredUserChannels(userChannels, channels, true)),
  );
  nonActiveUserChannels$ = combineLatest([this.allUserChannels$, this.fullChannels$]).pipe(
    takeUntil(this.destroy$),
    map(([userChannels, channels]) => this.getFilteredUserChannels(userChannels, channels, false)),
  );
  newChannelControl = new FormControl<string | null>(null);

  ngOnInit() {
    this.store.dispatch(ChannelsActions.fetchChannels());
    this.store.dispatch(UserChannelsActions.fetchUserChannels());

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

  private getFilteredUserChannels(userChannels: UserChannel[], channels: ChatChannel[], active: boolean) {
    const userChannelsIds = userChannels.map((channel) => channel.channel_id);
    return channels.filter((channel) => userChannelsIds.includes(channel.id) === active);
  }

  showAddChannelDialog(content: PolymorpheusContent<TuiDialogContext>) {
    this.dialogs.open(content).pipe(takeUntil(this.destroy$)).subscribe();
  }

  @tuiPure
  protected stringify(items: readonly ChatChannel[]): TuiStringHandler<TuiContext<string>> {
    const map = new Map(items.map(({ id, name }) => [id, name] as [string, string]));
    return ({ $implicit }: TuiContext<string>) => map.get($implicit) || '';
  }

  addChannel() {
    if (!this.newChannelControl.value || !this.activeUser) {
      this.alerts
        .open('Sorry, something went wrong', { appearance: 'error' })
        .pipe(takeUntil(this.destroy$))
        .subscribe();
      return;
    }
    const body: UserChannel = {
      channel_id: this.newChannelControl.value,
      user_id: this.activeUser.id,
    };
    this.channelsApiService.addUserToChannel(body).subscribe((channel) => {
      this.store.dispatch(UserChannelsActions.addUserChannel({ channel }));
      this.newChannelControl.setValue(null);
    });
  }
}
