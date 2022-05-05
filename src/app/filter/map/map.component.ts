import {
  Component,
  AfterViewInit,
  OnInit,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
} from '@angular/core';
import * as L from 'leaflet';
import { ApiService } from '../../api.service';
import { PlaceDetailComponent } from '../../place-detail/place-detail.component';
import { Places } from '../../places';
import 'leaflet.markercluster';

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
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit, OnInit {
  private map: any;
  places: Places[] = [];

  constructor(
    private api: ApiService,
    private resolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector
  ) {}
  ngOnInit(): void {}

  private initMap(): void {
    this.map = L.map('map').locate({ setView: true, maxZoom: 15 });

    const tiles = L.tileLayer(
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
    );

    tiles.addTo(this.map);
  }
  makePlacesPopup(data: any): any {
    let markerPopup: any = this.compilePopup(PlaceDetailComponent, (p: any) => {
      (p.instance.name = data.name.fi),
        (p.instance.address = data.location.address.street_address),
        (p.instance.postal_code = data.location.address.postal_code),
        (p.instance.locality = data.location.address.locality),
        (p.instance.info_url = data.info_url),
        (p.instance.intro = data.description.intro);
    });
    return markerPopup;
  }
  private compilePopup(component: any, onAttach: any): any {
    const compFactory: any = this.resolver.resolveComponentFactory(component);
    let compRef: any = compFactory.create(this.injector);

    if (onAttach) onAttach(compRef);

    this.applicationRef.attachView(compRef.hostView);
    compRef.onDestroy(() => this.applicationRef.detachView(compRef.hostView));

    let div = document.createElement('div');
    div.appendChild(compRef.location.nativeElement);
    return div;
  }

  makeCurrentLocationPopup(): string {
    return `` + `<div>Olen tässä</div>`;
  }

  makePlacesMarkers(map: L.Map) {
    this.api.getAllPlaces().subscribe((res: any) => {
      const markerCluster = new L.MarkerClusterGroup();
      for (const c of res.data) {
        const lon = c.location.lon;
        const lat = c.location.lat;
        const marker = L.marker([lat, lon]);
        //this is just testing
        // const distance = this.getDistance(
        //   [currentLat, currentLon],
        //   [lat, lon]
        // );
        // console.log(c.name.en + ':' + distance);
        //above is for testing
        marker.bindPopup(this.makePlacesPopup(c));
        markerCluster.addLayer(marker);

        //  marker.addTo(map);
      }
      map.addLayer(markerCluster);
    });
  }
  makeEventsMarkers(map: L.Map) {
    navigator.geolocation.getCurrentPosition((position) => {
      const currentLat = position.coords.latitude;
      const currentLon = position.coords.longitude;

      this.api.getAllEvents().subscribe((res: any) => {
        const markerCluster = new L.MarkerClusterGroup();

        for (const c of res.data) {
          const lon = c.location.lon;
          const lat = c.location.lat;
          const marker = L.marker([lat, lon]);

          marker.bindPopup(this.makePlacesPopup(c));
          markerCluster.addLayer(marker);

          // marker.addTo(map);
        }
        map.addLayer(markerCluster);
      });
    });
  }
  makeActivitiesMarkers(map: L.Map) {
    navigator.geolocation.getCurrentPosition((position) => {
      const currentLat = position.coords.latitude;
      const currentLon = position.coords.longitude;

      this.api.getAllActivities().subscribe((res: any) => {
        const markerCluster = new L.MarkerClusterGroup();

        for (const c of res.data) {
          const lon = c.location.lon;
          const lat = c.location.lat;
          const marker = L.marker([lat, lon]);

          marker.bindPopup(this.makePlacesPopup(c));
          markerCluster.addLayer(marker);

          //  marker.addTo(map);
        }
        map.addLayer(markerCluster);
      });
    });
  }
  makeMyLocationMarker(map: L.Map): void {
    navigator.geolocation.getCurrentPosition((position) => {
      const currentLat = position.coords.latitude;

      const currentLon = position.coords.longitude;

      const currentLocationMarker = L.circleMarker([currentLat, currentLon]);

      currentLocationMarker.setStyle({ color: 'red' });

      currentLocationMarker.bindPopup(this.makeCurrentLocationPopup());

      currentLocationMarker.addTo(map);
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.makeMyLocationMarker(this.map);
    this.makePlacesMarkers(this.map);
    this.makeActivitiesMarkers(this.map);
    this.makeEventsMarkers(this.map);
  }
}
