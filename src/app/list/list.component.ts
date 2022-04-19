import { Component, OnInit } from '@angular/core';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { HostListener } from '@angular/core';
import { MapService } from '../map.service';
import { Places } from './places';
import { JsonService } from '../json.service';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  places: Places[] = [];
  mapService = new MapService();

  constructor(private jsonService: JsonService) {}
  getPlaces(): void {
    this.jsonService.getPlaces().subscribe((res: Places) => {
      this.places.push(res);
    });
  }
  getPosition() {
    this.mapService.getMyLocation();
  }
  ngOnInit(): void {
    this.getPlaces();
    // this.list.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
  }
}
