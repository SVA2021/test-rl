import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {

}
