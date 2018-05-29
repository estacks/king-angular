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

/*
  WpService
  Abstracted service for retrieving data from the WP REST API using Angular's HttpClient

  Also contains methods for getting and setting a basic data store for the Wordpress site's state.
*/

@Injectable({
  providedIn: 'root'
})
export class WpService {
  root: string = environment.url + 'wp/v2/';
  private settings: Subject<any> = new Subject();
  private state: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private http: HttpClient) {
    this.get('settings').subscribe(
      res => {
        this.settings.next(res);
      },
      () => {}
    );
  }

  /**
   * get - Retrieves WP REST endpoint
   *
   * @param  {string} url: string description
   * @param  {object} options?    description
   * @return {Observable<ArrayBuffer>}             description
   */

  get(url: string, options?): Observable<ArrayBuffer> {
    let fullUrl = options && !!options.noRoot ? url : this.root + url;

    return this.http.get(fullUrl, options);
  }

  /**
   * getStore - Retrieves an arbitrary data store identified by stateKey
   *
   * @param {string} stateKey identifier for the data object to retrieve
   * @return {Observable<any>}
   */

  getStore(stateKey: string): Observable<any> {
    return this.state.asObservable().pipe(map(state => state[stateKey]));
  }

  /**
   * setStore - Sets a data store object specified by stateKey with value
   *
   * @param  {string} stateKey
   * @param  {any} value
   * @returns {boolean}
   */

  setStore(stateKey: string, value: any): boolean {
    let curVal = this.state.getValue();

    curVal[stateKey] = value;

    this.state.next(curVal);
    return true;
  }
}
