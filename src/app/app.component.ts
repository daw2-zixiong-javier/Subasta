import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { AuthService } from '../services/auth.service';
import { HomePage } from '../pages/home/home';
import {IUser} from '../provider/user';
import { TabsPage} from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = TabsPage;

  user:IUser;


  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private auth:AuthService,
    ){

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      /*this.storage.get('user').then( 
        (credentails) =>{
          console.log(JSON.stringify(credentails));
      });*/
      this.auth.authenticated().then(
        (userData)=>{
          this.user = userData;
          if(this.user ==undefined){
            this.rootPage=LoginPage;
          }
        }
      )
    });
    
  }



  login() {
    this.rootPage = HomePage;
  }


  logout() {
    this.auth.signOut();
    this.rootPage = LoginPage;
  }

}
