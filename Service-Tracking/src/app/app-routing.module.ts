import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { LoggedGuard } from './services/logged.guard';

const routes: Routes = [
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationModule),
    canActivate: [LoggedGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canActivate: [LoggedGuard]
  },
  { 
    path: 'service-tracking',
    loadChildren: () => import('./pages/service-tracking/service-tracking.module').then(m => m.ServiceTrackingModule),
    canActivate: [AuthGuard], canDeactivate: [AuthGuard]
  },
  { 
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
