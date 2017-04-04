import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { MyRest } from '../../providers/my-rest';
import { Page1 } from '../page1/page1';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [MyRest]
})
export class LoginPage {
	user: any;
	pass: any;

  constructor(public placeService: MyRest, public plt: Platform, public navCtrl: NavController, public navParams: NavParams) {
  	this.plt.ready().then((readySource) => {
  		console.log('platform ready');
		//let profile = localStorage.getItem('currentLogin');
		//localStorage.clear();
		localStorage.removeItem('currentLogin');
	  });
  }
  

  doLogin(){
  	if(this.user != null && this.pass != null){
  		this.placeService.login(this.user, this.pass).then((data) => {
  		if(!data) {
        console.log('login fail');
  		}else {
      	console.log('loged in');
      	this.navCtrl.setRoot(HomePage);
  		}
  		//console.log(data);
    	});
  	}else {
  		console.log("insert value");
  	}
  }

  doRegister(){
  	this.navCtrl.push(RegisterPage);
  }

}
