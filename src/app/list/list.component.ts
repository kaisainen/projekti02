import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import { Places } from './places';
import { JsonService } from '../json.service';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LatLng } from 'leaflet';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  places: Places[] = [];
  km: any;
  userCoordinates: number[] = [];

  constructor(private jsonService: JsonService) {}

  ngOnInit(): void {
    this.getUserLocation();
    this.getPlaces();

    // this.list.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
  }

  getUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;
      this.userCoordinates.push(userLat);
      this.userCoordinates.push(userLon);
    });
  }

  getPlaces(): void {
    this.jsonService.getPlaces().subscribe((res: Places) => {
      this.places.push(res);
      for (let place of this.places[0].data) {
        place.distance = this.getDistanceV1(this.userCoordinates, [
          place.location.lat,
          place.location.lon,
        ]);
      }
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
    var distance = c * EARTH_RADIUS * 1000;
    // if distance is more than a kilometer, the results will show in kilometers. Else results will show in meters.
    // if (distance > 1000) {
    //   return (distance / 1000).toFixed(1) + ' km';
    // }
    return c * EARTH_RADIUS;
  }

  toRadian(degree: number) {
    return (degree * Math.PI) / 180;
  }

  sortResults() {
    this.places[0].data.sort((a, b) => a.distance - b.distance);
  }
}
