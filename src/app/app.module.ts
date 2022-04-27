import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FilterComponent } from './filter/filter.component';
import { FooterComponent } from './footer/footer.component';
import { ListComponent } from './list/list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MapComponent } from './map/map.component';
import { MarkerService } from './marker.service';
import { AppRoutingModule } from './app-routing.module';
import { PlaceDetailComponent } from './place-detail/place-detail.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilterComponent,
    FooterComponent,
    ListComponent,
    MapComponent,
    PlaceDetailComponent
  ],
  imports: [BrowserModule, NgbModule, FontAwesomeModule, HttpClientModule, AppRoutingModule, MatBottomSheetModule, BrowserAnimationsModule, MatButtonModule

  ],
  providers: [MarkerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
