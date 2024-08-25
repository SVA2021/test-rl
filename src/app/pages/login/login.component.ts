import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { of, ReplaySubject, takeUntil } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiInputModule, TuiInputPasswordModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { TUI_CONFIRM, TUI_VALIDATION_ERRORS, TuiConfirmData, TuiFieldErrorPipe } from '@taiga-ui/kit';
import { TuiAlertService, TuiButton, TuiDialogService, TuiError, TuiLabel } from '@taiga-ui/core';
import { AsyncPipe } from '@angular/common';
import { UsersApiService } from '@core/services/api/users-api.service';
import { User, UserLoginReq } from '@core/models/models';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';
import { getRandomBoolean } from '@core/helpers/helpers';
import { UuidGeneratorService } from '@core/services/uuid-generator.service';
import { LocalstorageService } from '@core/services/localstorage.service';

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
export class LoginComponent implements OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly alerts = inject(TuiAlertService);
  private readonly dialogs = inject(TuiDialogService);
  private readonly router = inject(Router);
  private readonly storageService = inject(LocalstorageService);
  private readonly uuidService = inject(UuidGeneratorService);
  private readonly usersApiService = inject(UsersApiService);

  readonly loginForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
  });

  private destroy$ = new ReplaySubject(1);

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  submitForm() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.alerts.open('Please, fill in all required fields!', { appearance: 'error' });
      return;
    }
    const body: UserLoginReq = {
      username: this.loginForm.value.username as string,
      password: this.loginForm.value.password as string,
    };
    this.usersApiService
      .getUser(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user) {
          this.login(user);
        } else {
          this.registerNewUser(body);
        }
      });
  }

  private registerNewUser(body: UserLoginReq) {
    const dialogData: TuiConfirmData = {
      content: 'User with this credentials not found. Do you want to register?',
      yes: 'Register',
      no: 'Cancel',
    };
    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Create new user?',
        size: 'm',
        data: dialogData,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          const newUser: User = {
            id: this.uuidService.getUUID(),
            username: body.username,
            password: body.password,
            is_online: getRandomBoolean(),
          };
          this.usersApiService
            .addUser(newUser)
            .pipe(takeUntil(this.destroy$))
            .subscribe((user) => {
              this.login(user);
            });
        }
      });
  }

  private login(user: User) {
    this.authService.setUser(user);
    this.storageService.set('user', user);
    this.router.navigate(['/']).then();
  }
}
