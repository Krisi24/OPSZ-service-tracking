import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{ path: 'registration', loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationModule) },
{ path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
{ path: 'service-tracking', loadChildren: () => import('./pages/service-tracking/service-tracking.module').then(m => m.ServiceTrackingModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
