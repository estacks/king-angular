import { Component, OnInit, Input } from '@angular/core';
import { WpApiUsers } from 'wp-api-angular';
import { Headers } from '@angular/http';

import { UserService } from '@src/app/services/user.service';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users = [];
  @Input() token: string;

  constructor(
    private wpApiUsers: WpApiUsers,
    private user: UserService
  ) { }

  ngOnInit() {
    this.user.data.pipe(
      first(data => !!data)
    ).subscribe((data) => {
      this.getUserList();
    });
  }

  getUserList() {
    console.log('Get User', this.user.getData(), this.user.headers);

    this.wpApiUsers.getList({headers: this.user.headers}).toPromise().then(res => {
      let json: any = res.json();
      this.users = json;
    })
  }

}
