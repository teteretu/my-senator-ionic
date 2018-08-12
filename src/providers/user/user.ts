import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { URL_API } from '../../consts/consts';
import { AES } from 'crypto-js'; // For AES encryption/decryption

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  secret = "Exadsgdhg12436!&@%";
  
  constructor(public http: HttpClient) {
  }

  signUp(registerForm) {

    try {
      let register = {
        name: "",
        password: "",
        email: ""
      };
      register.name = registerForm.name;
      register.password = AES.encrypt(registerForm.password, this.secret).toString();
      register.email = AES.encrypt(registerForm.email, this.secret).toString();

      return this.http.post( URL_API + "/user/signUp", register).map(res => res);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  sign(loginForm) {

    try {
      let login = {
        password : "",
        email: ""
      };

      login.password = AES.encrypt(loginForm.password, this.secret).toString();
      login.email = AES.encrypt(loginForm.email, this.secret).toString();

      return this.http.post( URL_API + "/user/sign", login).map(res => res);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

}
