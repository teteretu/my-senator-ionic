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
    });

  }

  calculatePreference() {
    let choices = this.categories.filter(item => item.checked);

    if (choices.length >= 0) {
      this.categoriesProvider.calculatePerfil(choices).subscribe((senators: any) => {
        
        if (senators != null) {
          this.nav.setRoot(SenatorListPage, {senators});
        }
    
      });
    }

  }

}
