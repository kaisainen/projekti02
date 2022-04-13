import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { MapService } from '../map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  private map: any;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.mapService.initMapByUserLocation(this.map, 15);
    this.mapService.watchPosition();
  }
}
