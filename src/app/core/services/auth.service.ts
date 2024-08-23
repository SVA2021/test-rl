import { Injectable } from '@angular/core';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;

  getUser(): User | null {
    return this.user;
  }

  setUser(user: User | null) {
    this.user = user;
  }

  isAuthenticated(): boolean {
    return !!this.user;
  }
}
