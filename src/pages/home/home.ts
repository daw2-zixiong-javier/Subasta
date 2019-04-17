import { Component, ViewChild } from '@angular/core';
import { NavController,LoadingController,Events } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login';
import {DbService} from '../../services/db.service';
import {TimerComponent} from "../../components/timer/timer";
import { ProductPage } from '../product/product';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private products: any;
  @ViewChild(TimerComponent) timer: TimerComponent;
  
  constructor(public navCtrl: NavController,
              private auth: AuthService,
              private fDB:DbService,
              private loadingController:LoadingController,
              private events:Events){

        }
  /*ngOnInit(){
    setTimeout(() => {
      this.timer.startTimer();
    }, 1000)
  }*/
  ionViewDidLoad(){
    console.log('ionViewDidLoad stockPage')
    let loader = this.loadingController.create({
      content: 'Accediendo a los datos',
      spinner: 'dots',
    });

    loader.present().then(() => {
      this.fDB.getStock()
        .subscribe(data => this.products = data
        );
        
      loader.dismiss();

    });
  }

  logout(){
    this.auth.signOut().then(
      () => this.navCtrl.setRoot(LoginPage),
      (error)=> console.log(error)
    );
  }
  goProduct(item){
    console.log(item);
    this.events.subscribe(item.key+':remaining',
      (secondsRemaining)=>{
        item.time_display=secondsRemaining;
//        console.log(item);
        this.fDB.uploadItem(item);
        console.log(item);
        this.navCtrl.push(ProductPage, item);
        this.events.unsubscribe(item.key+':remaining');

      });
  }

  prueba() {
    console.log("mensaje de prueba");
  }
}
