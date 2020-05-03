import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MobileDashboardComponent } from './pages/mobile-dashboard/mobile-dashboard.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';


const routes: Routes = [
  {
    path:'',
    component:MobileDashboardComponent
  },
  {
    path:'welcome',
    component:WelcomeComponent
  },
  {
    path:'**',
    component:MobileDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
