import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceTrackingComponent } from './service-tracking.component';

const routes: Routes = [{ path: '', component: ServiceTrackingComponent },
 { path: 'service-tracking/user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
 { path: 'service-tracking/report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceTrackingRoutingModule { }
