import { TestBed } from '@angular/core/testing';

import { PygeoapiService } from './pygeoapi.service';

describe('PygeoapiService', () => {
  let service: PygeoapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PygeoapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
