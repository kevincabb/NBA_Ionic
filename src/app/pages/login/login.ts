import { Component } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../components/interfaces/user-options';
import { AlertController } from '@ionic/angular';




@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;
  check: boolean;

  constructor(
    private userData: UserData,
    public router: Router,
    public alertController: AlertController
  ) {

  }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Username and/or Password is incorrect',
      buttons: ['OK']
    });

    await alert.present();
  }

  async onLogin(form: NgForm) {
    await this.userData.LogInBool(this.login);
    this.check = await this.userData.getBool();

    if (this.check) {
      console.log('logged in!');
      this.submitted = true;

      if (form.valid) {
        this.userData.login(this.login.username, form.value);
      }

    } else {
      this.presentAlert();
      form.reset();
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
