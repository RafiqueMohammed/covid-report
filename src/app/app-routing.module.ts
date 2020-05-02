import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
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
    path:'old',
    component:HomeComponent
  },
  {
    path:'**',
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
