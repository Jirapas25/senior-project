import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { MyRest } from '../../providers/my-rest';
import { HomePage } from '../home/home';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
  providers: [MyRest]
})
export class BookingPage {
  place: any;
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  today: Date = new Date();
  myDate: Date = new Date(this.today);
  

  days = [
    'Sun', //Sunday starts at 0
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
  ];
  slot = [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  /*appointment = [
    {
      date: "2017-03-31",
      time: "10:00",
      status: "booked",
      description: "blaaaa",
      user_id: "john",
      username: "someuser"
    }
  ] */

  appointment:any =[];

  /*schedule_appoint = {
    mon: {
      time_start: "09:00",
      time_end: "12:00",
      book_per_slot: "1",
      hours_scale: "1",
      count: 3
    }
  }*/
//schedule_appoint:any = this.place.schedule;
  schedule_appoint:any;
  m:any = this.myDate.getMonth()+1;
  dformat:any =  this.myDate.getDate()+"/"+this.m+"/"+this.myDate.getFullYear();
  schedule = {
    avail_time_slots: [
    ],
    current_date: this.today,
    current_time:  this.today.getTime(),
    date: this.dformat,
    week_day: this.myDate.getDay(),
    time_start: "",
    time_end: "",
    hours_scale: "",
    username: ""

  }


  constructor(public modalCtrl: ModalController, public events: Events, public placeService: MyRest ,public plt: Platform, public navCtrl: NavController, public navParams: NavParams) {
    this.plt.ready().then((readySource) => {
      console.log('ionViewDidLoad PlaceDetailPage');
      this.place = this.navParams.get('place');
      this.schedule_appoint = this.place.schedule;
      this.schedule.username = this.place.account.username;
      this.getAppointment();
      console.log(this.place);
      console.log(this.myDate.getDay());
      this.events.subscribe('reloadPage', () => {
				this.getAppointment();
			});

      //(<HTMLImageElement>document.getElementById("mapPic")).src = "https://maps.googleapis.com/maps/api/staticmap?center=" + this.lat + "," + this.lng + "&zoom=18&size=300x180&markers=color:blue|" + this.lat + "," + this.lng + "";
    });

  }

  confirm_booking(time) {
    let profile = localStorage.getItem('currentLogin');
    let dataset = {
      date: this.schedule.date,
      time: time,
      status: "booked",
      description: "blaaaa",
      user_id: profile,
      username: this.place.account.username
    }
    let book_already = false;

      for (var i = 0; i < this.appointment.length; i++) {
        if (this.appointment[i].date == this.schedule.date && this.appointment[i].user_id == profile) {
          book_already = true;
          this.events.publish('reloadPage');
        }
        
      }
    if(book_already){
      alert("You already booked on today");
    }else {
      var r = confirm("Confirm Booking!");
      if (r == true) {
          this.placeService.BookAppointment(dataset).then((data) => {
		  		if(!data) {
		        console.log('Boking fail');
            alert("Booking fail");
            this.events.publish('reloadPage');
		  		}else {
		      	console.log('Booking successful');
            alert("Booking successful");
            this.events.publish('reloadPage');
		  		}
		  		console.log(data);
		  });
      } else {
          this.events.publish('reloadPage');
      }
      
    } 
    
  
  }

  getTomorow() {
    this.myDate.setDate(this.myDate.getDate()+1);
    this.events.publish('reloadPage');
  }

  getYesterday() {
    this.myDate.setDate(this.myDate.getDate()-1);
    this.events.publish('reloadPage');
  }

  init(){
    let day = this.myDate.getDay();
    let month = this.myDate.getMonth()+1;
    this.dformat = this.myDate.getDate()+"/"+month+"/"+this.myDate.getFullYear();
    this.schedule.date = this.dformat;
    this.schedule.week_day = day;
    console.log(day);
          switch (day) {
          case 0:
          //set value
          this.schedule.time_start = this.schedule_appoint.sun.time_start;
          this.schedule.time_end = this.schedule_appoint.sun.time_end;
          this.schedule.hours_scale = this.schedule_appoint.sun.hours_scale;

            for (var i = 0; i < this.slot.length; i++) {
              var element = this.slot[i];
              if(element == this.schedule.time_start){
                for (var j = 0; j < this.schedule_appoint.sun.count; j++) {
                  this.schedule.avail_time_slots[j] = this.slot[i+j];             
                }
              }
            }
          break;
          case 1:
          //set value
          this.schedule.time_start = this.schedule_appoint.mon.time_start;
          this.schedule.time_end = this.schedule_appoint.mon.time_end;
          this.schedule.hours_scale = this.schedule_appoint.mon.hours_scale;

            for (var i = 0; i < this.slot.length; i++) {
              var element = this.slot[i];
              if(element == this.schedule.time_start){
                for (var j = 0; j < this.schedule_appoint.mon.count; j++) {
                  this.schedule.avail_time_slots[j] = this.slot[i+j];             
                }
              }
            }          
          break;
          case 2:
          //set value
          this.schedule.time_start = this.schedule_appoint.tue.time_start;
          this.schedule.time_end = this.schedule_appoint.tue.time_end;
          this.schedule.hours_scale = this.schedule_appoint.tue.hours_scale;

            for (var i = 0; i < this.slot.length; i++) {
              var element = this.slot[i];
              if(element == this.schedule.time_start){
                for (var j = 0; j < this.schedule_appoint.tue.count; j++) {
                  this.schedule.avail_time_slots[j] = this.slot[i+j];             
                }
              }
            }          
          break;
          case 3:
          //set value
          this.schedule.time_start = this.schedule_appoint.wed.time_start;
          this.schedule.time_end = this.schedule_appoint.wed.time_end;
          this.schedule.hours_scale = this.schedule_appoint.wed.hours_scale;

             for (var i = 0; i < this.slot.length; i++) {
              var element = this.slot[i];
              if(element == this.schedule.time_start){
                for (var j = 0; j < this.schedule_appoint.wed.count; j++) {
                  this.schedule.avail_time_slots[j] = this.slot[i+j];             
                }
              }
            }         
          break;
          case 4:
          //set value
          this.schedule.time_start = this.schedule_appoint.thu.time_start;
          this.schedule.time_end = this.schedule_appoint.thu.time_end;
          this.schedule.hours_scale = this.schedule_appoint.thu.hours_scale;

            for (var i = 0; i < this.slot.length; i++) {
              var element = this.slot[i];
              if(element == this.schedule.time_start){
                for (var j = 0; j < this.schedule_appoint.thu.count; j++) {
                  this.schedule.avail_time_slots[j] = this.slot[i+j];             
                }
              }
            }          
          break;
          case 5:
          //set value
          this.schedule.time_start = this.schedule_appoint.fri.time_start;
          this.schedule.time_end = this.schedule_appoint.fri.time_end;
          this.schedule.hours_scale = this.schedule_appoint.fri.hours_scale;

            for (var i = 0; i < this.slot.length; i++) {
              var element = this.slot[i];
              if(element == this.schedule.time_start){
                for (var j = 0; j < this.schedule_appoint.fri.count; j++) {
                  this.schedule.avail_time_slots[j] = this.slot[i+j];             
                }
              }
            }          
          break;
          case 6:
          //set value
          this.schedule.time_start = this.schedule_appoint.sat.time_start;
          this.schedule.time_end = this.schedule_appoint.sat.time_end;
          this.schedule.hours_scale = this.schedule_appoint.sat.hours_scale;

            for (var i = 0; i < this.slot.length; i++) {
              var element = this.slot[i];
              if(element == this.schedule.time_start){
                console.log(element);
                for (var j = 0; j < this.schedule_appoint.sat.count; j++) {
                  this.schedule.avail_time_slots[j] = this.slot[i+j];             
                }
              }
            }          
          break;
      
        default:
          break;
      }
      console.log(this.appointment);
      console.log(this.schedule.avail_time_slots);
      console.log(this.schedule);
      //delete slot
      for (var i = 0; i < this.appointment.length; i++) {
        var ele = this.appointment[i];
        if (this.appointment[i].date == this.schedule.date && this.appointment[i].username == this.schedule.username) {
          
            for (var j = 0; j < this.schedule.avail_time_slots.length; j++) {
              if (this.schedule.avail_time_slots[j] == this.appointment[i].time) {
                this.schedule.avail_time_slots.splice( j, 1 );
              }
              
            }
        }
        
      }

      console.log(this.schedule.avail_time_slots);
  }

  getAppointment() {
    this.placeService.getAppointment().then((data) => {
      console.log("data:"+data);
      this.appointment = data;
      this.init();
    });
  } 


}
