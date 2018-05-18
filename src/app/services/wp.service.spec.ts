import { TestBed, inject } from '@angular/core/testing';

import { WpService } from './wp.service';

describe('WpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WpService]
    });
  });

  it('should be created', inject([WpService], (service: WpService) => {
    expect(service).toBeTruthy();
  }));
});
