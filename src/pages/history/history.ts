import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MyRest } from '../../providers/my-rest';
import { Platform } from 'ionic-angular';
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
  providers: [MyRest]
})
export class HistoryPage {
  appointment:any =[];
  constructor(public placeService: MyRest ,public plt: Platform, public navCtrl: NavController, public navParams: NavParams) {
    this.plt.ready().then((readySource) => {
      this.getMyAppointment();
    });
  }

  getMyAppointment(){
    let profile = localStorage.getItem('currentLogin');
    this.placeService.getMyAppointment(profile).then((data) => {
      this.appointment.push(data);
      console.log( this.appointment);
    });
  }
  
}
