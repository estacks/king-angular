import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-wp-post',
  templateUrl: './wp-post.component.html',
  styleUrls: ['./wp-post.component.scss']
})
export class WpPostComponent implements OnInit {
  post: any;
  reply = {
    name: '',
    email: '',
    website: '',
    body: ''
  };
  importModules: Array<any>;

  constructor(public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { posts: Array<any> }) => {
      this.post = data.posts[0];

      console.debug('(wp-post-component.ts) => Loaded Post', this.post);
    });
  }
}
