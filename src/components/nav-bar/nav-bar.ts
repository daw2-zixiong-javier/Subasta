import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { DbService } from '../../services/db.service';
import { ProductPage } from '../../pages/product/product';

/**
 * Generated class for the NavBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'nav-bar',
  templateUrl: 'nav-bar.html'
})
export class NavBarComponent {

  searchItems:any[];
  searchItemsConst: any[]
  searchQuery: string = '';
  //items: string[] = ['hola','cosa','hola2'];
  //itemsConst:string[];
  list:boolean=false;
  searchMode:boolean=true;
  
  constructor(public navCtrl:NavController,
              public navParams: NavParams,
              public fDB:DbService,
              public loadingCtrl:LoadingController,
              public events:Events
  ) {
    //this.itemsConst=this.items;
    let loading = loadingCtrl.create({
      content:'Accediendo a la base de datos',
      spinner: 'dots'
    })
    loading.present().then(
      ()=>{
        this.fDB.getStock().subscribe(data => this.searchItemsConst=data);
        loading.dismiss();

      });
  }

  getItems($event: any){
    const val = $event.target.value;
    if(val != ''){
      this.searchItems = this.searchItemsConst.filter(
        (item) => {return item.name.toLowerCase()
                              .indexOf(val.toLowerCase()) > -1;}
      )
      console.log(this.searchItems);
      if(this.searchItems.length!=0){
        this.list=true;

      }
    }else{
      this.list=false;
    }
  }

  printList(){
    this.list=!this.list;
  }

  setSearchMode(){
    this.searchMode=!this.searchMode;
  }

  goProduct(item){
    this.events.subscribe(item.key+':remaining',
      (secondsRemaining)=>{
        item.time_live=secondsRemaining;
//        console.log(item);
        this.fDB.uploadItem(item);
        console.log(item);
        this.navCtrl.push(ProductPage, item);
        this.events.unsubscribe(item.key+':remaining');
      });
  }
}
