import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TuiAvatar, TuiChip } from "@taiga-ui/kit";
import { User } from "@core/models/models";
import { AuthService } from "@core/services/auth.service";
import { TuiButton } from "@taiga-ui/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TuiAvatar, TuiChip, TuiButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  user: User | null = null;

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  logout() {
    this.authService.logout();
  }

  openSettings() {
    this.router.navigate(['/user']).then();
  }
}
