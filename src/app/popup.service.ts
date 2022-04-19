import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  makePlacesPopup(data: any): string { 
    return `` +
    `<div> ${ data.name.fi }</div>` 
  //  `<div> ${ data.address.street_address }</div>`
  }
  makeCurrentLocationPopup(): string {
  return  `` +
  `<div>Olen tässä</div>`  
  }

}
