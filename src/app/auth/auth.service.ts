import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {AuthResponseModel} from "./auth-response.model";
import {SerializedUserModel, UserModel} from "./user.model";
import {CrudService} from "../shared/crud.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _webApiKey = "AIzaSyDosSjxxWQmcte96l-dcos7Z4foeg-IpU0";
  private _userSubject = new BehaviorSubject<UserModel | null>(null);
  private _logoutTimer!: number;

  constructor(private http: HttpClient,
              private crudService: CrudService,
              private router: Router) { }

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
        tap(authResponse => this.handleAuthResponse(authResponse)));
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
        tap(authResponse => this.handleAuthResponse(authResponse)));
  }

  private handleAuthResponse(authResponse: AuthResponseModel) {
    const user = UserModel.responseToUser(authResponse);
    this.userSubject.next(user);
    this._logoutTimer = this.setLogoutTimer();
    localStorage.setItem("user", JSON.stringify(user));
    this.crudService.fetchRecipes();
  }

  autoLogin() {
    const userString = localStorage.getItem("user");
    if (userString) {
      const serializedUser: SerializedUserModel = JSON.parse(userString);
      this.userSubject.next(UserModel.parse(serializedUser));
      this._logoutTimer = this.setLogoutTimer();
      this.crudService.fetchRecipes();
    }
  }

  logout() {
    localStorage.removeItem("user");
    this.userSubject.next(null);
    this.router.navigate(["/auth"]);
  }

  private setLogoutTimer() {
    const expDate = this.userSubject.getValue()?.tokenExpirationDate.valueOf() ?? 0;
    return setTimeout(() => this.logout(), (expDate - Date.now()));
  }
}
