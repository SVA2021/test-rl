import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';
import { ChannelsApiService } from '@core/services/api/channels-api.service';
import { UserChannelsActions } from "@store/user-channels/user-channels.actions";

@Injectable()
export class UserChannelsEffects {
  actions$ = inject(Actions);
  channelsApiService = inject(ChannelsApiService);

  fetchUserChannels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserChannelsActions.fetchUserChannels),
      exhaustMap(() =>
        this.channelsApiService.getFullUsersChannels().pipe(
          map((channels) => UserChannelsActions.loadUserChannels({ channels })),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );
}
