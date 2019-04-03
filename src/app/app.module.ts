import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DbService } from '../services/db.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import {AuthService} from "../services/auth.service";
import { firebaseConfig } from '../environment/environment';
import { HomePage } from '../pages/home/home';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import {TimerComponent} from "../components/timer/timer"
import { ProductPage } from '../pages/product/product';
import {Events} from "ionic-angular"
import { NavBarComponent } from '../components/nav-bar/nav-bar';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    HomePage,
    TimerComponent,
    ProductPage,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    HomePage,
    TimerComponent,
    NavBarComponent,
    ProductPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    AuthService,
    DbService,
    Events,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
