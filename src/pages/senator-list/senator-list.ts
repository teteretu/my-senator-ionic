import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SenatorProvider } from '../../providers/senator/senator';

@Component({
  selector: 'page-senator-list',
  templateUrl: 'senator-list.html'
})
export class SenatorListPage {
  senators = [];
  // state: {
  //   initials: string,
  //   name: string
  // }

  public stateListSelecteds = [];
  public stateList: Array<any> = [
    {name: 'Acre', initials: 'AC'},
    {name: 'Alagoas', initials: 'AL'},
    {name: 'Amapá', initials: 'AP'},
    {name: 'Amazonas', initials: 'AM'},
    {name: 'Bahia', initials: 'BA'},
    {name: 'Ceará', initials: 'CE'},
    {name: 'Distrito Federal', initials: 'DF'},
    {name: 'Espírito Santo', initials: 'ES'},
    {name: 'Goiás', initials: 'GO'},
    {name: 'Maranhão', initials: 'MA'},
    {name: 'Mato Grosso', initials: 'MT'},
    {name: 'Mato Grosso do Sul', initials: 'MS'},
    {name: 'Minas Gerais', initials: 'MG'},
    {name: 'Pará', initials: 'PA'},
    {name: 'Paraíba', initials: 'PB'},
    {name: 'Paraná', initials: 'PR'},
    {name: 'Pernambuco', initials: 'PE'},
    {name: 'Piauí', initials: 'PI'},
    {name: 'Rio de Janeiro', initials: 'RJ'},
    {name: 'Rio Grande do Norte', initials: 'RN'},
    {name: 'Rio Grande do Sul', initials: 'RS'},
    {name: 'Rondônia', initials: 'RO'},
    {name: 'Roraima', initials: 'RR'},
    {name: 'Santa Catarina', initials: 'SC'},
    {name: 'São Paulo', initials: 'SP'},
    {name: 'Sergipe', initials: 'SE'},
    {name: 'Tocantins', initials: 'TO'}
  ]

  constructor(
    public navCtrl: NavController,
    private senatorProvider: SenatorProvider,
    private storage: Storage) {
  }

  ionViewWillEnter() {
    console.log("view enter");
    this.stateListSelecteds = this.stateList;

    this.storage.get('location').then((val) => {
      if (val != null) {
        console.log("get val: ", JSON.parse(val));

      }

      this.senatorProvider.getSenators().subscribe((senator: any) => {
        
        this.senators = senator.senators.parlamentares;
        console.log("senator", this.senators);
      });
    });

  }

  public getSenatorByState(state) {
    this.stateListSelecteds = state;

    if (typeof state === 'string') {
      this.stateListSelecteds = JSON.parse(state);
      
    } else {
      this.stateListSelecteds = state;
    }

    if (state != undefined) {
      this.senatorProvider.getSenatorByState(state.name, state.initials).subscribe((senator: any) => {
        
        this.senators = senator.senators.parlamentares;
      });
    }
    
  }

}
