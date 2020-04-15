import { Component, OnInit, Input } from '@angular/core';
import { PlayergameStatsService } from '../../providers/playergame-stats.service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {

  @Input() gameDetail;
  gameId: string;
  awayPlayers = [];
  homePlayers = [];
  cols: any[];
  frozenCols: any[];
  scrollableCols: any[];
  homeTeam: boolean; 
  team: string;
  constructor(private dataService: PlayergameStatsService) {
    this.homeTeam = true;
   }

  ngOnInit() {
    this.team = this.gameDetail.homeTeam;
    this.dataService.getData();

    this.frozenCols = [{ field: 'name', header: 'Player' }];

    this.scrollableCols = [
      { field: 'mins', header: 'Mins' },
      { field: 'pts', header: 'Pts' },
      { field: 'reb', header: 'Reb' },
      { field: 'asst', header: 'Asst' },
      { field: 'threePoint', header: '3PT' },
      { field: 'fgPercent', header: 'FG%' },
      { field: 'ftPercent', header: 'FT%' },
    ];

    
    this.homePlayers = [];

    this.awayPlayers = this.dataService.getAwayStats();
    this.homePlayers = this.dataService.getHomeStats();
   }

   segmentChanged(ev: any) {
    this.homeTeam = !this.homeTeam;
  }

}
