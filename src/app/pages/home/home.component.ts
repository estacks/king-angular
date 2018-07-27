import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Typed from 'typed.js';

import { WpService } from 'src/app/services/wp.service';
import { HeadService } from 'src/app/services/head.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterContentInit {
  page: any;
  pageText: string;
  metaTags: Array<any>;
  h1text: any;
  h2text: any;

  context = {
    test: ['One', 'Two', 'Butt']
  };

  constructor(
    private route: ActivatedRoute,
    private wp: WpService,
    private head: HeadService
  ) {}

  ngOnInit() {
    this.wp.setStore('TransparentHeader', true);

    this.route.data.subscribe((data: { pages: Array<any> }) => {
      this.page = data.pages[0];
      this.pageText = this.page.content.rendered;

      this.constructMetaTags();
    });
  }

  ngAfterContentInit() {
    let title = new Typed('#main-title-display', {
      stringsElement: '#main-title-text',
      typeSpeed: 20,
      showCursor: false
    });

    var subtitle = new Typed('#sub-title-display', {
      stringsElement: '#sub-title-text',
      startDelay: 2000,
      typeSpeed: 20,
      showCursor: true,
      autoInsertCss: true
    });
  }

  ngOnDestroy() {
    this.wp.setStore('TransparentHeader', false);
    this.destroyMetaTags();
  }

  constructMetaTags(): void {
    if (!this.page || this.page == null) return;

    this.metaTags = [
      { name: 'og:type', content: 'website' },
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
