import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(public route: ActivatedRoute, private zone: NgZone) {}

  ngOnInit() {
    this.route.data.subscribe((data: { posts: Array<any> }) => {
      this.zone.run(() => {
        this.post = data.posts[0];
      });

      console.debug('(wp-post-component.ts) => Loaded Post', this.post);
    });
  }
}
