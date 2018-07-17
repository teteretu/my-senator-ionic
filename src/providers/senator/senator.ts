import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

/*
  Generated class for the SenatorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SenatorProvider {
  url: string = "http://192.168.10.103:8080/api";
  
  constructor(public http: HttpClient) {
    console.log('Hello SenatorProvider Provider');
    // this.url = 'http://api.wunderground.com/api/'+ this.apiKey +'/conditions/q/'
  }

  getSenators() {
    try {
      return this.http.get( this.url + "/senators/all").map(res => res);
    } catch (error) {
      console.error();
    }
    
  }

  getSenatorByState(state, initials) {
    try {
      return this.http.get(this.url + state + '/' + initials + '.json').map(res => res);
    } catch (error) {
      console.error();
    }
    
  }

}
