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
  cbChecked = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public categoriesProvider: CateroriesProvider) {
  }

  ionViewDidLoad() {
    // this.categories = this.categoriesProvider.getAllCategories();

    let item = "item1";
    let title = "Categoria";
    let codigo = 1;
    let category = {title, item, codigo};

    this.categories = [ category, category ];
  }

  updateCheckedOptions(category, event) {
    var cbIdx = this.categories.indexOf(category);

    if(event.target.checked) {
        if(cbIdx < 0 ){
             this.cbChecked.push(category);
           console.log(category);
        }

    } else {
        if(cbIdx >= 0 ){
           this.cbChecked.splice(cbIdx,1);
            console.log(cbIdx);
        }

    }
  }

  calculatePreference() {
    console.log("itens checados: ", this.cbChecked);
    console.log("categories", this.categories);
  }

}
