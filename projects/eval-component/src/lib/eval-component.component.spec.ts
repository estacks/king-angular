import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalComponentComponent } from './eval-component.component';

describe('EvalComponentComponent', () => {
  let component: EvalComponentComponent;
  let fixture: ComponentFixture<EvalComponentComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [EvalComponentComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
