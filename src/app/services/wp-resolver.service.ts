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

/**
 * WpResolver - Angular route Resolver for retrieving data from the WP REST API
 */

@Injectable()
export class WpResolver implements Resolve<any> {
  private dataCache: any = {}; //Cache for reloading pages one has been to

  constructor(private wp: WpService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    /* The parameters object that will be used in the HTTP request */
    let params: any = {};
    /* The endpoint's URL fragment */
    let url: string = route.data['url'] || undefined;
    /* Maps param keys from the router to their values */
    let paramMap: any = route.data['paramMap'] || {};
    /* Maps query param keys to their values */
    let queryParamMap: any = route.data['queryParamMap'] || {};
    /* Directly sets specified params to WP */
    let setParams: any = route.data['setParams'] || {};
    /* Specified validator function to make sure the response is correct */
    let validator =
      route.data['validator'] ||
      function(res) {
        return !!res;
      };

    /*
     * The cache = true argument will store a copy of the route's
     *  data for future navigation
     **/
    let cache: boolean = route.data['cache'] ? true : false;

    /* Maps paramMap data input by setting the param for Wordpress to the actual
     *  route params from Angular
     **/
    Object.keys(paramMap).forEach(key => {
      let value = route.paramMap.get(key);
      if (value) params[paramMap[key]] = value;
    });

    /* Same deal but just for queryParams */
    Object.keys(queryParamMap).forEach(key => {
      let value = route.queryParamMap.get(key);
      if (value) params[queryParamMap[key]] = value;
    });

    //Assign any directly setParams parameters
    params = Object.assign(params, setParams);

    let returnObserver: Observable<any>;

    //The unique identifier for each route and params
    let identifier: string = url + JSON.stringify(params);

    //If a cached data object exists for the identifier return it
    if (cache && this.dataCache[identifier]) {
      returnObserver = Observable.create(observer => {
        observer.next(this.dataCache[identifier]);
        observer.complete();
      });
      //Retrieve the data from the REST API
    } else {
      returnObserver = this.wp.get(url, {
        params: params
      });
    }

    //Return the first response from either the data cache or HTTP client
    return returnObserver.pipe(
      take(1),
      map(response => {
        if (validator(response)) {
          //If set to cache, add to cache
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
