import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import { LoginProvider } from "../../providers/login/login";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  email = "";
  password = "";

  constructor(public nav: NavController,
      public alertController: AlertController,
      public menu: MenuController,
      public toastCtrl: ToastController,
      public loginProvider: LoginProvider) {
    this.menu.swipeEnable(false);
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {

    if (this.checkFields()) {
      this.nav.setRoot(HomePage);
    }
  }

  forgotPass() {
    let forgot = this.alertController.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

  checkFields() {
    if (this.email == "" || this.email == undefined) {
      const alert = this.alertController.create({
        title: 'Atenção!',
        subTitle: 'Campo de Email não foi preenchido!',
        buttons: ['OK']
      });
      alert.present();
      return false;
    }else if (this.password == "" || this.password == undefined || this.password.length > 8) {
      const alert = this.alertController.create({
        title: 'Atenção!',
        subTitle: 'Campo de Senha não foi preenchido!',
        buttons: ['OK']
      });
      alert.present();
      return false;
    }else {
      let user = this.loginProvider.login(this.email, this.password);
      if (user != null && user) {
        return true;
      }
    }

  }

}
