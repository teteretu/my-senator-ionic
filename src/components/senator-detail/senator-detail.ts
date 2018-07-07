import { Component } from '@angular/core';

/**
 * Generated class for the SenatorDetailComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'senator-detail',
  templateUrl: 'senator-detail.html'
})
export class SenatorDetailComponent {

  text: string;

  constructor() {
    console.log('Hello SenatorDetailComponent Component');
    this.text = 'Hello World';
  }

}
