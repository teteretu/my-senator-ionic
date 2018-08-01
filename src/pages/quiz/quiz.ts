import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CateroriesProvider } from '../../providers/caterories/caterories';
import { SenatorListPage } from '../senator-list/senator-list';

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
export class QuizPage {
  //JSON com todas as categorias
  categories = [];
  filteredCategories = [];
  choices = [];

  // mostra categorias de x em x
  showIn = 3;

  treeTimes = 3;

  constructor(public nav: NavController,
    public navParams: NavParams,
    public categoriesProvider: CateroriesProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {

    this.categoriesProvider.getAllCategories().subscribe((category: any) => {
      category.categories.forEach(element => {
        element.checked = false;
      });

      // this.categories = category.categories;
    });
    this.categories = [{ categoria: "Saúde", checked: false }, { categoria: "Transporte", checked: false }, { categoria: "Trabalho", checked: false },
    { categoria: "Segurança", checked: false }, { categoria: "Educação", checked: false }, { categoria: "Infraestrutura", checked: false },
    { categoria: "cat1", checked: false }, { categoria: "cat2", checked: false }, { categoria: "cat3", checked: false },
    { categoria: "cat3", checked: false }, { categoria: "cat4", checked: false }, { categoria: "cat4", checked: false }];

    if (this.categories.length > 0) {

      this.filteredCategories = this.categories.slice(0, this.showIn);
      console.log(this.categories);
    }

  }

  back() {
    this.filteredCategories = this.categories;

    this.filteredCategories = this.filteredCategories.slice(this.treeTimes - (2 * this.showIn), this.treeTimes - this.showIn);

    this.treeTimes -= 3;
  }

  calculatePreference() {

    let filtered = this.filteredCategories.filter(item => item.checked);

    this.categories.forEach((category) => {
      if (filtered.find(element => element.categoria == category.categoria) != undefined)
        category.checked = true;
    });

    this.choices = [];
    filtered.forEach((element) => {
      this.choices.push(element);
    });

    if (this.choices.length > 0) {
      if (this.treeTimes >= this.categories.length) {
        this.choices = this.categories.filter(item => item.checked)

        if (this.choices.length > 0) {
          this.categoriesProvider.calculatePerfil(this.choices).subscribe((senators: any) => {

            if (senators != null) {
              this.nav.setRoot(SenatorListPage, { senators });
              return;
            }

          });
          this.nav.setRoot(SenatorListPage);
        } else {
          const alert = this.alertCtrl.create({
            title: 'Atenção!',
            subTitle: 'Porfavor, selecione uma categoria!',
            buttons: ['OK']
          });
          alert.present();
        }
      } else {
        this.filteredCategories = [];
        this.categories.forEach((element) => {
          this.filteredCategories.push(element);
        });
        console.log(this.treeTimes, this.treeTimes + this.showIn);
        console.log(this.filteredCategories);
        console.log(this.filteredCategories.slice(this.treeTimes, this.treeTimes + this.showIn));
        this.filteredCategories = this.filteredCategories.slice(this.treeTimes, this.treeTimes + this.showIn);

        this.treeTimes += this.showIn;
      }
    } else {
      const alert = this.alertCtrl.create({
        title: 'Atenção!',
        subTitle: 'Porfavor, selecione uma categoria!',
        buttons: ['OK']
      });
      alert.present();
    }

  }

}
