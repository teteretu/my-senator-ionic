import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, NavController } from 'ionic-angular';
import { CateroriesProvider } from '../../providers/caterories/caterories';
import { SenatorListByCategoryPage } from '../senator-list-by-category/senator-list-by-category';

/**
 * Generated class for the QuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage implements OnInit {
  //JSON com todas as categorias
  categoriesInitial = [];
  filteredCategories = [];
  choices = [];

  // escolher pelo menos 3 candidatos
  until = 3;

  constructor(public navParams: NavParams,
    public categoriesProvider: CateroriesProvider,
    public alertCtrl: AlertController,
    public navCtrl: NavController) {
  }

  async ngOnInit() {

    await this.categoriesProvider.getAllCategories().subscribe((category: any) => {

      this.categoriesInitial = category.categories;
      this.filteredCategories = this.categoriesInitial;
      this.filteredCategories.sort(function (a, b) {
        if (a.categoria < b.categoria)
          return -1;
        if (a.categoria > b.categoria)
          return 1;
        return 0;
      });

    });

  }

  info() {
    const alert = this.alertCtrl.create({
      title: 'Informação!',
      subTitle: "Selecione pelo menos 3 categorias, sendo os primeiros mais importantes que os últimos!",
      buttons: ['OK']
    });
    alert.present();
  }

  back() {

    this.filteredCategories.push(this.choices.pop());

    this.filteredCategories.sort(function (a, b) {
      if (a.categoria < b.categoria)
        return -1;
      if (a.categoria > b.categoria)
        return 1;
      return 0;
    });


  }

  next(category) {

    this.choices.push(this.filteredCategories.filter(element => element.categoria == category)[0]);

    this.filteredCategories = this.filteredCategories.filter(element => element.categoria != category);


  }

  async calculatePreference() {

    console.log(this.choices);
    //se ele escolheu no mínimo o valor de until
    if (this.choices.length >= this.until) {

      await this.categoriesProvider.calculatePerfil(this.choices).subscribe((senators: any) => {
        let senatorProvider = senators.senadores;

        this.navCtrl.setRoot(SenatorListByCategoryPage, { senatorProvider });
        return;
      });
    }

  }

}
