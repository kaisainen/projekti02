import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { JsonService } from './json.service';
import { Datum, Places } from './list/places';
import { PopupService } from './popup.service';
@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  // places: string = './assets/test.json';
  //places: Places[] = [];
  place: string = '../../assets/places.json';

  places: Places[] = [];

  constructor(
    private http: HttpClient,
    private popupService: PopupService,
    private jsonService: JsonService
  ) {}

  // makePlacesMarkers(map: L.Map): void {
  //   this.http.get(this.place).subscribe((res: any) => {
  //     for (const c of res.data) {
  //       const lon = c.location.lon;
  //       const lat = c.location.lat;
  //       const marker = L.marker([lat, lon]);
  //       marker.bindPopup(this.popupService.makePlacesPopup(c));
  //       marker.addTo(map);
  //     }
  //   });
  // }

  // Reads data from jsonservice
  makePlacesMarkers(map: L.Map) {
    navigator.geolocation.getCurrentPosition((position) => {
      const currentLat = position.coords.latitude;
      const currentLon = position.coords.longitude;

      this.jsonService.getPlaces().subscribe((res: Places) => {
        for (const c of res.data) {
          const lon = c.location.lon;
          const lat = c.location.lat;
          const marker = L.marker([lat, lon]);
          //this is just testing
          const distance = this.getDistance(
            [currentLat, currentLon],
            [lat, lon]
          );
          console.log(c.name.en + ':' + distance);
          //above is for testing
          marker.bindPopup(this.popupService.makePlacesPopup(c));
          marker.addTo(map);
        }
      });
    });
  }

  makeMyLocationMarker(map: L.Map): void {
    navigator.geolocation.getCurrentPosition((position) => {
      const currentLat = position.coords.latitude;

      const currentLon = position.coords.longitude;

      const currentLocationMarker = L.circleMarker([currentLat, currentLon]);

      currentLocationMarker.setStyle({ color: 'red' });

      currentLocationMarker.bindPopup(
        this.popupService.makeCurrentLocationPopup()
      );

      currentLocationMarker.addTo(map);
    });
  }

  getDistance(origin: any, destination: any) {
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
    return c * EARTH_RADIUS * 1000;
  }

  toRadian(degree: number) {
    return (degree * Math.PI) / 180;
  }
}
