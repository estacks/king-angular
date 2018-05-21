import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wp-post',
  templateUrl: './wp-post.component.html',
  styleUrls: ['./wp-post.component.scss']
})
export class WpPostComponent implements OnInit {
  post: string;
  reply = {
    name: '',
    email: '',
    website: '',
    body: ''
  };

  constructor(public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data: { posts: Array<any> }) => {
      this.post = data.posts[0];
    });
  }
}
