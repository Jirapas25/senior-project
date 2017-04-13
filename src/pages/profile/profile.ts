import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { MyRest } from '../../providers/my-rest';
import { ProfileEditPage } from '../profile-edit/profile-edit';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Events } from 'ionic-angular';
import {Observable} from "rxjs/Observable";


declare var firebase: any;

@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
	providers: [MyRest]
})
export class ProfilePage {
	user: any;
	username: string;
	password: string;
	firstname: string;
	lastname: string;
	email: string;
	phone: string;
	address: string;

	id_card: string;
	birthday: string;
	gender: string;
	contact_person: string;
	relationship: string;
	contact_person_phone: string;
	allergy: string;
	chronic_diseases: string;

	profilePic: any;
	url: string;

	constructor(private camera: Camera, public events: Events, public placeService: MyRest, public plt: Platform, public navCtrl: NavController, public navParams: NavParams) {
		this.plt.ready().then((readySource) => {
			console.log('platform ready');
			this.getUser();
			this.events.subscribe('reloadPage1', () => {
				this.getUser();
				console.log('reload :' + this.firstname);
			});

		});
	}

	getUser() {
		let profile = localStorage.getItem('currentLogin');
		//let getprofile = JSON.parse(profile);
		//console.log("getprofile : " + profile);
		if(profile){
			this.placeService.getUser(profile).then((data) => {
			if (!data) {
				console.log('cant get user');
			} else {
				console.log('get user successful');
				console.log("data: " + data.username);
				this.user = data;
				//this.username = data.username;
				this.password = data.password;
				this.firstname = data.firstname;
				this.lastname = data.lastname;
				this.email = data.email;
				this.phone = data.phone;
				this.address = data.address;

				this.id_card = data.health_record.id_card;
				this.birthday = data.health_record.birthday;
				this.gender = data.health_record.gender;
				this.contact_person = data.health_record.contact_person;
				this.relationship = data.health_record.relationship;
				this.contact_person_phone = data.health_record.contact_person_phone;
				this.allergy = data.health_record.allergy;
				this.chronic_diseases = data.health_record.chronic_diseases;

			}
			console.log("data f: " + data.firstname);
		});
		}
	}

	editProfile() {
		this.navCtrl.push(ProfileEditPage);
	}

	take_photo() {
		const options: CameraOptions = {
		quality: 100,
		destinationType: this.camera.DestinationType.DATA_URL,
		encodingType: this.camera.EncodingType.JPEG,
		mediaType: this.camera.MediaType.PICTURE,
		saveToPhotoAlbum: true
		}

		this.camera.getPicture(options).then((imageData) => {

		let base64Image = 'data:image/jpeg;base64,' + imageData;
		this.url = imageData;
		this.upToFirebase();
		}, (err) => {
			console.log(err);
		});
		
	}

	upToFirebase() {
		//let profile = localStorage.getItem('currentLogin');
		// Initialize Firebase
		var myconfig = {
			apiKey: "AIzaSyBN8n-5n5ZR6_ngVdd8_bodZZOlUoemnYw",
			authDomain: "firtrealdb.firebaseapp.com",
			databaseURL: "https://firtrealdb.firebaseio.com",
			projectId: "firtrealdb",
			storageBucket: "firtrealdb.appspot.com",
			messagingSenderId: "907073621216"
		};
		
		
		firebase.initializeApp(myconfig);
		var fApp = firebase.initializeApp(myconfig, "fApp");
		console.log(firebase.app().name);
		console.log(fApp.name);
		/*authen
		fApp.auth().signInWithEmailAndPassword("jirapas@gmail.com", "mypass")
                .then(function (authData) {
                    console.log("Authenticated successfully with payload-", authData);
                  	alert("Authenticated successfully");
                }).catch(function (_error) {
                    console.log("Login Failed!", _error);
                   	alert("Authenticated fail");
                })*/
		//upload picture
		var imgRef = fApp.storage().ref("customer/sampleimg.jpg");
			imgRef.putString(this.url, 'base64').then(function(snapshot) {
			alert("Profile has changed");
			console.log('Uploaded a picture!');
		}).catch(function (_error) {
            console.log("upload Failed!", _error);
            alert("upload fail");
        })


		// return new Observable(observer => {
       /*      fApp.auth().signInWithEmailAndPassword("jirapas@gmail.com", "mypass")
                .then(function (authData) {
                    console.log("Authenticated successfully with payload-", authData);
                   // observer.next(authData)
                }).catch(function (_error) {
                    console.log("Login Failed!", _error);
                   // observer.error(_error)
                })*/
       // });
	   
	}


}
