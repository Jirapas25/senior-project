import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

import { NearbyClinicPage } from '../pages/nearby-clinic/nearby-clinic';
import { PlaceDetailPage } from '../pages/place-detail/place-detail';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileEditPage } from '../pages/profile-edit/profile-edit';
import { BookingPage } from '../pages/booking/booking';
import { HomePage } from '../pages/home/home';
import { HistoryPage } from '../pages/history/history';
import {CallNumber} from '@ionic-native/call-number';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '567a2337'
  }
};

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    NearbyClinicPage,
    PlaceDetailPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    ProfileEditPage,
    BookingPage,
    HomePage,
    HistoryPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
     CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    NearbyClinicPage,
    PlaceDetailPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    ProfileEditPage,
    BookingPage,
    HomePage,
    HistoryPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, CallNumber]
})
export class AppModule {}
