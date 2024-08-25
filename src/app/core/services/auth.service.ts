import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@core/models/models';
import { LocalstorageService } from '@core/services/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;

  private readonly router = inject(Router);
  private readonly storageService = inject(LocalstorageService);

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
    this.storageService.remove('user');
    this.router.navigate(['/login']).then();
  }
}
