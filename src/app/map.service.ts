import { Injectable } from '@angular/core';
import * as Leaflet from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor() {}

  // gets user's current location and returns the coordinates as a list/array.
  // To use this function in a component, import the service and call it by this.servicename.getMyLocation().
  getMyLocation() {
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
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

  // This function draws the map based on user location and adds a marker of the user's location. Takes a leaflet map object and a zoom amount as parameters
  initMapByUserLocation(map: Leaflet.Map, zoom: number) {
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    // gets current position
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const lat = coords.latitude;
      const long = coords.longitude;
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
      // sets the map view based on current location
      if (!zoom) {
        zoom = 15;
      }
      map = Leaflet.map('map').setView([lat, long], zoom);
      // adds the tiles (pictures of map) to the map
      const tiles = Leaflet.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 18,
          minZoom: 3,
        }
      );
      tiles.addTo(map);

      //adds a marker of current location on the map
      let marker = Leaflet.marker([lat, long]).addTo(map);

      marker.bindPopup('<b>My location</b>').openPopup();
    });
  }

  // Draws a map with center of the map based on coordinates and zoom level given as parameters.
  initMapByCoordinates(
    map: Leaflet.Map,
    lat: number,
    long: number,
    zoom: number
  ) {
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    if (!zoom) {
      zoom = 15;
    }
    map = Leaflet.map('map').setView([lat, long], zoom);
    // adds the tiles (pictures of map) to the map
    const tiles = Leaflet.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
        minZoom: 3,
      }
    );
    tiles.addTo(map);
  }
}
