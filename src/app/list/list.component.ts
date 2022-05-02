import { Component, EventEmitter, Injectable, NgModule, OnInit, Output } from '@angular/core';
import { jsonService } from '../json.service';
import { Places } from '../places';
import { Activities } from "../../app/activities";
import { Events } from "../../app/events";
import { FilterComponent } from '../filter/filter.component';
import { Filters } from '../filters';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
@Injectable({ providedIn: 'root' })
export class ListComponent implements OnInit {
  FilterComponent: any = FilterComponent;
  places: Places[] = [];
  activities: Activities[] = [];
  events: Events[] = [];
  km: any;
  userCoordinates: number[] = [];
  // filter = "";
  filter: Filters[] = [];
  place = false;
  event = false;
  activity = false;
  constructor(private jsonService: jsonService) {}


  // Täällä maali, consoleen tulee arvot oikein mutta ngIf ei vaihda listaa
  setFilter(filter:any) : void {
    this.getData(filter);                
    // if (filter === 'places') {
    //   this.place = true;
    //   this.event = false;
    //   this.activity = false;
    //   console.log("list has been set to places")
    //   console.log("place = ",this.place)
    //   console.log("activity = ",this.activity)
    //   console.log("event = ",this.event)
    // }
    // else if(filter === 'events') {
    //   this.place = false;
    //   this.event = true;
    //   this.activity = false;
    //   console.log("list has been set to events")
    //   console.log("event = ",this.event)
    //   console.log("place = ",this.place)
    //   console.log("activity = ",this.activity)
    // }
    // else if (filter === 'activities') {
    //   this.place = false;
    //   this.event = false;
    //   this.activity = true;
    //   console.log("list has been set to activities")
    //   console.log("event = ",this.event)
    //   console.log("activity = ",this.activity)
    //   console.log("place = ",this.place)
    // }
  }
  ngOnInit(): void {
    this.getUserLocation();
    this.getPlaces();
    this.getActivities();
    this.getEvents();

  }
  getUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;
      this.userCoordinates.push(userLat);
      this.userCoordinates.push(userLon); 
    });
  }
  getData(filter:any): void {
    console.log("getting data")
    if(filter === 'places') {
    this.filter = [];
    this.jsonService.getPlaces().subscribe((res: Places) => {
      this.filter.push(res);
      // here we set the distance to user for each place (the Activities interface is updated with this new property).
      for (let data of this.filter[0].data) {
        data.distance = this.getDistanceV1(this.userCoordinates, [
          data.location.lat,
          data.location.lon,
        ]);
      }
      this.filter[0].data.sort((a:any, b:any) => a.distance - b.distance);
    });
  }
  if (filter === 'events'){
    this.jsonService.getEvents().subscribe((res: Events) => {
      this.filter = [];
       this.filter.push(res);
      // here we set the distance to user for each place (the Activities interface is updated with this new property).
      for (let data of this.filter[0].data) {
        data.distance = this.getDistanceV1(this.userCoordinates, [
          data.location.lat,
          data.location.lon,
        ]);
      }
      this.filter[0].data.sort((a: any, b: any) => a.distance - b.distance);
    });
  }
  if (filter === 'activities'){
    this.jsonService.getActivities().subscribe((res: Activities) => {
      this.filter = [];
      this.filter.push(res);
      // here we set the distance to user for each place (the Activities interface is updated with this new property).
      for (let data of this.filter[0].data) {
        data.distance = this.getDistanceV1(this.userCoordinates, [
          data.location.lat,
          data.location.lon,
        ]);
      }
      this.filter[0].data.sort((a:any, b:any) => a.distance - b.distance);
    });
  }
  }
  // getData(filter:any): void {
  //   this.jsonService.getData(filter).subscribe((res: Filters) => {
  //     this.filter.push(res);
  //     // here we set the distance to user for each place (the Activities interface is updated with this new property).
  //     for (let data of filter[0].data) {
  //       data.distance = this.getDistanceV1(this.userCoordinates, [
  //         data.location.lat,
  //         data.location.lon,
  //       ]);
  //     }
  //     this.filter[0].data.sort((a, b) => a.distance - b.distance);
  //   });
  // }
  // // gets places and sorts them ascending by distance to user
  getPlaces(): void {
    this.jsonService.getPlaces().subscribe((res: Places) => {
      this.places.push(res);
      // here we set the distance to user for each place (the Places interface is updated with this new property).
      for (let place of this.places[0].data) {
        place.distance = this.getDistanceV1(this.userCoordinates, [
          place.location.lat,
          place.location.lon,
        ]);
      }
      this.places[0].data.sort((a, b) => a.distance - b.distance);
    });
  }
  getActivities(): void {
    this.jsonService.getActivities().subscribe((res: Activities) => {
      this.activities.push(res);
      // here we set the distance to user for each place (the Activities interface is updated with this new property).
      for (let activity of this.activities[0].data) {
        activity.distance = this.getDistanceV1(this.userCoordinates, [
          activity.location.lat,
          activity.location.lon,
        ]);
      }
      this.activities[0].data.sort((a, b) => a.distance - b.distance);
    });
  }
  getEvents(): void {
    this.jsonService.getEvents().subscribe((res: Events) => {
      this.events.push(res);
      // here we set the distance to user for each place (the Events interface is updated with this new property).
      for (let event of this.events[0].data) {
        event.distance = this.getDistanceV1(this.userCoordinates, [
          event.location.lat,
          event.location.lon,
        ]);
      }
      this.events[0].data.sort((a, b) => a.distance - b.distance);
    });
  }

  // takes two sets of coordinates as parameters, e.g. getDistance([10.0, 11.0], [30.0, 40.0]). return distance in meters
  getDistanceV1(origin: number[], destination: number[]): number {
    var lon1 = this.toRadian(origin[1]),
      lat1 = this.toRadian(origin[0]),
      lon2 = this.toRadian(destination[1]),
      lat2 = this.toRadian(destination[0]);
    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;
    var a =
      Math.pow(Math.sin(deltaLat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var EARTH_RADIUS = 6371;
    var distance = c * EARTH_RADIUS;
    return distance;
  }

  toRadian(degree: number) {
    return (degree * Math.PI) / 180;
  }

  showDistance(place: any) {
    let distance = place.distance * 1000;
    if (distance < 1000) {
      return distance.toFixed(0) + ' m';
    }
    distance = place.distance;
    return distance.toFixed(2) + ' km';
  }
}
