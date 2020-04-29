import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';


const fragments:Array<any>=[HeaderComponent,FooterComponent];
@NgModule({
  declarations: fragments,
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  exports:fragments
})
export class FragmentsModule { }
