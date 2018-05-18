import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpPostComponent } from './wp-post.component';

describe('WpPostComponent', () => {
  let component: WpPostComponent;
  let fixture: ComponentFixture<WpPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
