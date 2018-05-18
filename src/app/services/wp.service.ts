import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WpService {
  root: string = environment.url + 'wp/v2/';

  constructor(
    private http: HttpClient
  ) {
  }

  get(url: string, options?) {
    return this.http.get(this.root + url, options);
  }
}
