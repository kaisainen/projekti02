import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Places } from "../app/list/places";
import { Activities } from "../app/activities"
@Injectable({
  providedIn: 'root'
})
export class jsonService {
  place: string = '../assets/places.json';
  activity: string = '../assets/activities.json';
  constructor(private http: HttpClient) { }
  getPlaces():Observable<Places> {
    return this.http.get<Places>(this.place);
  }
  getActivities():Observable<Activities> {
    return this.http.get<Activities>(this.activity);
  }
}

// Ohje Servicen käyttöön:
// Lisää kolme importtia(polku saattaa olla eri)
// import { Activities } from "../../app/activities"
// import { Places } from "./places";
// import {jsonService} from '../json.service';
// lisää property activities: Activities[] = [];
// lisää property places: Places[] = [];
// lisää constructoriin json service:  constructor(private jsonService: JsonService) {}
// lisää metodi #1
// getPlaces(): void {
//   this.jsonService.getPlaces().subscribe((res: Places) => {
//     this.places.push(res);
//     for (let place of this.places[0].data) {
//       place.distance = this.getDistanceV1(this.userCoordinates, [
//         place.location.lat,
//         place.location.lon,
//       ]);
//     }
//     this.places[0].data.sort((a, b) => a.distance - b.distance);
//   });
// }
// lisää metodi #2
//getActivities(): void {
//   this.jsonService.getActivities().subscribe((res: Activities) => {
//     this.activities.push(res);
//     for (let activity of this.activities[0].data) {
//       activity.distance = this.getDistanceV1(this.userCoordinates, [
//         activity.location.lat,
//         activity.location.lon,
//       ]);
//     }
//     this.places[0].data.sort((a, b) => a.distance - b.distance);
//   });
// }
// lisää metodin kutsu ngOnInit(): sisälle this.getPlaces();
// lisää metodin kutsu ngOnInit(): sisälle this.getActivities();



