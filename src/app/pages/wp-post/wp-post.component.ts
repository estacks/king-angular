import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeadService } from 'src/app/services/head.service';
import * as ScrollMagic from 'scrollmagic';

@Component({
  selector: 'app-wp-post',
  templateUrl: './wp-post.component.html',
  styleUrls: ['./wp-post.component.scss']
})
export class WpPostComponent implements OnInit, OnDestroy {
  post: any;
  metaTags: Array<any> = [];
  reply = {
    name: '',
    email: '',
    website: '',
    body: ''
  };

  constructor(
    public route: ActivatedRoute,
    private zone: NgZone,
    private head: HeadService
  ) {}

  ngOnInit() {
    console.log('ScrollMagic', ScrollMagic);
    this.route.data.subscribe((data: { posts: Array<any> }) => {
      this.post = data.posts[0];

      //Set the post page's title for SEO
      this.head.setTitle(this.post.title.rendered);

      this.constructMetaTags();

      console.debug('(wp-post-component.ts) => Loaded Post', this.post);
    });
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.destroyMetaTags();
  }

  constructMetaTags(): void {
    if (!this.post || this.post == null) return;

    this.metaTags = [
      { name: 'og:type', content: 'article' },
      { name: 'og:url', content: window.location.href },
      { name: 'og:title', content: this.post.title.rendered },
      { name: 'og:description', content: this.post.excerpt.rendered },
      { name: 'twitter:text:title', content: this.post.title.rendered },
      { name: 'twitter:card', content: 'summary' },
      { name: 'article:published_time', content: this.post.date_gmt },
      { name: 'article:modified_time', content: this.post.modified_gmt }
    ];

    //Clean up any currently existing meta tags with these properties
    this.destroyMetaTags();

    //Set the article's proper meta tags for SEO
    this.head.meta.addTags(this.metaTags);
  }

  destroyMetaTags(): void {
    this.metaTags.forEach(metaTag => {
      this.head.meta.removeTag(`name='${metaTag.name}'`);
    });
  }
}
