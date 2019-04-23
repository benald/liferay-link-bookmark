
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { APP_BASE_HREF } from '@angular/common';

// HttpClient module for RESTful API
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BookmarkComponent } from './bookmark/bookmark.component';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    BookmarkComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ButtonsModule.forRoot()
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue : '/' },
    {provide: 'APIURL', useValue: environment.apiUrl },
    {provide: 'ASSETURL', useValue: environment.assetUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
