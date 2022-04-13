import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  places: string = '/assets/places.json';

  constructor(private http: HttpClient) { }

  
  makePlacesMarkers(map: L.Map): void {

    this.http.get(this.places).subscribe((res: any) => {
      for(const pl of res){
      const lon = pl.location.lon;
       const lat = pl.location.lat;
        const marker = L.marker([lat, lon]);
      //  marker.bindPopup(this.popupService.makePlacePopup(p));
        marker.addTo(map);
      }
    })
  }
  makeMyLocationMarker(map: L.Map): void {

    navigator.geolocation.getCurrentPosition((position) => {

      const currentLat = position.coords.latitude;

      const currentLon = position.coords.longitude;

      const marker = L.circleMarker([currentLat, currentLon])

      marker.setStyle({color: 'blue'})


     // marker.bindPopup(this.popupService.makeCurrentLocPopup());

     

      marker.addTo(map);

    })
  
}
}
