import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
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

  loading;

  constructor(public navCtrl: NavController,
    private senatorProvider: SenatorProvider,
    public loadingCtrl: LoadingController) {
  }

  async ionViewWillEnter() {

    this.listSenatorByState = this.stateList;
    
    this.activeLoading();
    
    await this.senatorProvider.getSenators().subscribe( (senator: any) => {

      this.senatorsProvider = senator.senators.parlamentares;
      this.listSenatorByState = this.associateSenatorState();

      this.loading.dismiss();

    });

    this.loading.dismiss();
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
      
      this.activeLoading();

      this.senatorProvider.getSenatorByState(state.name, state.initials).subscribe((senator: any) => {

        this.senatorsProvider = senator.senators.parlamentares;

        this.loading.dismiss();
      });

    }

  }

  openDetail(senator) {
    this.navCtrl.push(SenatorDetailPage, senator);

  }
  
  activeLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Só um momento!!"
    });

    this.loading.present();
  }

}
