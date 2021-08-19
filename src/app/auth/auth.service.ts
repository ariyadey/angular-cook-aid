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
    console.log(this._userSubject);
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

  autoLogin() {
    const userString = localStorage.getItem("user");
    if (userString) {
      this.userSubject.next(JSON.parse(userString));
      console.log(this.userSubject);
    }
  }

  private createUser(authResponse: AuthResponseModel) {
    const user = new UserModel(
      authResponse.email,
      authResponse.localId,
      authResponse.idToken,
      new Date(Date.now() + (+authResponse.expiresIn * 1000))
    );
    this._userSubject.next(user);
  }

  logout() {
    this.userSubject.next(null);
  }
}
