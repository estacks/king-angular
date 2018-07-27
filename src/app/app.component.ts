import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  token = null;

  constructor(private router: Router) {

  }

  ngOnInit() {
    //Scroll to top on transitions
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      window.scrollTo(0, 0);
    });
  }
}
