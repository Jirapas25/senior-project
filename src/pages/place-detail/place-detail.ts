import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { BookingPage } from '../booking/booking';
declare var window;
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
	phone: string;
	open: any;
	close: any;
	myDate: String = new Date().toISOString();
	email: any;

	constructor(private callNumber: CallNumber, public plt: Platform, public navCtrl: NavController, public navParams: NavParams) {
		this.plt.ready().then((readySource) => {
			//test private callNumber: CallNumber
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

	callIT(passedNumber) {
		//window.location = passedNumber;
		window.open(passedNumber, '_system')
	}

	call() {
		this.callNumber.callNumber(this.phone, true)
			.then(() => console.log('Launched dialer!'))
			.catch(() => console.log('Error launching dialer'));
	}

}
