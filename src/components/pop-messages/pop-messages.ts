import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the PopMessagesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pop-messages',
  templateUrl: 'pop-messages.html'
})
export class PopMessagesComponent {

  text: string;
  messages:any;
  constructor(
    public fDB:DbService,
    public loadingCtrl:LoadingController,
  ) {
    let loading = loadingCtrl.create({
      content:'Accediendo a la base de datos',
      spinner: 'dots'
    })
    loading.present().then(
      ()=>{
        this.fDB.getMessages().subscribe(data => {
          this.messages=data;
          console.log(data);
          console.log(this.messages);
        });
        loading.dismiss();
        
      });
  }

}
