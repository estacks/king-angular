import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-wp-list-posts',
  templateUrl: './wp-list-posts.component.html',
  styleUrls: ['./wp-list-posts.component.scss']
})
export class WpListPostsComponent implements OnInit {
  posts: Array<any>;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { posts: Array<any> }) => {
      this.posts = data.posts;

      console.log('Posts', this.posts);
    })
  }

}
