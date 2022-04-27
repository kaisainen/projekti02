import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Places } from '../places';
import { MarkerService } from '../marker.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit {
  places: Places[] = [];
  address!: String;
  postalCode!: String; 
  locality!: String;
  name!: string;
  fi!: string;
  info_url!: string;
  placeId: any;
  intro!: string;
  images!: string;
  tags!: string;
  

  @ViewChild('templateBottomSheet') TemplateBottomSheet!: TemplateRef<any>;

  constructor(private bottomSheet: MatBottomSheet, 
   private markerService: MarkerService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  //this.getPlace();
  }
  getPlaces(): void {
    this.markerService.getPlaces().subscribe((res: Places) => {
      this.places.push(res);
    });
  }
  
  openTemplateSheetMenu() {
    this.bottomSheet.open(this.TemplateBottomSheet);
  }

  closeTemplateSheetMenu() {
    this.bottomSheet.dismiss();
  }

  getPlace(): void {
    this.route.paramMap.pipe(switchMap(params => {
      this.placeId = params.get('id');

      return this.markerService.getPlace(this.placeId)
    })
    ).subscribe(data => {
      if (data.id == this.placeId) {

        this.places = data;
        console.log(this.places);
      }

     
    })
  }
}
