import { Component, OnInit, Pipe } from '@angular/core';
import { jsonService } from '../json.service';
import { Places } from '../places';
import { Activities } from '../../app/activities';
import { Events } from '../../app/events';
import { KilometerToMeterPipe } from '../kilometer-to-meter.pipe';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  places: Places[] = [];
  activities: Activities[] = [];
  events: Events[] = [];
  km: any;
  userCoordinates: number[] = [];

  constructor(private jsonService: jsonService) {}

  ngOnInit(): void {
    this.getUserLocation();
    this.getPlaces();
    // this.getActivities();
    // this.getEvents();
  }
  getUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;
      this.userCoordinates.push(userLat);
      this.userCoordinates.push(userLon);
    });
  }

  // gets places and sorts them ascending by distance to user
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
