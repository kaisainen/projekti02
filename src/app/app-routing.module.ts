import { NgModule } from '@angular/core';
import { MapComponent } from './filter/map.component';
import { RouterModule, Routes } from '@angular/router';
import { PlaceDetailComponent } from './place-detail/place-detail.component';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';

const routes: Routes = [{ path: '', redirectTo: 'map', pathMatch: 'full' }];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
