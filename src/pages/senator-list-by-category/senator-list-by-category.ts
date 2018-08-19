import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SenatorDetailPage } from '../senator-detail/senator-detail';
import { SenatorProvider } from '../../providers/senator/senator';
import { CATEGORIES } from '../../consts/consts';

/**
 * Generated class for the SenatorListByCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-senator-list-by-category',
  templateUrl: 'senator-list-by-category.html',
})
export class SenatorListByCategoryPage {

  //variável que vem da tela de análise de perfil (Quiz)
  public senatorsProvider: any = [];
  public listSenatorByCaregory = [];
  public categoriesList = CATEGORIES;

  constructor(private navParams: NavParams,
    public navCtrl: NavController,
    private senatorProvider: SenatorProvider,
    private alertCtrl: AlertController) {
  }

  ionViewWillEnter() {

    this.listSenatorByCaregory = this.categoriesList;

    this.senatorsProvider = this.navParams.get('senatorProvider');

    if (this.senatorsProvider != undefined || this.senatorsProvider != null || this.senatorsProvider.length >= 0) {
      let podium = 1;

      for (let i = 0; i < this.senatorsProvider.length; i++) {
        
        if (podium < 4) {
          this.senatorsProvider[i].podium = podium;
          //enquanto o próximo valor de pls for igual
          while (this.senatorsProvider[i].numero_pls == this.senatorsProvider[i + 1].numero_pls) {
            this.senatorsProvider[++i].podium = podium;
          }
          podium++;
        } else {
          break;
        }
      }

      this.listSenatorByCaregory = this.senatorsProvider;
    }

  }

  // public associateSenatorCategory() {
  //   this.categoriesList.forEach((element) => {
  //     element.categories = this.senatorsProvider.filter(index => index.categoria.categoria == element.initials);
  //     if (podium < 4)
  //       element.position = podium;
  //   });

  //   return this.categoriesList;
  // }

  public getSenatorByCategory(category) {
    let aux = this.listSenatorByCaregory[0];
    this.listSenatorByCaregory = [];
    this.listSenatorByCaregory.push(aux);

    this.listSenatorByCaregory[0].categories = this.senatorsProvider.filter(index => index.categoria.categoria == category);
  }

  async openDetail(senator) {

    this.senatorProvider.getSenatorByCod(senator.codigoParlamentar.codigoParlamentar).subscribe(async (senator: any) => {
      let identificacaoParlamentar: any = [];
      identificacaoParlamentar.identificacaoParlamentar = await senator.senator;

      this.navCtrl.push(SenatorDetailPage, identificacaoParlamentar);
    });

  }

  info() {
    const alert = this.alertCtrl.create({
      title: 'Informações!',
      subTitle: 'Lista baseada nos projetos de lei que os parlamentares apresentaram no decorrer de seus mandatos.',
      buttons: ['OK']
    });
    alert.present();
  }
}
