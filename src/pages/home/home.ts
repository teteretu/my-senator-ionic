import {Component} from "@angular/core";
import {NavController, PopoverController} from "ionic-angular";
import {Storage} from '@ionic/storage';

import { NotificationsPage } from "../notifications/notifications";
import { SettingsPage } from "../settings/settings";
import { SenatorListPage } from "../senator-list/senator-list";
import { QuizPage } from "../quiz/quiz";
import { SenatorInfoPage } from "../senator-info/senator-info";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  // search condition
  public search = {
    name: "Rio de Janeiro, Brazil",
    date: new Date().toISOString()
  }

  constructor(private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController) {
  }

  ionViewWillEnter() {
    this.storage.get('pickup').then((val) => {
      
    }).catch((err) => {
      console.log(err)
    });
  }

  // go to QuizPage page
  openQuizPage() {
    this.nav.push(QuizPage);
  }

  // senator List
  openSenatorList() {
    this.nav.push(SenatorListPage);
  }
  
  // senator Info
  openSenatorInfo() {
    this.nav.push(SenatorInfoPage);
  }

  // to go account page
  goToAccount() {
    this.nav.push(SettingsPage);
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }

}

//
