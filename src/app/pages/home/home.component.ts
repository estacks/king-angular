import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = "Eric King's Site";
  pageText: string;


  context = {
    test: ['One', 'Two', 'Butt']
  };

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { pages: Array<any> }) => {
      this.pageText = data.pages[0].content.rendered;
    });
  }
}
