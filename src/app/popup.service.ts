import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  makePlacesPopup(data: any): string { 
    return `` +
    `
    <h4><a  href="${'/place-detail/' + data.id }">${data.name.fi} </a></h4>

   
   ` 
  //  ` <div> ${ data.address.street_address }</div>`
  }
  makeCurrentLocationPopup(): string {
  return  `` +
  `<div>Olen tässä</div>`  
  }

}
