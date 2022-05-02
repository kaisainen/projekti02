import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HostListener } from '@angular/core';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { ListComponent } from './list/list.component';
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
  filter = "";
  Filter = "";
  @Output() notifyParent: EventEmitter<Object> = new EventEmitter();
  constructor(private list : ListComponent) {}

  sendNotification(filter:any) {
    console.log(filter +" has been sent to list component")
      this.notifyParent.emit(filter);
  }
  ngOnInit(): void {
    this.getScreenSize();
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
}
