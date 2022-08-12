import { environment } from './../../../../environments/environment';
import { User, FbAuthResponse } from './../../../shared/dto/form.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  /**
   */
  error$: Subject<string> = new Subject<string>();

  /**
   */
  url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

  /**
   *
   * @param http
   */
  constructor(private http: HttpClient) {}

  /**
   */
  get token(): string {
    const expDate = new Date(localStorage.getItem('refreshToken') as any);
    if (new Date() > expDate) {
      this.logout();
      return null ?? '';
    }
    return localStorage.getItem('accessToken') ?? '';
  }

  /**
   *
   * @param user
   * @returns
   */
  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http
      .post<any>(`${this.url}${environment.apiKey}`, user)
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }

  /**
   *
   * @returns
   */
  isAuthintificate(): boolean {
    return !!this.token;
  }

  /**
   *
   */
  logout(): void {
    this.setToken(null);
  }

  /**
   *
   * @param error
   * @returns
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    const { message } = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Некорректный EMAIL');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Некорректный пароль');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такого Email не существует');
        break;
    }

    return throwError(() => error);
  }

  /**
   *
   * @param response
   */
  private setToken(response: FbAuthResponse | null): void {
    if (response) {
      const expDate = new Date(
        new Date().getTime() + +response!.expiresIn * 1000
      );
      localStorage.setItem('accessToken', response!.idToken);
      localStorage.setItem('refreshToken', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
