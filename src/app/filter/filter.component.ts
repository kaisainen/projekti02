import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { faList, faMap } from '@fortawesome/free-solid-svg-icons';
import { HostListener } from '@angular/core';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  // show map or list
  shownMap = false;
  shownList = true;
  showTop = true;
  screenHeight: any;
  screenWidth: any;
  desktop = false;
  faList = faList;
  faMap = faMap;
  // filters related variables
  filters = ['places', 'activities', 'events'];
  selectedMainFilter = 'places';

  constructor() {}

  // SETS THE MAIN FILTER AND APPROPRIATE FILTER SPECIFIC TAGS
  setMainFilter(filter: any) {
    if (filter === 'places') {
      this.selectedMainFilter = 'places';
    } else if (filter === 'activities') {
      this.selectedMainFilter = 'activities';
    } else {
      this.selectedMainFilter = 'events';
    }
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
    if (this.screenWidth > 440) {
      this.desktop = true;
      this.shownMap = false;
      this.shownList = true;
      this.showTop = false;
    } else {
      this.desktop = false;
    }
  }

  ngOnInit(): void {
    this.getScreenSize();
  }
}
