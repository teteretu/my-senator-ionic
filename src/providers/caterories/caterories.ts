import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '../../../node_modules/@angular/common/http';

/*
  Generated class for the CateroriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CateroriesProvider {
  url: string = "http://192.168.10.102:8080/api";
  
  constructor(public http: HttpClient) {
  }

  getAllCategories() {
    try {
      return this.http.get( this.url + "/categories/all").map(res => res);
    } catch (error) {
      console.error();
    }
    
  }
}
