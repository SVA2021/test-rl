import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '@components/header/header.component';
import { UsersApiService } from "@core/services/api/users-api.service";
import { ChannelsApiService } from "@core/services/api/channels-api.service";
import { Store } from "@ngrx/store";
import { UsersActions } from "@store/users/users.actions";
import { ChannelsActions } from "@store/channels/channels.actions";
import { ChannelsListComponent } from "@components/channels-list/channels-list.component";
import { ChannelUsersListComponent } from "@components/channel-users-list/channel-users-list.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, ChannelsListComponent, ChannelUsersListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  private readonly channelsApiService = inject(ChannelsApiService);
  private readonly usersApiService = inject(UsersApiService);
  private readonly store = inject(Store);

  ngOnInit() {
    this.store.dispatch(UsersActions.fetchUsers());
    this.store.dispatch(ChannelsActions.fetchChannels());
  }
}
