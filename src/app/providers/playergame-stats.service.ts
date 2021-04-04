import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { PlayergameStats } from '../components/interfaces/playergame-stats';


@Injectable({
  providedIn: 'root'
})
export class PlayergameStatsService {

  awayStats = [];
  homestats = [];
  //API URL for station list
  statsUrl = 'https://api.mysportsfeeds.com/v2.1/pull/nba/2020-2021-regular/games/';
  gameIdUrl: string;
  typeU = '/boxscore.json';
  statSheet;

  // Insert personal API into headers: signup at mysportsfeeds.com
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Basic ' + btoa('<APIKEY>:MYSPORTSFEEDS')
    })
  };

  $gameIdUrl = new BehaviorSubject<string>(this.gameIdUrl);

  constructor(private http: HttpClient) {

   }

  getData() {
    this.awayStats = [];
    this.homestats = [];
    // http request for JSON data
    this.statSheet = this.http.get(this.statsUrl + this.gameIdUrl+ this.typeU, this.httpOptions);

    // stream stat data to away variable
    this.statSheet.subscribe(x => {
      for (let s of x.stats.away.players) {
        let info: PlayergameStats = {
          name: s.player.firstName[0] + ". " + s.player.lastName,
          mins: Math.floor(s.playerStats[0].miscellaneous.minSeconds / 60),
          pts: s.playerStats[0].offense.pts,
          reb: s.playerStats[0].rebounds.reb,
          asst: s.playerStats[0].offense.ast,
          threePoint: s.playerStats[0].fieldGoals.fg3PtMade,
          fgPercent: s.playerStats[0].fieldGoals.fgPct,
          ftPercent: s.playerStats[0].freeThrows.ftPct
        }
        this.awayStats.push(info);
      }

      for (let s of x.stats.home.players) {
        let info: PlayergameStats = {
          name: s.player.firstName[0] + ". " + s.player.lastName,
          mins: Math.floor(s.playerStats[0].miscellaneous.minSeconds / 60),
          pts: s.playerStats[0].offense.pts,
          reb: s.playerStats[0].rebounds.reb,
          asst: s.playerStats[0].offense.ast,
          threePoint: s.playerStats[0].fieldGoals.fg3PtMade,
          fgPercent: s.playerStats[0].fieldGoals.fgPct,
          ftPercent: s.playerStats[0].freeThrows.ftPct
        }
        this.homestats.push(info);
      }

    });

    console.log(this.awayStats);
    console.log(this.homestats);
  }

  changeGameId(id){
    this.gameIdUrl = id;
    this.$gameIdUrl.next(this.gameIdUrl);
    console.log(this.gameIdUrl);
  }

  getId(){
    return this.gameIdUrl;
  }

  getAwayStats() {
    return this.awayStats;
  }

  getHomeStats() {
    return this.homestats;
  }
}
