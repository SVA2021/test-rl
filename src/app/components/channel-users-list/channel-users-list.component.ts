import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '@core/services/auth.service';
import { ActiveDataService } from '@core/services/active-data.service';
import { ChannelsApiService } from '@core/services/api/channels-api.service';
import {
  TuiAlertService,
  TuiButton,
  TuiDataListComponent,
  TuiDialogContext,
  TuiDialogService,
  TuiLoader
} from '@taiga-ui/core';
import { combineLatest, map, ReplaySubject, takeUntil } from 'rxjs';
import { ChatChannel, ChatUser, User, UserChannel } from '@core/models/models';
import { selectUsers } from '@store/users/users.selectors';
import { selectUsersByChannelId } from '@store/user-channels/user-channels.selectors';
import { AsyncPipe, NgForOf, NgIf, TitleCasePipe, UpperCasePipe } from "@angular/common";
import { TuiAvatar } from "@taiga-ui/kit";
import { TuiSelectModule, TuiTextfieldControllerModule } from "@taiga-ui/legacy";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import type { PolymorpheusContent } from "@taiga-ui/polymorpheus";
import { TuiContext, tuiPure, TuiStringHandler } from "@taiga-ui/cdk";
import { UserChannelsActions } from "@store/user-channels/user-channels.actions";
import { ChannelsActions } from "@store/channels/channels.actions";

@Component({
  selector: 'app-channel-users-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    UpperCasePipe,
    TuiLoader,
    TuiAvatar,
    TitleCasePipe,
    TuiButton,
    NgForOf,
    TuiDataListComponent,
    TuiSelectModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './channel-users-list.component.html',
  styleUrl: './channel-users-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelUsersListComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly authService = inject(AuthService);
  private readonly activeDataService = inject(ActiveDataService);
  private readonly channelsApiService = inject(ChannelsApiService);
  private readonly alerts = inject(TuiAlertService);
  private readonly dialogs = inject(TuiDialogService);
  private readonly destroy$ = new ReplaySubject(1);

  private activeChannel: ChatChannel | null = null;
  activeUser: User | null = this.authService.getUser();
  private fullUsers$ = this.store.select(selectUsers).pipe(takeUntil(this.destroy$));
  private allChannelUsers$ = this.store
    .select(selectUsersByChannelId(this.activeChannel?.id))
    .pipe(takeUntil(this.destroy$));

  activeChannelUsers$ = combineLatest([this.allChannelUsers$, this.fullUsers$]).pipe(
    takeUntil(this.destroy$),
    map(([channelUsers, users]) => this.getFilteredUsers(channelUsers, users, true)),
  );
  nonActiveChannelUsers$ = combineLatest([this.allChannelUsers$, this.fullUsers$]).pipe(
    takeUntil(this.destroy$),
    map(([channelUsers, users]) => this.getFilteredUsers(channelUsers, users, false)),
  );
  newUserControl = new FormControl<string | null>(null);

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

  showAddUserDialog(content: PolymorpheusContent<TuiDialogContext>) {
    this.dialogs.open(content).pipe(takeUntil(this.destroy$)).subscribe();
  }

  addUser() {
    if (!this.newUserControl.value || !this.activeChannel) {
      this.alerts
        .open('Sorry, something went wrong', { appearance: 'error' })
        .pipe(takeUntil(this.destroy$))
        .subscribe();
      return;
    }
    const body: UserChannel = {
      channel_id: this.activeChannel.id,
      user_id: this.newUserControl.value,
    };
    this.channelsApiService.addUserToChannel(body).subscribe((channel) => {
      this.store.dispatch(UserChannelsActions.addUserChannel({ channel }));
      this.newUserControl.setValue(null);
    });
  }
  @tuiPure
  protected stringify(items: readonly ChatUser[]): TuiStringHandler<TuiContext<string>> {
    const map = new Map(items.map(({ id, username }) => [id, username] as [string, string]));
    return ({ $implicit }: TuiContext<string>) => map.get($implicit) || '';
  }

  private getFilteredUsers(channelUsers: UserChannel[], users: ChatUser[], active: boolean): ChatUser[] {
    const channelUserIds = channelUsers.map((channelUser) => channelUser.user_id);
    return users.filter((user) => channelUserIds.includes(user.id) === active);
  }
}
