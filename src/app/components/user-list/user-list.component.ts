import { Component, OnInit, Input } from '@angular/core';
import { WpApiUsers } from 'wp-api-angular';
import { Headers } from '@angular/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users = [];
  @Input() token: string;

  constructor(
    private wpApiUsers: WpApiUsers
  ) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    let headers: Headers = new Headers({
    'Authorization': 'Bearer ' + this.token
    });

    this.wpApiUsers.getList({headers: headers}).toPromise().then(res => {
      let json: any = res.json();
      this.users = json;
    })
  }

}
