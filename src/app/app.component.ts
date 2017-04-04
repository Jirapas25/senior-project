import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
//import { SearchResultPage } from '../pages/search-result/search-result';
import { NearbyClinicPage } from '../pages/nearby-clinic/nearby-clinic';
import { PlaceDetailPage } from '../pages/place-detail/place-detail';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileEditPage } from '../pages/profile-edit/profile-edit';
import { BookingPage } from '../pages/booking/booking';
import { HomePage } from '../pages/home/home';
import { HistoryPage } from '../pages/history/history';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'My Appointment', component: HistoryPage },
      { title: 'Find Near Clinic', component: NearbyClinicPage },
      { title: 'My Profile', component: ProfilePage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
