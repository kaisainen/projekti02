import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Places } from '../places';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit {
  places: Places[] = [];
  placeId: any;


  constructor( 
    private route: ActivatedRoute,
    private api: ApiService) { }

  ngOnInit(): void {
  //this.getPlace();
  }
  getPlaces(): void {
    this.api.getAllPlaces().subscribe((res: Places) => {
      this.places.push(res);
    });
  }
  
 

  

  getPlace(): void {
    this.route.paramMap.pipe(switchMap(params => {
      this.placeId = params.get('id');

      return this.api.getPlace(this.placeId)
    })
    ).subscribe(data => {
      if (data.id == this.placeId) {

        this.places = data;
        console.log(this.places);
      }

     
    })
  }
}
