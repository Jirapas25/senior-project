import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { MyRest } from '../../providers/my-rest';
import { ProfileEditPage } from '../profile-edit/profile-edit';
import { Events } from 'ionic-angular';

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

	constructor(public events: Events, public placeService: MyRest, public plt: Platform, public navCtrl: NavController, public navParams: NavParams) {
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
		/*
      	//this.username = getprofile.username;
				this.password = getprofile.password;
				this.firstname = getprofile.firstname;
				this.lastname = getprofile.lastname;
				this.email = getprofile.email;
				this.phone = getprofile.phone;
				this.address = getprofile.address;

				this.id_card = getprofile.health_record.id_card;
				this.birthday = getprofile.health_record.birthday;
				this.gender = getprofile.health_record.gender;
				this.contact_person = getprofile.health_record.contact_person;
				this.relationship = getprofile.health_record.relationship;
				this.contact_person_phone = getprofile.health_record.contact_person_phone;
				this.allergy = getprofile.health_record.allergy;
				this.chronic_diseases = getprofile.health_record.chronic_diseases;*/
	}

	editProfile() {
		//this.navCtrl.push(ProfileEditPage);
		this.navCtrl.push(ProfileEditPage);
		//this.navCtrl.push(ProfileEditPage, { "parentPage": this.navCtrl });

	}


}
