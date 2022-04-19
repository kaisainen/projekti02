import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faMap } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'projekti02';
  shownMap = false;
  shownList = true;
  showTop = true;
  screenHeight: any;
  screenWidth: any;
  desktop = false;
  faList = faList;
  faMap = faMap;

  constructor() {}

  ngOnInit(): void {
    this.getScreenSize();
  }

  showMap() {
    this.shownMap = true;
    this.shownList = false;
    console.log(this.shownMap);
  }
  showList() {
    this.shownList = true;
    this.shownMap = false;
    console.log(this.shownMap);
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 429) {
      this.desktop = true;
      this.shownMap = false;
      this.shownList = true;
      this.showTop = false;
    } else {
      this.desktop = false;
    }
  }
}
