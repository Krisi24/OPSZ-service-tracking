import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceTrackingRoutingModule } from './service-tracking-routing.module';
import { ServiceTrackingComponent } from './service-tracking.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    ServiceTrackingComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ServiceTrackingRoutingModule
  ]
})
export class ServiceTrackingModule { }
