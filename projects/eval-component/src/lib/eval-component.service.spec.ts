import { TestBed, inject } from '@angular/core/testing';

import { EvalComponentService } from './eval-component.service';

describe('EvalComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvalComponentService]
    });
  });

  it('should be created', inject([EvalComponentService], (service: EvalComponentService) => {
    expect(service).toBeTruthy();
  }));
});
