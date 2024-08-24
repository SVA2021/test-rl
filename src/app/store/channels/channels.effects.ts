import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';
import { ChannelsApiService } from '@core/services/api/channels-api.service';
import { ChannelsActions } from '@store/channels/channels.actions';
import { getChannelsDetailedFromChannels } from '@core/helpers/helpers';

@Injectable()
export class ChannelsEffects {
  actions$ = inject(Actions);
  channelsApiService = inject(ChannelsApiService);

  fetchChannels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChannelsActions.fetchChannels),
      exhaustMap(() =>
        this.channelsApiService.getChannels().pipe(
          map((channels) => ChannelsActions.loadChannels({ channels: getChannelsDetailedFromChannels(channels) })),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );
}
