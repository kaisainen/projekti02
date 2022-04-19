import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Places } from "../app/list/places";
@Injectable({
  providedIn: 'root'
})
export class JsonService {
  place: string = '../assets/places.json';
  constructor(private http: HttpClient) { }
  getPlaces():Observable<Places> {
    return this.http.get<Places>(this.place);
  }
}
// Ohje servicen käyttöön:
// Lisää kaksi importtia(polku saattaa olla eri)
// import { Places } from "./places";
// import {JsonService} from '../json.service';
// lisää property places: Places[] = [];
// lisää constructoriin json service:  constructor(private jsonService: JsonService) {}
// lisää metodi 
// getPlaces(): void {
// this.jsonService.getPlaces().subscribe((res: Places) => {
// this.places.push(res);
// });
// lisää metodin kutsu ngOnInit(): sisälle this.getPlaces();


