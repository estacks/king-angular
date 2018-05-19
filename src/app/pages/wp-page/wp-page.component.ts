import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wp-page',
  templateUrl: './wp-page.component.html',
  styleUrls: ['./wp-page.component.scss']
})
export class WpPageComponent implements OnInit {
  page: string;

  constructor(public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data: { pages: Array<any> }) => {
      this.page = data.pages[0];
    });
  }
}
