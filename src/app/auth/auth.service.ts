import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {AuthResponseModel} from "./auth-response.model";
import {UserModel} from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _webApiKey = "AIzaSyDosSjxxWQmcte96l-dcos7Z4foeg-IpU0";
  private _userSubject = new BehaviorSubject<UserModel | null>(null);
  private _logoutTimer!: number;

  constructor(private http: HttpClient) { }

  get userSubject() {
    return this._userSubject;
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseModel>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this._webApiKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        })
      .pipe(
        catchError(err => throwError(err.error.error.detailedMessage)),
        tap(authResponse => this.saveUser(authResponse)));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseModel>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this._webApiKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        })
      .pipe(
        catchError(err => throwError(err.error.error.message)),
        tap(authResponse => this.saveUser(authResponse)));
  }

  private saveUser(authResponse: AuthResponseModel) {
    const user = UserModel.toUser(authResponse);
    this.userSubject.next(user);
    this._logoutTimer = this.setLogoutTimer();
    localStorage.setItem("user", JSON.stringify(user));
  }

  autoLogin() {
    const userString = localStorage.getItem("user");
    if (userString) {
      this.userSubject.next(JSON.parse(userString));
      this._logoutTimer = this.setLogoutTimer();
    }
  }

  logout() {
    this.userSubject.next(null);
  }

  private setLogoutTimer() {
    const expDate = this.userSubject.getValue()?.tokenExpirationDate.valueOf() ?? 0;
    return setTimeout(() => this.logout(), (expDate - Date.now()));
  }
}
