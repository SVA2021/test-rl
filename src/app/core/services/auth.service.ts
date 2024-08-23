import { inject, Injectable } from '@angular/core';
import { User } from '../models/models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;

  router = inject(Router);

  getUser(): User | null {
    return this.user;
  }

  setUser(user: User | null) {
    this.user = user;
  }

  isAuthenticated(): boolean {
    return !!this.user;
  }

  logout() {
    this.user = null;
    this.router.navigate(['/login']).then();
  }
}
