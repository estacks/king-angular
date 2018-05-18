import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { WpService } from 'src/app/services/wp.service';

@Component({
  selector: 'app-wp-page',
  templateUrl: './wp-page.component.html',
  styleUrls: ['./wp-page.component.scss']
})
export class WpPageComponent implements OnInit {
  slug: string;
  page: string;

  constructor(
    private route: ActivatedRoute,
    private wp: WpService
  ) {
  }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug');

    this.getPage(this.slug);
  }

  getPage(slug) {
    this.wp.get('pages?_embed&slug='+slug).subscribe((res) => {
      if (res && res[0]) this.page = res[0];

      console.log('Page Data', res[0]);
    })
  }

}
