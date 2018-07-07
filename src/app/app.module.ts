import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaSettings,
  RecaptchaLoaderService,
  RecaptchaModule
} from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { httpInterceptorProviders } from './http-interceptors';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

const recaptchaSettings: RecaptchaSettings = {
  siteKey: '6LeZ2WIUAAAAAKgvioAJEOl5gxwGMP8vQitPSVz-'
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ScrollToModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    RecaptchaModule.forRoot(),
    AppRoutingModule
  ],
  exports: [FormsModule],
  providers: [
    httpInterceptorProviders,
    Title,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: recaptchaSettings
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
