export class UserModel {
  constructor(private email: string,
              private id: string,
              private _token: string,
              private tokenExpirationDate: Date) {
  }


  get token() {
    return this.tokenExpirationDate > new Date() ? this.tokenExpirationDate : null;
  }
}
