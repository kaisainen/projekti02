import { Component, OnInit, Input, Output } from '@angular/core';
import {
  faCaretDown,
  faCaretRight,
  faList,
  faMap,
} from '@fortawesome/free-solid-svg-icons';
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
  tags: string[] = [];
  placetags = [
    'cafe',
    'gym',
    'museum',
    'zoo',
    'restaurant',
    'park',
    'playground',
    'shop',
    'bakery',
  ];
  activitiestags = [
    'hiking',
    'camping',
    'forests',
    'guided service',
    'business',
  ];
  eventsTags = ['courses', 'games', 'youth', 'kids', 'book clubs'];
  filters = ['places', 'activities', 'events'];
  showTags = false;
  faCaretDown = faCaretDown;
  faCaretRight = faCaretRight;
  selectedTags: string[] = [];
  selectedTag = false;
  showFilters = false;
  @Input() selectedMainFilter = 'places';

  constructor() {}

  showFilterTags() {
    if (this.showFilters) {
      this.showFilters = !this.showFilters;
    }
    this.showTags = !this.showTags;
    // DEFAULT IS PLACE TAGS
    if (this.tags.length === 0) {
      this.tags = this.placetags;
    }
  }
  showMainFilters() {
    if (this.showTags) {
      this.showTags = !this.showTags;
    }
    this.showFilters = !this.showFilters;
  }

  // ADDS AND REMOVES A CLICKED FILTER TAG TO ARRAY TO LATER BE USED FOR FILTERING PLACES/ACTIVITIES/EVENTS
  addSelectedTag(tag: string): void {
    const thisTag = tag;
    if (!this.selectedTags.includes(thisTag)) {
      this.selectedTags.push(thisTag);
    } else if (this.selectedTags.includes(thisTag)) {
      const index = this.selectedTags.indexOf(thisTag);
      if (index > -1) {
        this.selectedTags.splice(index, 1);
      }
    }
  }

  // ADDS AND REMOVES YELLOW BACKGROUND TO SELECTED FILTER TAGS
  getYellowClass(tag: string) {
    if (this.selectedTags.includes(tag)) {
      return 'selectedtag';
    }
    return '';
  }

  // SETS THE MAIN FILTER AND APPROPRIATE FILTER SPECIFIC TAGS
  setMainFilter(filter: any) {
    if (this.selectedTags.length != 0) {
      this.selectedTags = [];
    }
    if (filter === 'places') {
      this.selectedMainFilter = 'places';
      this.tags = this.placetags;
    } else if (filter === 'activities') {
      this.selectedMainFilter = 'activities';
      this.tags = this.activitiestags;
    } else {
      this.selectedMainFilter = 'events';
      this.tags = this.eventsTags;
    }
    this.showFilters = !this.showFilters;
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
    if (this.screenWidth > 429) {
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
