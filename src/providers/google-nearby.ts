import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GoogleNearby {
	data: any;

  constructor(public http: Http) {
    console.log('Hello GoogleNearby Provider');
    this.data = null;
  }

  findNearby(lat, long){
  	if(this.data) {
      return Promise.resolve(this.data)
    }return new Promise (resolve =>{
      this.http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+lat+','+long+'&radius=500&types=dentist&key=AIzaSyC6P_iHgQ-PmP3z5MYX8Nl4mfLWzh80PlQ')
      .map(res => res.json().message)
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
      })
    })
  }

}
