import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpListPostsComponent } from './wp-list-posts.component';

describe('WpListPostsComponent', () => {
  let component: WpListPostsComponent;
  let fixture: ComponentFixture<WpListPostsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [WpListPostsComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WpListPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
