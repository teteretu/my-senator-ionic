import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SenatorDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-senator-detail',
  templateUrl: 'senator-detail.html',
})
export class SenatorDetailPage {

  identificacao = "";
  mandato = "";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
    this.identificacao = this.navParams.get('identificacaoParlamentar');
    this.mandato = this.navParams.get('mandato');
  }

}
