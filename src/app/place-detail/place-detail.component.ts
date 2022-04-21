import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons';
import { MarkerService } from '../marker.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit {

  placeId: any;
  places: any;
  faCheck = faCheck;
  faMinus = faMinus;
  newImageString: string = '';
  link: string = '';

  constructor(private route: ActivatedRoute, 
    private markerService: MarkerService) { }

  ngOnInit(): void {
   // this.getPlace();
  }

  /*getPlace(): void {
    this.placeId = this.route.snapshot.params['id'];
    this.route.params.subscribe((params) => {
      this.placeId = params['id'];
    });
    this.markerService.getPlace(this.placeId).subscribe((data: any) => {
      this.places = data.id;
    })
    
  }*/


  changeImg(event: any) {
    this.newImageString = event.target.getAttribute('src');
    document.getElementById('view-img')?.setAttribute('src', this.newImageString);
  }
}
