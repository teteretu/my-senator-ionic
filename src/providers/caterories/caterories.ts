import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../../consts/consts';

/*
  Generated class for the CateroriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CateroriesProvider {
  
  constructor(public http: HttpClient) {
  }

  getAllCategories() {
    try {
      return this.http.get( URL_API + "/categories/all").map(res => res);
    } catch (error) {
      console.error(error);
      return null;
    }
    
  }
  
  calculatePerfil(categories) {
    try {
      return this.http.post( URL_API + "/categories/calculate", categories).map(res => res);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
