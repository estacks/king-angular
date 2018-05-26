import {
  Component,
  OnInit,
  AfterViewInit,
  NgZone,
  ChangeDetectorRef
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
  UrlSegment,
  ResolveEnd,
  NavigationEnd
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { WpService } from 'src/app/services/wp.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  isCollapsed: boolean = true;
  isTransparent: boolean = false;
  navClass: string = 'navbar navbar-expand-lg navbar-dark indigo fixed-top scrolling-navbar';

  constructor(
    private router: Router,
    private wp: WpService,
    private zone: NgZone,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.wp.getStore('TransparentHeader').subscribe(val => {
      console.log('TransparencyHeader', val);
      if (val === true) {
        this.navClass = this.cleanNavClass(this.navClass) + ' transparent';
        this.cd.detectChanges();
      } else {
        this.navClass = this.cleanNavClass(this.navClass);
        this.cd.detectChanges();
      }
    });
  }

  cleanNavClass(inputClasses: string) {
    return inputClasses
      .split(' ')
      .filter(cl => cl !== 'transparent')
      .join(' ');
  }

  checkHeader() {}
}
