import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { UserService, UserData } from 'src/app/services/user.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  userData = {
    username: '',
    password: ''
  };
  @Input() token;
  @Output() tokenChange = new EventEmitter<string>();

  error: string;

  constructor(private http: HttpClient, public user: UserService) {}

  ngOnInit() {
    let userData = this.user.getData();
    console.log('Token', userData);
    if (userData) {
      this.token = userData.token;
      console.log('Token', this.token);
    }
  }

  auth() {
    this.error = '';

    this.user.login(this.userData).then(
      (res: UserData) => {
        console.log('User Logged in', res.token);
        this.token = res.token;
      },
      err => {
        console.log('User Not Logged In', err);
        this.error = err.error.message;
      }
    );
  }

  logout() {
    return this.user.logout();
  }
}
