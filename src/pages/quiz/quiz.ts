import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CateroriesProvider } from '../../providers/caterories/caterories';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public categoriesProvider: CateroriesProvider) {
  }

  ionViewDidLoad() {
    this.categories = this.categoriesProvider.getAllCategories();
  }

}
