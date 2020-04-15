import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';

import { ScheduleModule } from '../schedule/schedule.module';
import { SessionDetailModule } from '../game-detail/session-detail.module';
import { SpeakerListModule } from '../player-list/speaker-list.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ScheduleModule,
    SessionDetailModule,
    SpeakerListModule,
    TabsPageRoutingModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
