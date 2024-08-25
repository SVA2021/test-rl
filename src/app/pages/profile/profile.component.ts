import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { User } from '@core/models/models';
import { TuiButton } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TuiButton, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private readonly auth = inject(AuthService);

  user: User | null = this.auth.getUser();
}
