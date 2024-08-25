import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';
import { ChannelsApiService } from '@core/services/api/channels-api.service';
import { MessagesActions } from "@store/messages/messages.actions";

@Injectable()
export class MessagesEffects {
  actions$ = inject(Actions);
  channelsApiService = inject(ChannelsApiService);

  fetchUserChannels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.fetchMessages),
      exhaustMap(() =>
        this.channelsApiService.getFullMessages().pipe(
          map((messages) => MessagesActions.loadMessages({ messages })),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );
}
