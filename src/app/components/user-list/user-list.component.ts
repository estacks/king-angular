import { Component, OnInit, Input } from '@angular/core';
import { Headers } from '@angular/http';

import { WpService } from 'src/app/services/wp.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users = [];

  constructor(
    private wp: WpService,
    private user: UserService
  ) { }

  ngOnInit() {
    this.user.onLoggedIn.subscribe((data) => {
      this.getUserList();
    });
  }

  getUserList() {
    console.log('Get User', this.user.getData(), this.user.headers);

    this.wp.get('users').subscribe((res:any) => {
      if (res && res.length > 0) this.users = res;
    })
  }

}
