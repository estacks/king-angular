import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import * as Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit {
  pageText: string;
  h1text: any;
  h2text: any;

  context = {
    test: ['One', 'Two', 'Butt']
  };

  constructor(private route: ActivatedRoute, private title: Title) {}

  ngOnInit() {
    this.title.setTitle('Welcome');
    this.route.data.subscribe((data: { pages: Array<any> }) => {
      this.pageText = data.pages[0].content.rendered;
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
      showCursor: false
    });
  }
}
