import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WpService {
  root: string = environment.url + 'wp/v2/';
  private settings: Subject<any> = new Subject();
  private state: BehaviorSubject<any> = new BehaviorSubject({
    poop: 'balls'
  });

  constructor(private http: HttpClient) {
    this.get('settings').subscribe(
      res => {
        this.settings.next(res);
      },
      () => {}
    );
  }

  get(url: string, options?) {
    return this.http.get(this.root + url, options);
  }

  getStore(stateParam: string) {
    return this.state.asObservable().pipe(map(state => state[stateParam]));
  }

  setStore(stateParam: string, value: any) {
    let curVal = this.state.getValue();

    curVal[stateParam] = value;

    this.state.next(curVal);
  }
}
