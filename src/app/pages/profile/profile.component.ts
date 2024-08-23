import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {}
