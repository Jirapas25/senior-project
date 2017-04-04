import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import { MyRest } from '../../providers/my-rest';

declare var google;


@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
  providers: [MyRest]
})
export class SearchResultPage {

  constructor(public placeService: MyRest , public alertCtrl: AlertController, public plt: Platform, public navCtrl: NavController, public navParams: NavParams) {

  }

 

}
