import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '../../../node_modules/@angular/common/http';
// import { URL_API } from '../../consts/consts';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient) {
  }

  login(email, password) {

    try {
      // let login = {
      //   email,
      //   password
      // }
      // return this.http.post( URL_API + "/login/log", login).map(res => res);
      return true;
    } catch (error) {
      console.error();
      return null;
    }
  }
}
