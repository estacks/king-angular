import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpPageComponent } from './wp-page.component';

describe('WpPageComponent', () => {
  let component: WpPageComponent;
  let fixture: ComponentFixture<WpPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
