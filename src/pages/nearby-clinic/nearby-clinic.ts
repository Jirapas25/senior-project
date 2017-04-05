import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

import { BookingPage } from '../booking/booking';
import { PlaceDetailPage } from '../place-detail/place-detail';
import { MyRest } from '../../providers/my-rest';

declare var google;

@Component({
  selector: 'page-nearby-clinic',
  templateUrl: 'nearby-clinic.html',
  providers: [MyRest]
})
export class NearbyClinicPage {
	latitude: any;
  longitude: any;
  location: any;
  places: any;
  map: any;
  homeSegment: string = "Map";
  selectName: string;
  selectPlace: any;
  item: any;
  near: any;
  clinic: any = [];
	distance: any;
	today:Date = new Date();
	hours:any;


  constructor(public placeService: MyRest , public alertCtrl: AlertController, public plt: Platform, public navCtrl: NavController, public navParams: NavParams)
  {
  	let options = {
    	enableHighAccuracy: true
  	};

	  this.plt.ready().then((readySource) => {
	      Geolocation.getCurrentPosition(options).then((resp) => {
	        this.latitude = resp.coords.latitude;
	        this.longitude = resp.coords.longitude;
	        this.getNear();
	        //this.getNearby();
	      }).catch((error) => {
	        console.log('Error getting location', error);
	      });

	  });

	}


	updatePage(homeSegment) {
	  if (homeSegment === 'Map') {
	    this.getNear();
	  }
	}

	//not use
	getNearby(){

		this.placeService.getNearbyPlace(this.latitude, this.longitude).then((data) => {
      console.log(data);
      this.places = data;
      this.setMap();
    });

	}

	getNear(){

		while(this.clinic.length > 0) {
    	this.clinic.pop();
		}
		this.placeService.getNear().then((data) => {
      //console.log(data);

      this.near = data;
      //this.setMap();
      //this.distance();
      let index = 0;
      for (var i = 0; i < this.near.length; ++i) {
				let loc = this.near[i].geometry;
				let get_dt:any = this.calDistance(loc);
				if(get_dt < 3000){

					this.clinic.push(this.near[i]);
					let d = get_dt/1000;
          this.clinic[index].distance = d.toFixed(1);

					let day = this.today.getDay();
					switch (day) {
							case 0:
								this.clinic[index].open = this.near[index].hours.sunday.open;
								this.clinic[index].close = this.near[index].hours.sunday.close;
							break;
							case 1:
								this.clinic[index].open = this.near[index].hours.monday.open;
								this.clinic[index].close = this.near[index].hours.monday.close;
							break;
							case 2:
								this.clinic[index].open = this.near[index].hours.tuesday.open;
								this.clinic[index].close = this.near[index].hours.tuesday.close;
							break;	
							case 3:
								this.clinic[index].open = this.near[index].hours.wednesday.open;
								this.clinic[index].close = this.near[index].hours.wednesday.close;
							break;	
							case 4:
								this.clinic[index].open = this.near[index].hours.thursday.open;
								this.clinic[index].close = this.near[index].hours.thursday.close;
							break;	
							case 5:
								this.clinic[index].open = this.near[index].hours.friday.open;
								this.clinic[index].close = this.near[index].hours.friday.close;
							break;	
							case 6:
								this.clinic[index].open = this.near[index].hours.saturday.open;
								this.clinic[index].close = this.near[index].hours.saturday.close;
							break;
													
						default:
							break;
					}

          index = index + 1;
					console.log(this.near[i].clinic_name)
					//console.log(this.clinic[0])
						//console.log(this.clinic[index].clinic_name)
				}
			}
			this.sort();
			this.setMap();
    });
	
	}

sort(){
	var data = this.clinic.slice(0);
	data.sort(function(a,b) {
			return a.distance - b.distance;
	});
	this.clinic = data;
	console.log('by date:');
	console.log(data);
	console.log(this.clinic);
}

rad(x) {
		return x * Math.PI / 180;
};

calDistance(parm) {
     							let p1:any = {
        						lat: parm.coordinates[1],
        						lng: parm.coordinates[0]
        					}
        					let p2:any = {
        						lat: this.latitude, //"7.903293",
        						lng: this.longitude //"98.355626"

        					}
									  let R = 6378137; // Earth’s mean radius in meter
									  let dLat = this.rad(p2.lat - p1.lat);
									  let dLong = this.rad(p2.lng - p1.lng);
									  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
									    Math.cos(this.rad(p1.lat)) * Math.cos(this.rad(p2.lat)) *
									    Math.sin(dLong / 2) * Math.sin(dLong / 2);
									  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
									  let d = R * c;
									  return d; // returns the distance in meter
									};

	setMap(){

		this.location = new google.maps.LatLng(this.latitude, this.longitude);

		let mapOptions = {
			center: this.location,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
		this.addMarker();

	}

	addMarker(){
	 	/*for (var i = 0; i < this.places.length; ++i) {
	 		//console.log(this.places[i].geometry.coordinates[0]);

	 		let loc = new google.maps.LatLng(this.places[i].geometry.coordinates[1], this.places[i].geometry.coordinates[0]);
	    let marker = new google.maps.Marker({
			  map: this.map,
			  animation: google.maps.Animation.DROP,
			  position: loc
			});

		 	let content = this.places[i].clinic_name;

		 	this.addInfoWindow(marker, content);
	  }*/
			let myloc = new google.maps.LatLng(this.latitude, this.longitude);
	    let marker = new google.maps.Marker({
			  map: this.map,
			  animation: google.maps.Animation.DROP,
			  position: myloc,
				icon: "assets/icon/me.png"
			});
	  for (var i = 0; i < this.clinic.length; ++i) {
	 		//console.log(this.places[i].geometry.coordinates[0]);

	 		let loc = new google.maps.LatLng(this.clinic[i].geometry.coordinates[1], this.clinic[i].geometry.coordinates[0]);
	    let marker = new google.maps.Marker({
			  map: this.map,
			  animation: google.maps.Animation.DROP,
			  position: loc,
				icon: "assets/icon/pinA.png"
			});

		 	let content = this.clinic[i].clinic_name;

		 	this.addInfoWindow(marker, content);
	  }
	 	let initName = this.clinic[0].clinic_name;
		let initDist =  this.clinic[0].distance;
		let initOpen =  this.clinic[0].open;
		let initClose =  this.clinic[0].close;
		 //console.log(this.clinic[0].clinic_name);
		this.hours = document.getElementById("hours");
	  this.item = document.getElementById("item");
		this.distance = document.getElementById("distance");

		this.hours.innerHTML = 'opening hours '+initOpen+'-'+initClose;
	  this.item.innerHTML = initName;
		this.distance.innerHTML = 'distance ' + initDist + ' km.';
	}

	addInfoWindow(marker, content){

	  /*let infoWindow = new google.maps.InfoWindow({
	    content: content
	  });*/

	  google.maps.event.addListener(marker, 'click', () => {
	    //infoWindow.open(this.map, marker);
	    this.selectName = content;
	    this.item = document.getElementById("item");
			this.hours = document.getElementById("hours");
	    let markLat = marker.getPosition().lat();
	    let markLng = marker.getPosition().lng();

	    this.item.innerHTML = this.selectName;
			for (var i = 0; i < this.clinic.length; i++) {
				var name = this.clinic[i].clinic_name;
				if(name == content){
						this.distance.innerHTML =  'distance ' + this.clinic[i].distance + ' km.';
						this.hours.innerHTML = 'opening hours '+this.clinic[i].open+'-'+this.clinic[i].close;
				}
			}
		
	    console.log(this.selectName);
			console.log(this.selectName);
	    this.itemSelected(markLat, markLng);
	  });

	}

	itemSelected(lat, lng){
    for (var i = 0; i < this.clinic.length; ++i) {
    	if(this.clinic[i].geometry.coordinates[0] == lng && this.clinic[i].geometry.coordinates[1] == lat) {
    		console.log("found");
    		//this.selectName = this.places[i].name;
    		this.selectPlace = this.clinic[i];
				console.log(this.clinic[i])
    	}
   	}

	}

	viewDetail() {
		this.navCtrl.push(PlaceDetailPage, {
			place: this.selectPlace
		});
	}
	itemTapped(event, item) {
		this.navCtrl.push(PlaceDetailPage, {
			place: item
		});
	}

	doBooking(event, item) {
		this.navCtrl.push(BookingPage, {
		place: item
	});
	}


}
