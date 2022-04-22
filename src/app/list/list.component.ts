import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import { Places } from './places';
import { JsonService } from '../json.service';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  places: Places[] = [];
  km: any;
  userCoordinates: number[] = [];
  // mapService = new MapService();

  constructor(
    private jsonService: JsonService,
    private mapService: MapService
  ) {}
  getPlaces(): void {
    this.jsonService.getPlaces().subscribe((res: Places) => {
      this.places.push(res);
    });
  }
  getPosition() {
    this.mapService.getMyLocation();
  }
  ngOnInit(): void {
    this.getUserLocation();
    this.getPlaces();
    // this.list.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
  }

  // takes two sets of coordinates as parametres, e.g. getDistance([10.0, 11.0], [30.0, 40.0]). return distance in meters
  getDistanceV1(origin: any, destination: any) {
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
    if (distance > 1000) {
      return (distance / 1000).toFixed(1) + ' km';
    }
    return (c * EARTH_RADIUS).toFixed(0) + ' m';
  }

  // getDistance(destLat: any, destLon: any) {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const lat1 = position.coords.latitude;
  //     const lon1 = position.coords.longitude;
  //     const lon2 = this.toRadian(destLon);
  //     const lat2 = this.toRadian(destLat);

  //     var deltaLat = lat2 - lat1;
  //     var deltaLon = lon2 - lon1;

  //     var a =
  //       Math.pow(Math.sin(deltaLat / 2), 2) +
  //       Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
  //     var c = 2 * Math.asin(Math.sqrt(a));
  //     var EARTH_RADIUS = 6371;

  //     this.km = c * EARTH_RADIUS * 1000;
  //     const element = (document.getElementById('distance')!.innerHTML =
  //       this.km);
  //     return c * EARTH_RADIUS * 1000;
  //   });
  // }
  toRadian(degree: number) {
    return (degree * Math.PI) / 180;
  }

  getUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;
      this.userCoordinates.push(userLat);
      this.userCoordinates.push(userLon);
    });
  }
}
