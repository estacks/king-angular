import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pageText: string;

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
}
