import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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
  categories = [];
  filteredCategories = [];
  choices = [];

  // mostra categorias de x em x
  showIn = 3;
  //quantas vezes já passou
  initialPosition = this.showIn;

  //quantas vezes irá perguntar
  manyTimes = 0;

  ceil = 0;

  constructor(public nav: NavController,
    public navParams: NavParams,
    public categoriesProvider: CateroriesProvider,
    public alertCtrl: AlertController) {
  }

  async ngOnInit() {

    await this.categoriesProvider.getAllCategories().subscribe((category: any) => {
      category.categories.forEach(element => {
        element.checked = false;
      });

      this.categories = category.categories;
      this.manyTimes = Math.ceil(this.categories.length / 3);
      this.ceil = Math.ceil(this.categories.length / 3);
    });
    // this.categories = [{ categoria: "Saúde", checked: false }, { categoria: "Transporte", checked: false }, { categoria: "Trabalho", checked: false },
    // { categoria: "Segurança", checked: false }, { categoria: "Educação", checked: false }, { categoria: "Infraestrutura", checked: false },
    // { categoria: "cat1", checked: false }, { categoria: "cat2", checked: false }, { categoria: "cat3", checked: false },
    // { categoria: "cat3", checked: false }, { categoria: "cat4", checked: false }, { categoria: "cat4", checked: false }];
    setTimeout(() => {
      if (this.categories.length > 0) {

        this.filteredCategories = this.categories.slice(0, this.showIn);
      }
    }, 500);

  }

  back() {
    this.filteredCategories = this.categories;
    this.filteredCategories = this.filteredCategories.slice(this.initialPosition - (2 * this.showIn), this.initialPosition - this.showIn);

    this.initialPosition -= this.showIn;
    this.manyTimes++;
  }

  async calculatePreference() {

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
      if (this.initialPosition >= this.categories.length) {
        this.choices = this.categories.filter(item => item.checked)

        if (this.choices.length > 0) {
          await this.categoriesProvider.calculatePerfil(this.choices).subscribe((senators: any) => {
            let senatorProvider = senators.senadores;
            

            this.nav.setRoot(SenatorListByCategoryPage, { senatorProvider });
            return;
          });

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
        this.filteredCategories = this.filteredCategories.slice(this.initialPosition, this.initialPosition + this.showIn);

        this.initialPosition += this.showIn;
        this.manyTimes--;
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
