import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { BookingPage } from '../booking/booking';

@Component({
  selector: 'page-place-detail',
  templateUrl: 'place-detail.html'
})
export class PlaceDetailPage {
	place: any;
	lat: any;
	lng: any;
	title: any;
	address: any;
	phone: any;
	open: any;
	close: any;
	myDate: String = new Date().toISOString();
	email: any;

  constructor(public plt: Platform, public navCtrl: NavController, public navParams: NavParams) 
  {
  	this.plt.ready().then((readySource) => {
		  //test
		  this.lat = "7.8";
		  this.lng = "98.7";
	    console.log('ionViewDidLoad PlaceDetailPage');
	    this.place = this.navParams.get('place');
	    console.log(this.place);
	    
	    this.lat = this.place.geometry.coordinates[1];
  		this.lng = this.place.geometry.coordinates[0];
  		this.title = this.place.clinic_name;
  		this.address = this.place.address;
  		this.phone = this.place.clinic_phone;
  		this.open = this.place.hours.monday.open;
		this.email = this.place.clinic_email;
  		console.log('date : ' + this.myDate);

  		//(<HTMLImageElement>document.getElementById("mapPic")).src = "https://maps.googleapis.com/maps/api/staticmap?center="+this.lat+","+this.lng+"&zoom=18&size=300x180&markers=color:blue|"+this.lat+","+this.lng+"";
	  });

  }

  doBooking() {
	this.navCtrl.push(BookingPage, {
		place: this.place
	});
  }
 

}
