import { Component, OnInit } from '@angular/core';
import { WpService } from 'src/app/services/wp.service';

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
    private wp: WpService
  ) { }

  ngOnInit() {
    this.wp.get('pages?slug=angular-test').subscribe((res: any) => {
      console.log('Response', res);
      console.log('Page Body', res[0].content.rendered);

      this.pageText = res[0].content.rendered;
    })
  }

}
