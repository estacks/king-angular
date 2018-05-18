import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs';
import { map, take }              from 'rxjs/operators';

import { WpService }  from './wp.service';

@Injectable()
export class WpResolver implements Resolve<any> {
  url: string;  //The URL fragment to access in the JSON API
  paramMap: any = {}; //Maps Angular route parameters to WP query parameters, angular => wp
  queryParamMap: any = {};  //Maps queryParams to WP query params, angular => wp
  setParams: any = {};  //Directly assigns parameters to Wordpress query params, key => value
  validator = function(response) { return !!response };

  constructor(
    private wp: WpService,
    private router: Router
  ) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let params = {};

    //Map data inputs from the router to the resolver
    if (route.data['paramMap']) this.paramMap = route.data['paramMap'];
    if (route.data['queryParamMap']) this.queryParamMap = route.data['queryParamMap'];
    if (route.data['setParams']) this.setParams = route.data['setParams'];
    if (route.data['validator']) this.validator = route.data['validator'];
    if (route.data['url']) this.url = route.data['url'];

    //Get any Angular route parameters specified
    Object.keys(this.paramMap).forEach((key) => {
      let value = route.paramMap.get(key);
      if (value) params[this.paramMap[key]] = value;
    });

    Object.keys(this.queryParamMap).forEach((key) => {
      let value = route.queryParamMap.get(key);
      if (value) params[this.queryParamMap[key]] = value;
    })

    //Assign any directly set parameters
    params = Object.assign(params, this.setParams);

    //console.log('Parameters', params, route.paramMap.keys, route.queryParamMap.keys);

    return this.wp.get(this.url, {
      params: params
    }).pipe(
      take(1),
      map(response => {
        console.log('Response', response);
        if (this.validator(response)) {
          return response;
        } else {
          console.log('Page Not Found', response, route.data)// Page not found
          this.router.navigate(['/not-found']);
          return null;
        }
      })
    );
  }

  createParamString(queryParamMap)  {

  }
}
