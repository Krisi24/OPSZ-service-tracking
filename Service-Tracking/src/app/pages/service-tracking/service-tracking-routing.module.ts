import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceTrackingComponent } from './service-tracking.component';

const routes: Routes = [
  {
    path: '', component: ServiceTrackingComponent
  },
  {
    path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule)
  },
  {
    path: 'statistics', loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsModule)
  },
  { 
    path: '**',
    redirectTo: 'report'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceTrackingRoutingModule { }
