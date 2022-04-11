import { Component, OnInit } from '@angular/core';
declare const L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  ngOnInit() {
    this.getCurrentLocation();
    this.watchPosition();
  }

  getCurrentLocation() {
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    // gets current position
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
      // sets the map view based on current location
      let mymap = L.map('map').setView(latLong, 11);
      // adds the tiles to the map
      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWgtMjAiLCJhIjoiY2wxbTg0dWZyMGdlaTNqb2JhbXVqaG90aiJ9.P2rhaDNS3sVsqmeewBeQpQ',
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'your.mapbox.access.token',
        }
      ).addTo(mymap);

      //adds a marker of current location on the map
      let marker = L.marker(latLong).addTo(mymap);

      marker.bindPopup('<b>My location</b>').openPopup();

      //adds another marker on map for given coordinates - we need a separate function for this that takes coordinates as parameters so that we can add all locations from the Helsinki API and add their markers to the map
      L.marker([60.1967887878418, 24.967309951782227])
        .addTo(mymap)
        .bindPopup('Added place.')
        .openPopup();
    });
  }

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
