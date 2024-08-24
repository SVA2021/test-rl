import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { UsersApiService } from '@core/services/api/users-api.service';
import { UsersActions } from '@store/users/users.actions';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';

@Injectable()
export class UsersEffects {
  actions$ = inject(Actions);
  usersApiService = inject(UsersApiService);

  fetchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.fetchUsers),
      exhaustMap(() =>
        this.usersApiService.getUsers().pipe(
          map((users) => UsersActions.loadUsers({ users })),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );
}
