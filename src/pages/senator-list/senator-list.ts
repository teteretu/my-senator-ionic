import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,
    private senatorProvider: SenatorProvider) {
  }

  ionViewWillEnter() {

    this.listSenatorByState = this.stateList;

    this.senatorProvider.getSenators().subscribe(async (senator: any) => {

      this.senatorsProvider = await senator.senators.parlamentares;
      this.listSenatorByState = this.associateSenatorState();

    });

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
