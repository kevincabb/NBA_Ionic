import { Component, Input } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { GamesService } from '../../providers/games.service';
import { PlayergameStatsService } from '../../providers/playergame-stats.service';
import { Games } from '../../components/interfaces/games';

@Component({
  selector: 'page-session-detail',
  styleUrls: ['./session-detail.scss'],
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  session: any;
  isFavorite = false;
  defaultHref = '';
  todaysGames = [];
  gameDetail: Games;
  gameId: string;

  constructor(private playerService: PlayergameStatsService, private gameService: GamesService) { 
   
  }

  ngOnInit() {
    this.gameId = this.playerService.getId();
    this.todaysGames = this.gameService.getGame();

    console.log(this.todaysGames);
    this.today(this.gameId);

    if(this.gameDetail === null){
      alert("Postpone");
    }
  }

  today(id){
    for(let i = 0; i < this.todaysGames[0].gamesToday.length; i++){
      if(id === this.todaysGames[0].gamesToday[i].id){
        this.gameDetail = this.todaysGames[0].gamesToday[i];
        console.log(this.gameDetail);
      }
    }
  }
  // ionViewWillEnter() {
  //   this.dataProvider.load().subscribe((data: any) => {
  //     if (data && data.schedule && data.schedule[0] && data.schedule[0].groups) {
  //       const sessionId = this.route.snapshot.paramMap.get('sessionId');
  //       for (const group of data.schedule[0].groups) {
  //         if (group && group.sessions) {
  //           for (const session of group.sessions) {
  //             if (session && session.id === sessionId) {
  //               this.session = session;

  //               this.isFavorite = this.userProvider.hasFavorite(
  //                 this.session.name
  //               );

  //               break;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   });
  // }

  // ionViewDidEnter() {
  //   this.defaultHref = `/app/tabs/schedule`;
  // }

  // sessionClick(item: string) {
  //   console.log('Clicked', item);
  // }

  // toggleFavorite() {
  //   if (this.userProvider.hasFavorite(this.session.name)) {
  //     this.userProvider.removeFavorite(this.session.name);
  //     this.isFavorite = false;
  //   } else {
  //     this.userProvider.addFavorite(this.session.name);
  //     this.isFavorite = true;
  //   }
  // }

  // shareSession() {
  //   console.log('Clicked share session');
  // }
}
