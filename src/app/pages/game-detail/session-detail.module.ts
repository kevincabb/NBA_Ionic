import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionDetailPage } from './session-detail';
import { SessionDetailPageRoutingModule } from './session-detail-routing.module';
import { IonicModule } from '@ionic/angular';
import { TableComponent } from '../../components/table/table.component';
import {TableModule} from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TableModule,
    SessionDetailPageRoutingModule
  ],
  declarations: [
    SessionDetailPage,
    TableComponent
  ]
})
export class SessionDetailModule { }
