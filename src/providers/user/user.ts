import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { URL_API } from '../../consts/consts';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: HttpClient) {
  }

  signUp(registerForm) {

    try {
      return this.http.post( URL_API + "/user/signUp", registerForm).map(res => res);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  sign(loginForm) {

    try {
      return this.http.post( URL_API + "/user/sign", loginForm).map(res => res);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
