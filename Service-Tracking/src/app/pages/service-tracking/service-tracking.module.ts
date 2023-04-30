import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceTrackingRoutingModule } from './service-tracking-routing.module';
import { ServiceTrackingComponent } from './service-tracking.component';


@NgModule({
  declarations: [
    ServiceTrackingComponent
  ],
  imports: [
    CommonModule,
    ServiceTrackingRoutingModule
  ]
})
export class ServiceTrackingModule { }
