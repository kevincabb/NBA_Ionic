import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { UserData } from '../../providers/user-data';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage implements AfterViewInit {
  username: string;
  password: string;
  id: number;
  account;

  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserData
  ) {

  }

  ngAfterViewInit() {
    this.getUsername();


  }
  ngOnInit() {


    
  }



  // updatePicture() {
  //   console.log('Clicked to update picture');
  // }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  async changeUsername() {
    this.loadAccount();
    const alert = await this.alertCtrl.create({
      header: 'Change Username',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.account.userName = data.username;
            this.userData.updateAccountUsername(this.account);
            this.userData.setUsername(data.username);
            this.getUsername();
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'username',
          value: this.username,
          placeholder: 'username'
        }
      ]
    });
    console.log(this.account);
    await alert.present();
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

  async changePassword() {
    this.loadAccount();
    const alert = await this.alertCtrl.create({
      header: 'Change Password',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.account.password = data.password;
            this.userData.updateAccountPassword(this.account);
            // this.userData.setUsername(data.username);
            // this.getUsername();
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'password',
          value: this.password,
          placeholder: '********'
        }
      ]
    });
    console.log(this.account);
    await alert.present();
  }

  async loadAccount(){
    await this.userData.getId(this.username);
    this.id = await this.userData.idNum();
    console.log(this.id);

    await this.userData.getAccount(this.id);
    this.account = await this.userData.account();
    console.log(this.account);
  }

  logout() {
    this.userData.logout();
    this.router.navigateByUrl('/login');
  }

  // support() {
  //   this.router.navigateByUrl('/support');
  // }
}
