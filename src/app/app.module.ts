import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WpApiModule, WpApiLoader, WpApiStaticLoader } from 'wp-api-angular';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { environment } from '../environments/environment';
import { UserListComponent } from './components/user-list/user-list.component';

export function WpApiLoaderFactory(http: Http) {
  return new WpApiStaticLoader(http, environment.url + '/wp-json/', /* namespace is optional, default: '/wp/v2' */);
}

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    WpApiModule.forRoot({
      provide: WpApiLoader,
      useFactory: (WpApiLoaderFactory),
      deps: [Http]
    }),
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
