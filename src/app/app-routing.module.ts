import { NgModule } from '@angular/core';
import { MapComponent } from './map/map.component';
import { RouterModule, Routes } from '@angular/router';
import { PlaceDetailComponent } from './place-detail/place-detail.component';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';

const routes: Routes = [
  
  { path: 'map', component: MapComponent },
  { path: 'place-detail/:id', component: PlaceDetailComponent},
 ];

@NgModule({
  
  imports: [ CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
