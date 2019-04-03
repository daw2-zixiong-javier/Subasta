import { NgModule } from '@angular/core';
import { IonicPageModule, IonicPage } from 'ionic-angular';
import { HomePage } from './home';
import { DbService } from '../../services/db.service';
@IonicPage()
@NgModule({
  declarations: [HomePage],
  imports: [IonicPageModule.forChild(HomePage)],
  providers:[
    DbService
  ]
})
export class HomePageModule { }