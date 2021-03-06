import { Component, OnInit } from "@angular/core";
import { NavController, AlertController, ToastController, MenuController, LoadingController } from "ionic-angular";
import { RegisterPage } from "../register/register";
import { UserProvider } from "../../providers/user/user";
import { QuizPage } from "../quiz/quiz";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

  loginForm = {
    email: "",
    password: ""
  }

  loading;

  constructor(public nav: NavController,
    public alertController: AlertController,
    public menu: MenuController,
    public toastCtrl: ToastController,
    public userProvider: UserProvider,
    public loadingCtrl: LoadingController) {
    this.menu.swipeEnable(false);
  }

  ngOnInit() {
    this.loginForm.email = "teteretu@yahoo.com";
    this.loginForm.password = "teteretuteteretu";
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  signIn() {

    if (this.checkFields()) {

      this.activeLoading();
      this.userProvider.sign(this.loginForm).subscribe((responseBack: any) => {

        let response = responseBack;

        if (response != null && response.confirmLogin && response != "") {
          this.nav.setRoot(QuizPage);

        } else {
          const alert = this.alertController.create({
            title: 'Atenção!',
            subTitle: 'Usuário ou Senha inválidos!',
            buttons: ['OK']
          });
          alert.present();

        }

      });

      this.loading.dismiss();
    }
  }

  forgotPass() {
    let forgot = this.alertController.create({
      title: 'Esqueceu sua senha?',
      message: "Digite seu email e receba uma nova senha.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email enviado com sucesso',
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

    if (this.loginForm.email == "" || this.loginForm.email == undefined) {
      const alert = this.alertController.create({
        title: 'Atenção!',
        subTitle: 'Campo de Email não foi preenchido!',
        buttons: ['OK']
      });
      alert.present();
      return false;
    } else if (this.loginForm.password == "" || this.loginForm.password == undefined || this.loginForm.password.length <= 8) {
      const alert = this.alertController.create({
        title: 'Atenção!',
        subTitle: 'Campo de Senha não foi preenchido ou é inválido!',
        buttons: ['OK']
      });
      alert.present();
      return false;
    } else {

      this.activeLoading();
      let user = this.userProvider.sign(this.loginForm);
      this.loading.dismiss();
      
      if (user != null && user) {
        return true;
      }
    }

  }

  activeLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Só um momento!!"
    });

    this.loading.present();
  }

}
