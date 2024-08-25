import { TuiRoot } from '@taiga-ui/core';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { LocalstorageService } from '@core/services/localstorage.service';
import { User } from '@core/models/models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TuiRoot],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent implements OnInit {
  title = 'test-rl';

  private readonly authService = inject(AuthService);
  private readonly storageService = inject(LocalstorageService);
  private readonly router = inject(Router);

  ngOnInit() {
    if (this.storageService.exists('user')) {
      const user = this.storageService.get('user') as User;
      this.authService.setUser(user);
      this.router.navigate(['/']).then();
    }
  }
}
