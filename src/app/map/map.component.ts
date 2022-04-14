
import { Component, AfterViewInit } from '@angular/core';
import { MarkerService } from '../marker.service';
import * as L from 'leaflet';


const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

=======
import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { MapService } from '../map.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {

  private map: any;
  
  private initMap(): void {
    this.map = L.map('map').locate({setView: true, maxZoom: 12});

  
    const tiles =  L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWgtMjAiLCJhIjoiY2wxbTg0dWZyMGdlaTNqb2JhbXVqaG90aiJ9.P2rhaDNS3sVsqmeewBeQpQ',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token',
    });
   

    tiles.addTo(this.map);
  }

 

  constructor(private markerService: MarkerService) { }
  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeMyLocationMarker(this.map);
    this.markerService.makePlacesMarkers(this.map);
  }

export class MapComponent implements OnInit {
  private map: any;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.mapService.initMapByUserLocation(this.map, 15);
    this.mapService.watchPosition();
  }
}
