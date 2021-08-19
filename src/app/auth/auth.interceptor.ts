import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from "./auth.service";
import {catchError} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const modifiedRequest = request.clone({
      setParams: {auth: this.authService.userSubject.getValue()?.token ?? "No Token"}
    });
    return next
      .handle(modifiedRequest)
      .pipe(
        catchError(err => {
          err.error.error.detailedMessage = AuthInterceptor.getDetailedErrMsg(err.error.error.detailedMessage);
          return throwError(err);
        }));
  }

  private static getDetailedErrMsg(message: string) {
    let detailedMsg: string;
    switch (message) {
      case "EMAIL_EXISTS":
        detailedMsg = "The email address is already in use by another account.";
        break;
      case "OPERATION_NOT_ALLOWED":
        detailedMsg = "Password sign-in is disabled for this project.";
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        detailedMsg = "We have blocked all requests from this device due to unusual activity. Try again later.";
        break;
      case "EMAIL_NOT_FOUND":
        detailedMsg = "There is no user record corresponding to this identifier. The user may have been deleted.";
        break;
      case "INVALID_PASSWORD":
        detailedMsg = "The password is invalid or the user does not have a password.";
        break;
      case "USER_DISABLED":
        detailedMsg = "The user account has been disabled by an administrator.";
        break;
      default:
        detailedMsg = "Unknown error occurred";
    }
    return detailedMsg;
  }
}
