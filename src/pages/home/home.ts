import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
import { NearbyClinicPage } from '../nearby-clinic/nearby-clinic';
import { LoginPage } from '../login/login';
import { HistoryPage } from '../history/history';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public plt: Platform, public navCtrl: NavController, public navParams: NavParams) {
    this.plt.ready().then((readySource) => {

	  });
  }

  doFindClinic(){
    this.navCtrl.push(NearbyClinicPage);
  }
  doMyAppointment(){
    this.navCtrl.push(HistoryPage);
  }
  doMyProfile(){
    this.navCtrl.push(ProfilePage);
  }
  doLogOut(){
    
    this.navCtrl.setRoot(LoginPage);
  }
  

  

}
