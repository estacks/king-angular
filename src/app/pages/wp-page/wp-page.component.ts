import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeadService } from 'src/app/services/head.service';
import * as ScrollMagic from 'scrollmagic';

@Component({
  selector: 'app-wp-page',
  templateUrl: './wp-page.component.html',
  styleUrls: ['./wp-page.component.scss']
})
export class WpPageComponent implements OnInit, OnDestroy {
  page: any;
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
    this.route.data.subscribe((data: { pages: Array<any> }) => {
      this.page = data.pages[0];

      //Set the page page's title for SEO
      this.head.setTitle(this.page.title.rendered);

      this.constructMetaTags();

      console.log('ScrollMagic', ScrollMagic);

      console.debug('(wp-page-component.ts) => Loaded Page', this.page);
    });
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.destroyMetaTags();
  }

  constructMetaTags(): void {
    if (!this.page || this.page == null) return;

    this.metaTags = [
      { name: 'og:type', content: 'article' },
      { name: 'og:url', content: window.location.href },
      { name: 'og:title', content: this.page.title.rendered },
      { name: 'og:description', content: this.page.excerpt.rendered },
      { name: 'twitter:text:title', content: this.page.title.rendered },
      { name: 'twitter:card', content: 'summary' },
      { name: 'article:published_time', content: this.page.date_gmt },
      { name: 'article:modified_time', content: this.page.modified_gmt }
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
