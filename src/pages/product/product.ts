import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController } from 'ionic-angular';
import {DbService} from '../../services/db.service';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})

export class ProductPage {
  private product: any;
  private add_price:string = "5";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public fDB:DbService,
              public events:Events,
              public toastCtrl:ToastController) {
    this.product=navParams.data;
/*    let toast = this.toastCtrl.create({
      message: 'Felicidades, has conseguido el '+this.product.name+' por '+ this.product.current_price,
      duration: 3000,
      position:'top'
    });*/
    this.events.subscribe(this.product.id+':remaining', (timeRemaining) => {
      this.product.time_display=timeRemaining;
      console.log(this.product);
      this.events.unsubscribe(this.product.id+':remaining');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    console.log(this.product);
  }
  setPrice(){
    this.product.current_price = this.product.current_price+parseInt(this.add_price);
    this.fDB.uploadItem(this.product);
  }
  
}
