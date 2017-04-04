import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { MyRest } from '../../providers/my-rest';
import { Events } from 'ionic-angular';

@Component({
	selector: 'page-profile-edit',
	templateUrl: 'profile-edit.html',
	providers: [MyRest]
})
export class ProfileEditPage {
	current_user: any;
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
			console.log('edit profile page ready');
			this.getProfile();

		});
	}

	getProfile() {
		let profile = localStorage.getItem('currentLogin');

		this.placeService.getUser(profile).then((data) => {
			if (!data) {
				console.log('cant get user');
			} else {
				console.log('get user successful');
				console.log("data: " + data.username);
				this.username = data.username;
				this.password = data.password;
				this.current_user = data;
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
			//console.log("data: " + data);
		});
	}

	updateUser() {
		//let profile = localStorage.getItem('currentLogin');
		//let getprofile = JSON.parse(profile);
		let dataset = {
			username: this.username,
			password: this.password,
			firstname: this.firstname,
			lastname: this.lastname,
			email: this.email,
			phone: this.phone,
			address: this.address,
			health_record: {
				id_card: this.id_card,
				birthday: this.birthday,
				gender: this.gender,
				contact_person: this.contact_person,
				relationship: this.relationship,
				contact_person_phone: this.contact_person_phone,
				allergy: this.allergy,
				chronic_diseases: this.chronic_diseases
			}
		}
		this.placeService.updateUser(dataset, this.username).then((data) => {
			if (data) {
				console.log('update successful');
				this.events.publish('reloadPage1');
				//this.navParams.get("parentPage").someFnToUpdateParent();
				this.navCtrl.pop();

			}
			console.log(data);
		});
	}



}
