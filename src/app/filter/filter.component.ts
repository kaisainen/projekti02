import { Component, OnInit } from '@angular/core';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'filter',
  template: `
    <div class="grid-container">
      <button class="filter-title">PLACES</button>
      <button class="filter-title" (click)="showFilterTags()">
        FILTERS
        <fa-icon *ngIf="!showTags" [icon]="faCaretRight"></fa-icon>
        <fa-icon *ngIf="showTags" [icon]="faCaretDown"></fa-icon>
      </button>
    </div>
    <div *ngIf="showTags" class="tag-container">
      <p *ngFor="let tag of tags">
        <span class="tag">#{{ tag }}</span>
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

  constructor() {}

  showFilterTags() {
    this.showTags = !this.showTags;
  }

  ngOnInit(): void {}
}
