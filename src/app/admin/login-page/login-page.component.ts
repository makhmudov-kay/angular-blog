import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/dto/form.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  /**
   */
  message!: string;

  /**
   */
  submited = false;

  /**
   */
  form!: FormGroup;

  /**
   *
   * @param fb
   * @param auth 
   * @param route
   */
  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /**
   *
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Пожалуйста введите данные';
      } else if (params['authFailed']) {
        this.message = 'Сессия истекла. Введите данные снова';
      }
    });

    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   *
   * @returns
   */
  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submited = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.auth.login(user).subscribe(
      () => {
        this.form.reset();
        this.router.navigate(['/admin', 'dashboard']);
        this.submited = false;
      },
      () => {
        this.submited = false;
      }
    );
  }
}
