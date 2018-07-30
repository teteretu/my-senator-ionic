import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { LoginPage } from "../login/login";
import { UserProvider } from "../../providers/user/user";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  registerForm = {
    email: "",
    password: "",
    name: ""
  }

  constructor(public nav: NavController,
    public alertController: AlertController,
    public loginProvider: UserProvider) {
  }

  // register and go to home page
  signUp() {
    if (this.checkFields()) {
      this.loginProvider.signUp(this.registerForm).subscribe((responseBack: any) => {

        let response = responseBack;

        if (response != null) {
          const alert = this.alertController.create({
            title: 'Sucesso!',
            subTitle: 'Cadastro realizado com sucesso!',
            buttons: ['OK']
          });
          if (alert.present()) {
            this.nav.setRoot(LoginPage);
          }

        } else {
          const alert = this.alertController.create({
            title: 'Atenção!',
            subTitle: 'Algo deu errado no seu cadastro!',
            buttons: ['OK']
          });
          alert.present();
          return false;
        }
      });

    }
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }

  checkFields() {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.registerForm.name == "" || this.registerForm.name == undefined) {
      const alert = this.alertController.create({
        title: 'Atenção!',
        subTitle: 'Campo de Nome não foi preenchido!',
        buttons: ['OK']
      });
      alert.present();
      return false;
    } else if (this.registerForm.email == "" || this.registerForm.email == undefined) {
      const alert = this.alertController.create({
        title: 'Atenção!',
        subTitle: 'Campo de Email não foi preenchido!',
        buttons: ['OK']
      });
      alert.present();
      return false;
    } else if (!re.test(this.registerForm.email)) {
      const alert = this.alertController.create({
        title: 'Atenção!',
        subTitle: 'Digite um email válido!',
        buttons: ['OK']
      });
      alert.present();
      return false;
    }
    else if (this.registerForm.password == "" || this.registerForm.password == undefined || this.registerForm.password.length <= 8) {
      const alert = this.alertController.create({
        title: 'Atenção!',
        subTitle: 'Campo de Senha não foi preenchido ou é menor que 8 caracteres!',
        buttons: ['OK']
      });
      alert.present();
      return false;
    } else {
      return true;
    }
  }
}
