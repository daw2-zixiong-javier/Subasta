import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public fDB:DbService,
              public events:Events) {
    this.product=navParams.data;
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
    this.product.current_price+=10;
    this.fDB.uploadItem(this.product);
  }
  
}
