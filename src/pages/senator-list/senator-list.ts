import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SenatorProvider } from '../../providers/senator/senator';
import { SenatorDetailPage } from '../senator-detail/senator-detail';
import { STATES } from '../../consts/consts';

@Component({
  selector: 'page-senator-list',
  templateUrl: 'senator-list.html'
})
export class SenatorListPage {
  public senatorsProvider = [];
  public listSenatorByState = [];
  public stateList = STATES;
  
  constructor(private navParams: NavParams,
    public navCtrl: NavController,
    private senatorProvider: SenatorProvider,
    private storage: Storage) {
  }

  ionViewWillEnter() {

    this.listSenatorByState = this.stateList;

    this.storage.get('location').then((val) => {
      if (val != null) {
        console.log("get val: ", JSON.parse(val));

      }

    });

    this.senatorsProvider = this.navParams.get('senators');
    
    if (this.senatorsProvider == undefined || this.senatorsProvider == null || this.senatorsProvider.length == 0) {
      
      this.senatorProvider.getSenators().subscribe((senator: any) => {

        this.senatorsProvider = senator.senators.parlamentares;
        this.listSenatorByState = this.associateSenatorState();
      });

    } else {
      this.listSenatorByState = this.associateSenatorState();
    }

  }

  public associateSenatorState() {

    this.stateList.forEach((element) => {
      element.senators = this.senatorsProvider.filter(index => index.identificacaoParlamentar.ufParlamentar == element.initials);

    });

    return this.stateList;
  }

  public getSenatorByState(state) {
    this.listSenatorByState = [];
    this.listSenatorByState.push(state);

    if (state != undefined) {
      this.senatorProvider.getSenatorByState(state.name, state.initials).subscribe((senator: any) => {

        this.senatorsProvider = senator.senators.parlamentares;
      });
    }

  }

  openDetail(senator) {
    this.navCtrl.push(SenatorDetailPage, senator);

  }
}
