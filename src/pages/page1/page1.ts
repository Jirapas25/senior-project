import { Component } from '@angular/core';

import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  detail: any;
  constructor(public params: NavParams ,public navCtrl: NavController, public viewCtrl: ViewController) {
    this.detail = this.params.get('data');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
