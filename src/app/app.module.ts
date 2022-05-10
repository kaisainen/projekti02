import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FilterComponent } from './filter/filter.component';
import { FooterComponent } from './footer/footer.component';
import { ListComponent } from './filter/list/list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MapComponent } from './filter/map/map.component';
import { AppRoutingModule } from './app-routing.module';
import { PlaceDetailComponent } from './place-detail/place-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KilometerToMeterPipe } from './kilometer-to-meter.pipe';
import { WeatherComponent } from './weather/weather.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilterComponent,
    FooterComponent,
    ListComponent,
    MapComponent,
    PlaceDetailComponent,
    KilometerToMeterPipe,
    WeatherComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
