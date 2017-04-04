import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { MyRest } from '../../providers/my-rest';
import { Page1 } from '../page1/page1';
import { HomePage } from '../home/home';
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [MyRest]
})
export class RegisterPage {
	fname: any;
	lname: any;
	user: any;
	pass: any;
	gender: string = "Female";
	birthday: String = new Date().toISOString();


  constructor(public placeService: MyRest, public plt: Platform, public navCtrl: NavController, public navParams: NavParams) {
  	this.plt.ready().then((readySource) => {
  		console.log('platform ready');
	  });
  }
  register(){
  	if(this.fname != null && this.user != null && this.pass != null && this.lname != null && this.birthday != null && this.gender != null){
  		this.placeService.register(this.fname, this.lname, this.user, this.pass, this.birthday, this.gender).then((data) => {
  		if(data == true) {
        console.log('register successful');

        	this.placeService.login(this.user, this.pass).then((data) => {
		  		if(!data) {
		        console.log('login fail');
		  		}else {
		      	console.log('loged in');
		      	this.navCtrl.setRoot(HomePage);
		  		}
		  		console.log(data);
		    	});

  		}else if(data == false){
      	console.log('username has already exist');
  		}
  		console.log(data);
    	});

  	}else {
  		console.log('no value');

  	}
  }

}
