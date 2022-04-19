import { Component, OnInit } from '@angular/core';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { HostListener } from '@angular/core';
import { MapService } from '../map.service';
import { Places } from "./places";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  places: Places[] = [];
  place: string = '../../assets/places.json';
  screenHeight: any;
  screenWidth: any;
  desktop = false;
  shownMap = false;
  shownList = true; 
  faList = faList;
  faMap = faMap;
  mapService = new MapService();
  
  constructor(private http: HttpClient) {
  }
  getPlaces():Observable<Places> {
    return this.http.get<Places>(this.place);
  }
  getPlace(): void {
    this.getPlaces().subscribe((res: Places) => {
      this.places.push(res);
    });
  }
  getPosition() {
    this.mapService.getMyLocation();
  }
  showMap() {
    this.shownMap = true;
    this.shownList = false;
  }
  showList() {
    this.shownList = true;
    this.shownMap = false;
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 600) {
      this.desktop = true;
      this.shownMap = false;
      this.shownList = true;
    } else {
      this.desktop = false;
    }
  }
  ngOnInit(): void {
    this.getPlace();
    this.getScreenSize();
    // this.list.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
  }

}
