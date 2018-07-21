import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  public categories;

  constructor(public nav: NavController, public navParams: NavParams,
    public categoriesProvider: CateroriesProvider) {
  }

  ionViewDidLoad() {
    this.categoriesProvider.getAllCategories().subscribe((category: any) => {
      category.categories.forEach(element => {
        element.checked = false;
      });
      
      this.categories = category.categories;
      console.log(this.categories);
    });

    // let title = "Categoria1";
    // let item = ["item1"];
    // let checked = false;
    // let category = {title, item, checked};

    // title = "Categoria2";
    // item = ["item2"];
    // let category2 = {title, item, checked}

    // this.categories = [ category, category2 ];
  }

  calculatePreference() {
    let choices = this.categories.filter(item => item.checked);

    if (choices.length >= 0)
      this.categoriesProvider.calculatePerfil(choices).subscribe((senators: any) => {
        console.log(senators);
        if (senators != null) {
          this.nav.setRoot(SenatorListPage);
        }
    
      });

  }

}
