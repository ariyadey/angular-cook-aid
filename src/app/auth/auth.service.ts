import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {AuthResponseModel} from "./auth-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _webApiKey = "AIzaSyDosSjxxWQmcte96l-dcos7Z4foeg-IpU0";

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseModel>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this._webApiKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        })
      .pipe(catchError((err) => {
        let errorMessage: string;
        switch (err.error.error.message) {
          case "EMAIL_EXISTS":
            errorMessage = "The email address is already in use by another account.";
            break;
          case "OPERATION_NOT_ALLOWED":
            errorMessage = "Password sign-in is disabled for this project.";
            break;
          case "TOO_MANY_ATTEMPTS_TRY_LATER":
            errorMessage = "We have blocked all requests from this device due to unusual activity. Try again later.";
            break;
          default:
            errorMessage = "Unknown error occurred";
        }
        return throwError(errorMessage);
      }));
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
      .pipe(catchError((err) => {
        let errorMessage: string;
        switch (err.error.error.message) {
          case "EMAIL_NOT_FOUND":
            errorMessage = "There is no user record corresponding to this identifier. The user may have been deleted.";
            break;
          case "INVALID_PASSWORD":
            errorMessage = "The password is invalid or the user does not have a password.";
            break;
          case "USER_DISABLED":
            errorMessage = "The user account has been disabled by an administrator.";
            break;
          default:
            errorMessage = "Unknown error occurred";
        }
        return throwError(errorMessage);
      }));
  }

}
