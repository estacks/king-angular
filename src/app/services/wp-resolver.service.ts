import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { WpService } from './wp.service';

@Injectable()
export class WpResolver implements Resolve<any> {
  private dataCache: any = {};

  constructor(private wp: WpService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let url: string;
    let params = {};
    let paramMap: any = {};
    let queryParamMap: any = {};
    let setParams: any = {};
    let validator = function(response) {
      return !!response;
    };

    //Map data inputs from the router to the resolver
    if (route.data['paramMap']) paramMap = route.data['paramMap'];
    if (route.data['queryParamMap'])
      queryParamMap = route.data['queryParamMap'];
    if (route.data['setParams']) setParams = route.data['setParams'];
    if (route.data['validator']) validator = route.data['validator'];
    if (route.data['url']) url = route.data['url'];

    let cache: boolean = route.data['cache'] ? true : false;

    //Get any Angular route parameters specified
    Object.keys(paramMap).forEach(key => {
      let value = route.paramMap.get(key);
      if (value) params[paramMap[key]] = value;
    });

    Object.keys(queryParamMap).forEach(key => {
      let value = route.queryParamMap.get(key);
      if (value) params[queryParamMap[key]] = value;
    });

    //Assign any directly set parameters
    params = Object.assign(params, setParams);

    let returnObserver;

    //console.log('Parameters', params, route.paramMap.keys, route.queryParamMap.keys);

    let identifier: string = url + JSON.stringify(params);
    if (cache && this.dataCache[identifier]) {
      returnObserver = Observable.create(observer => {
        observer.next(this.dataCache[identifier]);
        observer.complete();
      });
    } else {
      returnObserver = this.wp.get(url, {
        params: params
      });
    }

    return returnObserver.pipe(
      take(1),
      map(response => {
        //console.log('Response', response);
        if (validator(response)) {
          if (cache) this.dataCache[identifier] = response;
          return response;
        } else {
          console.log('Page Not Found', response, route.data); // Page not found
          this.router.navigate(['/not-found']);
          return null;
        }
      })
    );
  }

  createParamString(queryParamMap) {}
}
