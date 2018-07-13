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
  apiKey = '1e4a0bdb251c64e4';
  url: string = "http://192.168.10.102:8080/api";
  queryNotFound: string;

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
