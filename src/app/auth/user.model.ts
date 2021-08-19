import {AuthResponseModel} from "./auth-response.model";

export class UserModel {
  constructor(private _email: string,
              private _id: string,
              private _token: string,
              private _tokenExpirationDate: Date) {
  }

  static toUser(authResponse: AuthResponseModel) {
    return new UserModel(
      authResponse.email,
      authResponse.localId,
      authResponse.idToken,
      new Date(Date.now() + (+authResponse.expiresIn * 1000))
    );
  }

  get token() {
    return this._tokenExpirationDate > new Date() ? this._token : null;
  }

  get tokenExpirationDate(): Date {
    return this._tokenExpirationDate;
  }
}
