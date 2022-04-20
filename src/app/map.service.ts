import { Injectable } from '@angular/core';
import * as Leaflet from 'leaflet';
import { MarkerService } from './marker.service';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor() {}

  // gets user's current location and returns the coordinates as a list/array.
  // To use this function in a component, import the service and call it by this.servicename.getMyLocation(). DOES NOT SEEM TO WORK - RETURNS UNDEFINED INSTEAD OF LATLONG
  getMyLocation(): any {
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      // console.log(
      //   `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      // );
      return latLong;
    });
  }

  // while using a mobile device, tracks the user's location.
  // To use this function in a component, import the service and call it by this.servicename.watchPosition().
  watchPosition() {
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition(
      (position) => {
        console.log(
          `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
        );
        if (position.coords.latitude === desLat) {
          navigator.geolocation.clearWatch(id);
        }
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }
}
