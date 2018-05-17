import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { UserService } from '../services/user.service';


/**
 *  This HTTP interceptor will detect if the user currently has a token and attach that token to any JSON requests.
 *
 *  If the token is invalid, the user will be logged out client-side.
 */

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor (
    private user: UserService
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const auth = JSON.parse(localStorage.getItem('auth'));
    let response: HttpResponse<any>;
    let error: HttpErrorResponse;

    if (auth && auth.token) {
      console.log('SETTING TOKEN', auth.token);
      const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + auth.token)
    });

      return next.handle(authReq)
      .pipe(
        tap(
          res => response,
          err => err = error
        ),
        finalize(() => {
          if (error) console.log('INTERCEPTOR ERROR', error);
          if (error && error.error && (error.error.code == 'jwt_auth_invalid_token')) {
            this.user.logout();
          }
        })
      );
    }
    else return next.handle(req);
  }
}
