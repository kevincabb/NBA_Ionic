import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../providers/games.service';
import { PlayergameStatsService } from '../../providers/playergame-stats.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private datas: GamesService) { }

  ngOnInit() {
  }

}
