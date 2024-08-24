import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatUser, User, UserChannel, UserLoginReq } from '@core/models/models';
import { map, Observable } from 'rxjs';
import { getChatUsersFromUsers } from '@core/helpers/helpers';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private readonly httpClient = inject(HttpClient);

  // side effect только для скрытия паролей пользователей
  getUsers(): Observable<ChatUser[]> {
    return this.getFullUsers().pipe(map((users) => getChatUsersFromUsers(users)));
  }

  addUser(user: User) {
    return this.httpClient.post<User>('@api/users', user);
  }

  getUser(body: UserLoginReq): Observable<User | null> {
    return this.httpClient.get<User[]>('@api/users', { params: { ...body } }).pipe(map((users) => users?.[0] || null));
  }

  getUserChannels(user_id: string) {
    return this.httpClient.get<UserChannel[]>('@api/user-channel', { params: { user_id } });
  }

  private getFullUsers() {
    return this.httpClient.get<User[]>('@api/users');
  }
}
