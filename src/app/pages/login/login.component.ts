import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { of, ReplaySubject } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiInputModule, TuiInputPasswordModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { TUI_VALIDATION_ERRORS, TuiFieldErrorPipe } from '@taiga-ui/kit';
import { TuiButton, TuiError, TuiLabel } from '@taiga-ui/core';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputPasswordModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiLabel,
    TuiError,
    TuiFieldErrorPipe,
    AsyncPipe,
    TuiButton,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less',
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'This field is required!',
        maxlength: ({ requiredLength }: { requiredLength: string }) => `Maximum length — ${requiredLength}`,
        minlength: ({ requiredLength }: { requiredLength: string }) => of(`Minimum length — ${requiredLength}`),
      },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  readonly loginForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
  });

  private destroy$ = new ReplaySubject(1);

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  submitForm() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
  }
}
