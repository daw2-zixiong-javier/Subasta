import {Injectable} from '@angular/core';
import {AngularFireDatabase,AngularFireList} from "@angular/fire/database";
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from "firebase";
import {Storage} from '@ionic/storage';
import { m } from '@angular/core/src/render3';
@Injectable()
export class DbService{

    private itemsRef: AngularFireList<any>;
    constructor(private fDB:AngularFireDatabase,
        private fAuth:AngularFireAuth,
        private storage:Storage 
        ){
        this.fAuth.authState.subscribe(
            (data)=>{
              if(data != undefined){
                /*this.storage.set("user",data.toJSON().toString()).then(
                  ()=>{
                    console.log("Se han guardado las credenciales");
                  }
                )*/}
            },
            (error)=> console.log("error logging",error),
            ()=>console.log("auth complete")
          );
        this.itemsRef = this.fDB.list('product_table');
    }

    getStock():Observable<any>{
        //return this.fDB.list('/product_table/').valueChanges();
        return this.fDB.list('product_table/').snapshotChanges().pipe(
          map(changes => changes.map( (c) =>{ return {
              key: c.payload.key,
              current_price: c.payload.val()['current_price'],
              description: c.payload.val()['description'],
              name: c.payload.val()['name'],
              time_live: c.payload.val()['time_live'],
              time_display:c.payload.val()['time_display'],
              url_image:c.payload.val()['url_image']
          }}))
    
        );
    }
    getMessages():Observable<any>{
      return this.fDB.list('messages_table/', message => message.orderByChild('to').equalTo('test@test.com')).snapshotChanges().pipe(
        map(changes=> changes.map(
          (c)=> {return{
            key: c.payload.key,
            from:c.payload.val()['from'],
            nombre:c.payload.val()['nombre'],
            precio:c.payload.val()['precio'],            
          }}
        ))
      )
    }
    getItem(item){
      return this.fDB.object(`product_table/${item.key}`).snapshotChanges().pipe(
        map(changes =>{ return {
            key: changes.payload.key,
            current_price: changes.payload.val()['current_price'],
            description: changes.payload.val()['description'],
            name: changes.payload.val()['name'],
            time_live: changes.payload.val()['time_live'],
            time_display:changes.payload.val()['time_display'],
            url_image:changes.payload.val()['url_image']
        }})
      );
    }
  
    uploadItem(product){
      this.itemsRef.update(
        product.key,
        {
          key:product.key,
          current_price: product.current_price,
          description: product.description,
          name: product.name,
          time_live:product.time_live,
          time_display:0,
          url_image:product.url_image
        }
      )
    }
}