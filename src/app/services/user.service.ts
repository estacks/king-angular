import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '@src/environments/environment';

import { Observable, BehaviorSubject } from 'rxjs';

export interface LoginOptions {
  username: string,
  password: string
};

export interface UserData {
  token: string,
  user_display_name: string,
  user_email: string,
  user_nicename: string
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _loggedIn: boolean = false;
  private _data: BehaviorSubject<UserData> = new BehaviorSubject(undefined);
  public readonly data: Observable<UserData> = this._data.asObservable();



  constructor(
    private http: HttpClient
  ) {
    this.validateToken();
  }

  login(options: LoginOptions) {
    console.log('UserService.login', options);

    return new Promise((resolve, reject) => {
        this.http.post(environment.url + 'jwt-auth/v1/token', {
          username: options.username,
          password: options.password
        }).subscribe((data: UserData) => {
          console.log('success');
          if (data) {
            this.storeUserData(data);

            resolve(data);
          }
          else reject(data);
        }, error => {
          console.log('error');
          reject(error);
        });
    });
  }

  public get loggedIn() {
    return this._loggedIn;
  }

  public get headers() {
    let data = this.getData();
    let headers: any = {};
    console.log('headers', data);


    if (data.token) {
      headers['Authorization'] = 'Bearer ' + data.token;
    }

    return headers;
  }

  getData() {
    return this._data.getValue();
  }

  private storeUserData(data: UserData): void {
    if (!data['token']) throw new Error('No token provided.');

    localStorage.setItem('auth', JSON.stringify(data));
    this.setUserData(data);
  }

  private setUserData(data: UserData): void {
    this._data.next(data);
    this._loggedIn = true;
  }

  logout() {
    this._loggedIn = false;
    this._data.next(undefined);
    localStorage.removeItem('auth');
  }

  validateToken() {
    let data: UserData = JSON.parse(localStorage.getItem('auth'));
    if (!data) return false;
    else if (!data.token || !data.user_display_name || !data.user_email || !data.user_nicename) return this.logout();

    let headers = new HttpHeaders({
      'Authorization': 'Bearer '+data.token
    });

    this.http.post(environment.url + 'jwt-auth/v1/token/validate', {}, {headers: headers}).subscribe((res: HttpResponse<any>) => {
      if (res && res['code'] == 'jwt_auth_valid_token') console.debug('UserService => Auth token valid');
      this.setUserData(data);
    }, (error: HttpErrorResponse) => {
      console.debug('UserService => Auth token invalid', error);

      if (error && error.error && (error.error.code == 'jwt_auth_failed' || error.error.code == 'jwt_auth_invalid_token'))
        this.logout();
    });
  }

}
