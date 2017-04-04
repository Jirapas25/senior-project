import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MyRest {
  near_place: any;
  user: any;
  data: any;
  place: any;
  near: any;
  appoint: any;
  currentUser: any;
  fake:any = 0;
  constructor(public http: Http) {
    console.log('Hello MyRest Provider');
    this.data = null;
  }

  login(username: string, password: string) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    return new Promise(resolve => {
      this.http.post('https://fast-taiga-61275.herokuapp.com/user/authentication', JSON.stringify({ username: username, password: password }), options)
        .map(res => res.json().message)
        .subscribe(data => {
          if (data.username == username) {
            this.currentUser = data;
            localStorage.setItem('currentLogin', username);
          }
          resolve(this.currentUser);
        })
    })
  }

  logout() {
    localStorage.removeItem('currentLogin');
     this.currentUser = "";
  }

  register(fname, lname, username, password, birthday, gender) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let user = {
      username: username,
      password: password,
      firstname: fname,
      lastname: lname,
      email: "",
      phone: "",
      address: "",
      health_record: {
        id_card: "",
        birthday: birthday,
        gender: gender,
        contact_person: "",
        relationship: "",
        contact_person_phone: "",
        allergy: "",
        chronic_diseases: ""
      }
    }
    return new Promise(resolve => {
      //this.http.post('http://172.16.131.108:3000/user/register', JSON.stringify({ name: name, username: username, password: password }), options)
      this.http.post('https://fast-taiga-61275.herokuapp.com/user/register', JSON.stringify(user), options)
        .map(res => res.json().success)
        .subscribe(data => {
          resolve(data);
        })
    })
  }

  getUser(username) {
    let ch: boolean = false;
    if (ch) {
      return Promise.resolve(this.user)
    }
    return new Promise(resolve => {
      this.http.get('https://fast-taiga-61275.herokuapp.com/user/' + username)
        .map(res => res.json().message)
        .subscribe(data => {
          this.user = data;
          resolve(this.user);
        })
    })
  }

  updateUser(dataset, username) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    //let profile = localStorage.getItem('currentUser');
    //let getprofile = JSON.parse(profile);

    /*let data = {
      password : profile.password,
      firstname : "gg",
      lastname : profile.lastname,
      email : profile.email,
      phone : profile.phone,
      address : profile.address,

      id_card : profile.health_record.id_card,
      birthday : profile.health_record.birthday,
      gender : profile.health_record.gender,
      contact_person : profile.health_record.contact_person,
      relationship : profile.health_record.relationship,
      contact_person_phone : profile.health_record.contact_person_phone,
      allergy : profile.health_record.allergy,
      chronic_diseases : profile.health_record.chronic_diseases,
    }*/
    return new Promise(resolve => {
      this.http.put('https://fast-taiga-61275.herokuapp.com/user/' + username, JSON.stringify(dataset), options)
        .map(res => res.json().success)
        .subscribe(data => {
          /*if(data.ok == 1){
            resolve(data.ok);
          }*/
          resolve(data);
        })
    })
  }

  getPlaces() {
    if (this.place) {
      return Promise.resolve(this.place)
    } return new Promise(resolve => {
      this.http.get('http://172.16.131.108:3000/places')
        .map(res => res.json().message)
        .subscribe(data => {
          this.place = data;
          resolve(this.place);
        })
    })
  }

  getNearbyPlace(lat, long) {
    if (this.near_place) {
      return Promise.resolve(this.near_place)
    } return new Promise(resolve => {
      this.http.get('http://172.16.131.108:3000/places/nearby/' + lat + '/' + long)
        .map(res => res.json().message)
        .subscribe(data => {
          this.near_place = data;
          resolve(this.near_place);
        })
    })
  }

  getNear() {
    if (this.near) {
      return Promise.resolve(this.near)
    } return new Promise(resolve => {
      this.http.get('https://fast-taiga-61275.herokuapp.com/api/places/')
        .map(res => res.json())
        .subscribe(data => {
          this.near = data;
          resolve(this.near);
        })
    })
  }

  getAppointment() {
    if (this.fake == 1) {
      return Promise.resolve(this.appoint)
    } return new Promise(resolve => {
      this.http.get('https://fast-taiga-61275.herokuapp.com/api/appointment/')
        .map(res => res.json())
        .subscribe(data => {
          this.appoint = data;
          resolve(this.appoint);
        })
    })
  }
  getMyAppointment(user) {
    if (this.fake == 1) {
      return Promise.resolve(this.appoint)
    } return new Promise(resolve => {
      this.http.get('https://fast-taiga-61275.herokuapp.com/api/appointment/'+user)
        .map(res => res.json().message)
        .subscribe(data => {
          this.appoint = data;
          resolve(this.appoint);
        })
    })
  }

  BookAppointment(dataset) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    return new Promise(resolve => {
      this.http.post('https://fast-taiga-61275.herokuapp.com/api/appointment/', JSON.stringify(dataset), options)
        .map(res => res.json().success)
        .subscribe(data => {
          resolve(data);
        })
    })

}
}