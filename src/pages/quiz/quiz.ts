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

  treeTimes = 2;

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
    { categoria: "cat1", checked: false }, { categoria: "cat2", checked: false }, { categoria: "cat3", checked: false }];

    if (this.categories.length > 0) {
      
      this.categories.forEach((element) => {
        this.filteredCategories.push(element);
      });
      this.filteredCategories = this.filteredCategories.slice(0, 3);
      console.log(this.filteredCategories);
    }

  }


  calculatePreference() {
    
    let filtered = this.filteredCategories.filter(item => item.checked);
    filtered.forEach((element) => {
      this.choices.push(element);
    });

    if (this.choices.length > 0) {
      if (this.treeTimes > 3) {
        
        this.categoriesProvider.calculatePerfil(this.choices).subscribe((senators: any) => {

          if (senators != null) {
            this.nav.setRoot(SenatorListPage, { senators });
            return;
          }

        });
        this.nav.setRoot(SenatorListPage);

      } else {
        this.categories.forEach((element) => {
          this.filteredCategories.push(element);
        });
        this.filteredCategories = this.filteredCategories.slice(this.treeTimes * 3, (this.treeTimes * 3) + 3);
        
        this.treeTimes++;
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
