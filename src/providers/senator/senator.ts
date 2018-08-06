import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../../consts/consts';

/*
  Generated class for the SenatorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SenatorProvider {
  
  constructor(public http: HttpClient) {
  }

  getSenators() {
    try {
      return this.http.get( URL_API + "/senators/all").map(res => res);
    } catch (error) {
      console.error(error);
    }
    
  }

  getSenatorByState(state, initials) {
    try {
      return this.http.get( URL_API + state + '/' + initials + '.json').map(res => res);
    } catch (error) {
      console.error(error);
    }
    
  }

  getSenatorByCod(id) {
    try {
      return this.http.post( URL_API + '/senator/id', id).map(res => res);
    } catch (error) {
      console.error(error);
    }
  }

}
