import {AuthResponseModel} from "./auth-response.model";

export interface SerializedUserModel {
  _email: string,
  _id: string,
  _token: string,
  _tokenExpirationDate: string,
}

export class UserModel {
  constructor(private _email: string,
              private _id: string,
              private _token: string,
              private _tokenExpirationDate: Date) {
  }

  static responseToUser(authResponse: AuthResponseModel) {
    return new UserModel(
      authResponse.email,
      authResponse.localId,
      authResponse.idToken,
      new Date(Date.now() + (+authResponse.expiresIn * 1000))
    );
  }

  static parse(user: SerializedUserModel) {
    return new UserModel(
      user._email,
      user._id,
      user._token,
      new Date(user._tokenExpirationDate)
    );
  }

  get token() {
    return this._tokenExpirationDate > new Date() ? this._token : null;
  }

  get tokenExpirationDate(): Date {
    return this._tokenExpirationDate;
  }
}
