import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '@core/models/models';
import { TuiButton } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';

const testUser: User = {
  id: 'uuid',
  username: 'test',
  password: 'test',
  is_online: true,
};

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TuiButton, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  ngOnInit() {
    this.user = testUser;
  }
}
