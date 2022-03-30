import { Component, OnInit } from '@angular/core';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'filter',
  template: `
    <div class="grid-container">
      <button type="button" class="filter-title">PLACES</button>
      <button type="button" class="filter-title" (click)="showFilterTags()">
        FILTERS
        <fa-icon *ngIf="!showTags" [icon]="faCaretRight"></fa-icon>
        <fa-icon *ngIf="showTags" [icon]="faCaretDown"></fa-icon>
      </button>
    </div>
    <div *ngIf="showTags" class="tag-container">
      <p *ngFor="let tag of tags">
        <span
          (click)="addSelectedTag(tag)"
          [ngClass]="getYellowClass(tag)"
          class="tag"
          >#{{ tag }}</span
        >
      </p>
    </div>
  `,
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  tags = [
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
  showTags = false;
  faCaretDown = faCaretDown;
  faCaretRight = faCaretRight;
  selectedTags: string[] = [];
  selectedTag = false;

  constructor() {}

  showFilterTags() {
    this.showTags = !this.showTags;
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

  ngOnInit(): void {}
}
