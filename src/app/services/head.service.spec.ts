import { TestBed, inject } from '@angular/core/testing';

import { HeadService } from './head.service';

describe('HeadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeadService]
    });
  });

  it('should be created', inject([HeadService], (service: HeadService) => {
    expect(service).toBeTruthy();
  }));
});
