import { Component, OnInit } from '@angular/core';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faMap } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css',],
})
export class ListComponent implements OnInit {
  faList = faList;
  faMap = faMap;
  list = [{name: 'LINNANMÄKI', location:'Tivollikuja 1'},
  {name: 'KULTTUURITALO', location:'Sturenkatu 4'},
  {name: 'TYÖVÄENASUNTOMUSEO', location:'Kirstinkuja 4'},
  {name: 'LENININ PUISTO', location:'Vesilinnankatu'},
  {name: 'CAFE BRAHE', location:'Läntinen Brahenkatu 6'},
];
  constructor() { }

  ngOnInit(): void {
  }

}
