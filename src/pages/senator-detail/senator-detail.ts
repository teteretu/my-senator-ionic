import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

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
export class SenatorDetailPage implements OnInit {

  identificacao: any;
  projetosLei: any;

  constructor(public navCtrl: NavController, 
      private alertCtrl: AlertController, 
      public navParams: NavParams) {
  }

  ngOnInit() {
    
    this.identificacao = this.navParams.get('senator');
    this.projetosLei = this.navParams.get('projetosLei');
    
    console.log("projet ", this.projetosLei);
  }

  openDetail(projeto) {
    const alert = this.alertCtrl.create({
      title: projeto.categoria,
      subTitle: projeto.ementaMateria,
      buttons: ['OK']
    });
    alert.present();
  }
}
