import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SenatorProvider } from '../../providers/senator/senator';
import { SenatorDetailPage } from '../senator-detail/senator-detail';

@Component({
  selector: 'page-senator-list',
  templateUrl: 'senator-list.html'
})
export class SenatorListPage {
  public senatorsProvider = [];
  public listSenatorByState = [];
  public stateList: Array<any> = [
    { name: 'Acre', initials: 'AC', senators: [] },
    { name: 'Alagoas', initials: 'AL', senators: [] },
    { name: 'Amapá', initials: 'AP', senators: [] },
    { name: 'Amazonas', initials: 'AM', senators: [] },
    { name: 'Bahia', initials: 'BA', senators: [] },
    { name: 'Ceará', initials: 'CE', senators: [] },
    { name: 'Distrito Federal', initials: 'DF', senators: [] },
    { name: 'Espírito Santo', initials: 'ES', senators: [] },
    { name: 'Goiás', initials: 'GO', senators: [] },
    { name: 'Maranhão', initials: 'MA', senators: [] },
    { name: 'Mato Grosso', initials: 'MT', senators: [] },
    { name: 'Mato Grosso do Sul', initials: 'MS', senators: [] },
    { name: 'Minas Gerais', initials: 'MG', senators: [] },
    { name: 'Pará', initials: 'PA', senators: [] },
    { name: 'Paraíba', initials: 'PB', senators: [] },
    { name: 'Paraná', initials: 'PR', senators: [] },
    { name: 'Pernambuco', initials: 'PE', senators: [] },
    { name: 'Piauí', initials: 'PI', senators: [] },
    { name: 'Rio de Janeiro', initials: 'RJ', senators: [] },
    { name: 'Rio Grande do Norte', initials: 'RN', senators: [] },
    { name: 'Rio Grande do Sul', initials: 'RS', senators: [] },
    { name: 'Rondônia', initials: 'RO', senators: [] },
    { name: 'Roraima', initials: 'RR', senators: [] },
    { name: 'Santa Catarina', initials: 'SC', senators: [] },
    { name: 'São Paulo', initials: 'SP', senators: [] },
    { name: 'Sergipe', initials: 'SE', senators: [] },
    { name: 'Tocantins', initials: 'TO', senators: [] }
  ]

  constructor(
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

      this.senatorProvider.getSenators().subscribe((senator: any) => {

        this.senatorsProvider = senator.senators.parlamentares;

        this.listSenatorByState = this.associateSenatorState();
      });
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
