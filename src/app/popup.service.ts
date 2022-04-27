import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { PlaceDetailComponent } from './place-detail/place-detail.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private resolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector) { }
    
  makePlacesPopup(data: any): any{
  let markerPopup: any = this.compilePopup(PlaceDetailComponent, (p: any) => {
    (p.instance.name = data.name.fi),
    (p.instance.address = data.location.address.street_address),
    (p.instance.postal_code = data.location.address.postal_code),
    (p.instance.locality = data.location.address.locality),
    (p.instance.info_url = data.info_url),
    (p.instance.intro = data.description.intro),
    (p.instance.images = data.description.images.url),
    (p.instance.tags = data.tags.name)
  });
  return markerPopup;
}
private compilePopup(component: any, onAttach: any): any {
const compFactory: any = this.resolver.resolveComponentFactory(component);
let compRef: any = compFactory.create(this.injector);

if (onAttach)
  onAttach(compRef);

this.applicationRef.attachView(compRef.hostView);
compRef.onDestroy(() => this.applicationRef.detachView(compRef.hostView));

let div = document.createElement('div');
div.appendChild(compRef.location.nativeElement);
return div;
}

  makeCurrentLocationPopup(): string {
  return  `` +
  `<div>Olen tässä</div>`  
  }

}
