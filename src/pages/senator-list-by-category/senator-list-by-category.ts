import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  public senatorsProvider = [];
  public listSenatorByCaregory = [];
  public categoriesList = CATEGORIES;
  
  constructor(private navParams: NavParams,
    public navCtrl: NavController,
    private senatorProvider: SenatorProvider) {
  }

  ionViewWillEnter() {

    this.listSenatorByCaregory = this.categoriesList;

    this.senatorsProvider = this.navParams.get('senatorProvider');
    
    if (this.senatorsProvider != undefined || this.senatorsProvider != null || this.senatorsProvider.length >= 0) {
      
      this.listSenatorByCaregory = this.associateSenatorCategory();

    }

  }

  public associateSenatorCategory() {

    this.categoriesList.forEach((element) => {
      element.categories = this.senatorsProvider.filter(index => index.categoria.categoria == element.initials);

    });

    return this.categoriesList;
  }

  public getSenatorByCategory(category) {
    this.listSenatorByCaregory = this.senatorsProvider.filter(index => index.categoria.categoria == category);

    // if (category != undefined) {
    //   this.senatorProvider.getSenatorBycategory(category.name, category.initials).subscribe((senator: any) => {

    //     this.senatorsProvider = senator.senators.parlamentares;
    //   });
    // }

  }

  async openDetail(senator) {

    this.senatorProvider.getSenatorByCod(senator.codigoParlamentar.codigoParlamentar).subscribe( async (senator: any) => {
      let identificacaoParlamentar: any = [];
      identificacaoParlamentar.identificacaoParlamentar = await senator.senator;
      console.log(identificacaoParlamentar);
      this.navCtrl.push(SenatorDetailPage, identificacaoParlamentar);
    });
    
    

  }
}
