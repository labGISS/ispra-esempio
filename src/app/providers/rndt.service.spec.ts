import { TestBed } from '@angular/core/testing';

import { RNDTService } from './rndt.service';

describe('RNDTService', () => {
  let service: RNDTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RNDTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
