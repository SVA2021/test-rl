import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '@core/services/auth.service';
import { ActiveDataService } from '@core/services/active-data.service';
import { ChannelsApiService } from '@core/services/api/channels-api.service';
import { TuiAlertService, TuiButton } from '@taiga-ui/core';
import { Observable, of, ReplaySubject, switchMap, takeUntil } from 'rxjs';
import { ChatChannel, ChatUser, Message, User } from '@core/models/models';
import { MessagesActions } from '@store/messages/messages.actions';
import { selectMessagesByChannelId } from '@store/messages/messages.selectors';
import { AsyncPipe, NgIf } from '@angular/common';
import { UsersActions } from '@store/users/users.actions';
import { selectUsers } from '@store/users/users.selectors';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiInputDateModule, TuiInputModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { UuidGeneratorService } from '@core/services/uuid-generator.service';

@Component({
  selector: 'app-channel-messages-list',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    TuiInputDateModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiButton,
    NgIf,
  ],
  templateUrl: './channel-messages-list.component.html',
  styleUrl: './channel-messages-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelMessagesListComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly authService = inject(AuthService);
  private readonly activeDataService = inject(ActiveDataService);
  private readonly channelsApiService = inject(ChannelsApiService);
  private readonly uuidGeneratorService = inject(UuidGeneratorService);
  private readonly alerts = inject(TuiAlertService);
  private readonly destroy$ = new ReplaySubject(1);

  activeChannel$ = this.activeDataService.getActiveChannel().pipe(takeUntil(this.destroy$));
  private activeChannel: ChatChannel | null = null;
  private activeUser: User | null = this.authService.getUser();
  private users: ChatUser[] = [];

  channelMessages$: Observable<Message[]> = of([]);
  newMessageControl = new FormControl('', [Validators.minLength(1)]);

  ngOnInit(): void {
    this.store.dispatch(MessagesActions.fetchMessages());
    this.store.dispatch(UsersActions.fetchUsers());

    this.channelMessages$ = this.activeChannel$.pipe(
      switchMap((channel) => this.store.select(selectMessagesByChannelId(channel?.id))),
      takeUntil(this.destroy$),
    );

    this.store
      .select(selectUsers)
      .pipe(takeUntil(this.destroy$))
      .subscribe((users) => {
        this.users = users;
      });

    this.activeChannel$.subscribe((channel) => {
      this.activeChannel = channel;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  getUserName(id: string | undefined) {
    return this.users.find((user) => user.id === id)?.username || 'Unknown user';
  }

  sendMessage() {
    if (this.newMessageControl.invalid) {
      this.alerts.open('type message to send', { appearance: 'warn' }).pipe(takeUntil(this.destroy$)).subscribe();
      return;
    }
    const body: Message = {
      id: this.uuidGeneratorService.getUUID(),
      content: this.newMessageControl.value as string,
      from_user: this.activeUser?.id as string,
      channel_id: this.activeChannel?.id as string,
    };
    this.channelsApiService
      .postMessageToChannel(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe((message) => {
        this.newMessageControl.reset();
        this.store.dispatch(MessagesActions.postMessage({ message }));
      });
  }
}
