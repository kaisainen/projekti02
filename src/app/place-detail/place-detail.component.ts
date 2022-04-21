import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons';
import { switchMap } from 'rxjs/operators';
import { Places } from '../list/places';
import { MarkerService } from '../marker.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit {
  places: Places[] = [];

  placeId: any;
  faCheck = faCheck;
  faMinus = faMinus;
  newImageString: string = '';
  link: string = '';

  constructor(private route: ActivatedRoute, 
    private markerService: MarkerService) { }

  ngOnInit(): void {
   this.getPlace();
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

  changeImg(event: any) {
    this.newImageString = event.target.getAttribute('src');
    document.getElementById('view-img')?.setAttribute('src', this.newImageString);
  }
}
