import { Component } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../components/interfaces/user-options';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup: UserOptions = { username: '', password: '' };
  submitted = false;
  check: boolean;

  constructor(
    public router: Router,
    private userData: UserData,
    public alertController: AlertController
  ) {
  }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Username taken',
      buttons: ['OK']
    });

    await alert.present();
  }


  async onSignup(form: NgForm) {
    await this.userData.SignUpBool(this.signup);
    this.check = await this.userData.getBool();

    if (!this.check) {
      console.log('check is false');
      this.submitted = true;

      if (form.valid) {
        this.userData.signup(this.signup.username, form.value);
        form.reset();
        this.router.navigateByUrl('/app/tabs/schedule');
      }
    } else {
      console.log('check is true');
      this.presentAlert();
      form.reset();
    }
  }
}
