import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'filter',
  template: `
    <div class="grid-container">
      <div>PLACES</div>
      <div (click)="showFilterTags()">FILTERS</div>
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

  constructor() {}

  showFilterTags() {
    this.showTags = !this.showTags;
  }

  ngOnInit(): void {}
}
