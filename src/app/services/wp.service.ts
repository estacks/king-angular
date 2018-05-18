import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WpService {
  root: string = environment.url + 'wp/v2/';
  settings: Subject<any> = new Subject();

  constructor(
    private http: HttpClient
  ) {
    this.get('settings').subscribe((res) => {
      this.settings.next(res);
    }, () => {});
  }

  get(url: string, options?) {
    return this.http.get(this.root + url, options);
  }
}
