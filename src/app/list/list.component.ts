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
    this.getPlaces();
    // this.list.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
  }

  getDistance(destLat: any, destLon: any) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat1 = position.coords.latitude;
      const lon1 = position.coords.longitude;
      const lon2 = this.toRadian(destLon);
      const lat2 = this.toRadian(destLat);
  
    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;
  
    var a =
      Math.pow(Math.sin(deltaLat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var EARTH_RADIUS = 6371;
    
    this.km = c * EARTH_RADIUS * 1000;
    const element = document.getElementById("distance")!.innerHTML = this.km;
     return c * EARTH_RADIUS * 1000;
  })
  }
  toRadian(degree: number) {
    return (degree * Math.PI) / 180;
    
  }

}
