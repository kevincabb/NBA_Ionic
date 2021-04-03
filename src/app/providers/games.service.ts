import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { Games } from '../components/interfaces/games';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  game = [];
  //API URL for station list
  gameURL = 'https://api.mysportsfeeds.com/v2.1/pull/nba/2020-2021-regular/date/';
  dateUrl: string = moment('20201222').format('YYYYMMDD');
  typeUrl = '/games.json';
  gameSheet;

   httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Basic ' + btoa('1694b098-b008-4e48-ad0e-72fa5b:MYSPORTSFEEDS')
    })
  };

  $dateUrl = new BehaviorSubject<string>(this.dateUrl);

  constructor(private http: HttpClient) {
  }

  previousDate(selectedDate){
    this.dateUrl = moment(selectedDate).subtract(1, 'days').format('YYYYMMDD');
    this.$dateUrl.next(this.dateUrl);
  }
  nextDate(selectedDate){
    this.dateUrl = moment(selectedDate).add(1, 'days').format('YYYYMMDD');
    this.$dateUrl.next(this.dateUrl);
  }

  selectDate(selectedDate){
    this.dateUrl = moment(selectedDate).format('YYYYMMDD');
    this.$dateUrl.next(this.dateUrl);
  }

  getData() {
    this.game = [];
    // http request for JSON data
    this.gameSheet = this.http.get(this.gameURL + this.dateUrl + this.typeUrl, this.httpOptions);

    // stream game/s data to game variable
    this.gameSheet.subscribe(x => {
      console.log(x);
      let day = {
        date: moment(this.dateUrl).format('MMM D, YYYY'),
        gamesToday: []
      }
      
      for (let s of x.games) {
        let info: Games = {
          date: moment(s.schedule.startTime).format('MM/DD'),
          homeTeam: s.schedule.homeTeam.abbreviation,
          awayTeam: s.schedule.awayTeam.abbreviation,
          timeStart: moment(s.schedule.startTime).format('LT'),
          playedStatus: s.schedule.playedStatus,
          homeScore: s.score.homeScoreTotal,
          awayScore: s.score.awayScoreTotal,
          id: s.schedule.id,
          qScore: [null]
        }

        for(let q of s.score.quarters){
          if (info.qScore[0] === null) {
            info.qScore.splice(0);
            let quar = {
              quarterNum: q.quarterNumber,
              away: q.awayScore,
              home: q.homeScore
            }
            info.qScore.push(quar);
          } else {
            let quar = {
              quarterNum: q.quarterNumber,
              away: q.awayScore,
              home: q.homeScore
            }
            info.qScore.push(quar);
          }
        }
        day.gamesToday.push(info);
      }
      this.game.push(day);
    });
  }

  getGame() {
    return this.game;
  }

  getDate(){
    return this.dateUrl;
  }
}
