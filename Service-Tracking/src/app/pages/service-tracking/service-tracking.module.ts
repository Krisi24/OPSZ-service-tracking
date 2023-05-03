import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceTrackingRoutingModule } from './service-tracking-routing.module';
import { ServiceTrackingComponent } from './service-tracking.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  declarations: [
    ServiceTrackingComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ServiceTrackingRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
  ]
})
export class ServiceTrackingModule { }
