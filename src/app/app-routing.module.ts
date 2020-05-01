import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MobileDashboardComponent } from './pages/mobile-dashboard/mobile-dashboard.component';


const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'mobile',
    component:MobileDashboardComponent
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
