import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '@components/header/header.component';
import { UsersApiService } from "@core/services/api/users-api.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  private readonly usersApiService = inject(UsersApiService);

  ngOnInit() {
    this.usersApiService.getUsers().subscribe(console.log);
  }
}
