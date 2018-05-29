import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) {}

  ngOnInit() {
    /**
     * This will set the title of any page navigated to if the 'title' attribute
     *  is specified in the particular route's data
     **/
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map(() => this.route),
        map(route => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe(data => this.title.setTitle(data['title']));
  }
}
