import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';

import {MyApp} from "./app.component";

import {SettingsPage} from "../pages/settings/settings";
import {HomePage} from "../pages/home/home";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {SenatorListPage} from "../pages/senator-list/senator-list";
import { SenatorProvider } from "../providers/senator/senator";
import { SenatorDetailPage } from "../pages/senator-detail/senator-detail";
import { CateroriesProvider } from '../providers/caterories/caterories';
import { QuizPage } from "../pages/quiz/quiz";
import { SenatorInfoPage } from "../pages/senator-info/senator-info";
import { UserProvider } from "../providers/user/user";

// import services
// end import services
// end import services

// import pages
// end import pages

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    HomePage,
    LoginPage,
    SenatorListPage,
    SenatorDetailPage,
    RegisterPage,
    QuizPage,
    SenatorInfoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot({
      name: '__ionic3_start_theme',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    HomePage,
    LoginPage,
    SenatorListPage,
    SenatorDetailPage,
    RegisterPage,
    QuizPage,
    SenatorInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    SenatorProvider,
    CateroriesProvider,
    UserProvider
  ]
})

export class AppModule {
}
