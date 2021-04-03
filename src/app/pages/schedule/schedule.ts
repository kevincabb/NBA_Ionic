import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';


import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { GamesService } from '../../providers/games.service';
import * as moment from 'moment';
import { PlayergameStatsService } from '../../providers/playergame-stats.service';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  styleUrls: ['./schedule.scss'],
})
export class SchedulePage implements OnInit {
  // Gets a reference to the list element
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;

  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  showSearchbar: boolean;

  gameSchedule = [];
  accountInfo;
  accountId: number;
  date: string; 
  sheet: string;
  gameId: string;
  selecteDate: any;
  seasonStartDate =  moment('20191022').format('YYYY-MM-DD');
  seasonEndDate = moment('20201012').format('YYYY-MM-DD');
  picker;

  constructor(
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public user: UserData,
    public config: Config,
    private gameService: GamesService,
    private playerService: PlayergameStatsService,
    public alertController: AlertController
  ) { 
    
    this.date = this.gameService.getDate();
    this.selecteDate = moment(this.date).format("MM D, YYYY");
    this.gameService.getData();
    this.gameSchedule = this.gameService.getGame();
    console.log(this.gameSchedule);
  }

  ngOnInit() {
    this.gameService.$dateUrl.subscribe(dateurl=> {
      this.date = dateurl;
    });

    this.playerService.$gameIdUrl.subscribe(id=> {
      this.gameId = id;
    });

    this.accountId = this.user.idNum();
    console.log(this.accountId);


    

    this.updateSchedule();
    this.ios = this.config.get('mode') === 'ios';
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Game is Postponed',
      buttons: ['OK']
    });

    await alert.present();
  }

  // async loadSchedule(){
  //   this.date = this.selecteDate;
  //   console.log(this.date);
  //   this.gameService.selectDate(this.date);
  //   console.log(this.date);
  //   this.gameService.getData();
  //   this.gameSchedule = this.gameService.getGame();
  // }

  previousDay(){
    this.gameService.previousDate(this.date);
    this.selecteDate = moment(this.date).format("MM D, YYYY");
    this.gameService.getData();
    this.gameSchedule = this.gameService.getGame();
  }

  nextDay(){
    this.gameService.nextDate(this.date);
    this.selecteDate = moment(this.date).format("MM D, YYYY");
    this.gameService.getData();
    this.gameSchedule = this.gameService.getGame();
    console.log(this.gameSchedule);
  }

  getNewSchedule(){
    this.gameService.getData();
    this.gameSchedule = this.gameService.getGame();
  }

  updateSchedule() {
    // Close any open sliding items when the schedule updates
    if (this.scheduleList) {
      this.scheduleList.closeSlidingItems();
    }

    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }

  getGameId(value, status){
    if(status === "UNPLAYED"){
      this.presentAlert();
    } else {
      this.playerService.changeGameId(value);
      this.router.navigateByUrl('/app/tabs/schedule/session/'+ value);
    }
  }

  async openSocial(network: string, fab: HTMLIonFabElement) {
    const loading = await this.loadingCtrl.create({
      message: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    await loading.present();
    await loading.onWillDismiss();
    fab.close();
  }
}


  //Conference APP extras


  // async presentFilter() {
  //   const modal = await this.modalCtrl.create({
  //     component: ScheduleFilterPage,
  //     swipeToClose: true,
  //     presentingElement: this.routerOutlet.nativeEl,
  //     componentProps: { excludedTracks: this.excludeTracks }
  //   });
  //   await modal.present();

  //   const { data } = await modal.onWillDismiss();
  //   if (data) {
  //     this.excludeTracks = data;
  //     this.updateSchedule();
  //   }
  // }

  // async addFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any) {
  //   if (this.user.hasFavorite(sessionData.name)) {
  //     // Prompt to remove favorite
  //     this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
  //   } else {
  //     // Add as a favorite
  //     this.user.addFavorite(sessionData.name);

  //     // Close the open item
  //     slidingItem.close();

  //     // Create a toast
  //     const toast = await this.toastCtrl.create({
  //       header: `${sessionData.name} was successfully added as a favorite.`,
  //       duration: 3000,
  //       buttons: [{
  //         text: 'Close',
  //         role: 'cancel'
  //       }]
  //     });

  //     // Present the toast at the bottom of the page
  //     await toast.present();
  //   }

  // }

  // async removeFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any, title: string) {
  //   const alert = await this.alertCtrl.create({
  //     header: title,
  //     message: 'Would you like to remove this session from your favorites?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: () => {
  //           // they clicked the cancel button, do not remove the session
  //           // close the sliding item and hide the option buttons
  //           slidingItem.close();
  //         }
  //       },
  //       {
  //         text: 'Remove',
  //         handler: () => {
  //           // they want to remove this session from their favorites
  //           this.user.removeFavorite(sessionData.name);
  //           this.updateSchedule();

  //           // close the sliding item and hide the option buttons
  //           slidingItem.close();
  //         }
  //       }
  //     ]
  //   });
  //   // now present the alert on top of all other content
  //   await alert.present();
  // }

  
