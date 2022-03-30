import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterComponent } from './filter/filter.component';

import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,

    FilterComponent,

    FooterComponent

  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
