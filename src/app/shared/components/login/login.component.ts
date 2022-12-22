import { Component } from '@angular/core';
import { ILogin } from '../../models/login';
import { ISignin } from '../../models/signin';
import { LoginService } from '../../services/login.service';
import { SignupService } from '../../services/signup.service';
import { ModalService } from '../private-common/_modal/modal.service';
@Component({
  selector: 'project-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent {
  login: ILogin = { username: '', password: '' };
  signin: ISignin = {
    username: '', email: '', password: '',
    auth: false,
    role: '',
    accessToken: '',
    userId: 0
  };
  registerMessage: string;
  loginErrorMessage: string;
  registerErrorMessage: string;

  constructor(private modalService: ModalService, 
    private loginService: LoginService,
    private signupService: SignupService) {

  }
  // здесь добавляем loginService - определяем залогинен ли юзер
  openLoginRegister(id: string) {
    console.log(id);
   console.log(this.modalService);
    if (id == 'register__form') {
      this.modalService.close('login__form');
    }
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
  register() {

  }

  onSubmitLogin() {
    this.loginService.getLoginData(JSON.stringify(this.login))
      // обязательно нужен subscribe
      .subscribe({
        next: (loginData) => {
          // тут получаем loginData
          // можно делать все что нужно
          // запишем в LocalStorage
          // auth: true,username:userData.username,role:roleName, accessToken: token
          if (loginData && loginData.accessToken) {
            localStorage.setItem('username', loginData.username);
            localStorage.setItem('role', loginData.role);
            localStorage.setItem('accessToken', loginData.accessToken);
            localStorage.setItem('userId', loginData.userId.toString());
            this.modalService.close('login__form');
          }
        },
        error: err => {
          this.loginErrorMessage = JSON.parse(err).error;
        }
      });
  }

  registerOk() {
    this.modalService.close('register__success');
  }

  onExitLogin() {
    this.loginService.exitLogin();
  }

  onSubmitSignin() {
    // создаем с ролью только USER
    this.signin.role = 'USER';
    this.signupService.signUpUser(JSON.stringify(this.signin)).subscribe({
      next: result => {
        this.modalService.close('register__form');
        this.modalService.open('register__success');
        this.registerMessage = result.message;
      },
      error: err => {
        this.registerErrorMessage = JSON.parse(err).error.message;
      }

    }

    )
  }

}
