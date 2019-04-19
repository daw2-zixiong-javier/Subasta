import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  contactForm: FormGroup;

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public formBuilder: FormBuilder) {

  }

  logForm() {
    console.log("Formulario enviado");
    let toast = this.toastCtrl.create({
      message: 'Formulario enviado correctamente',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
