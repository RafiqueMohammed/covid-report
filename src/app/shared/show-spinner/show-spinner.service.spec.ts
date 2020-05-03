import { TestBed } from '@angular/core/testing';

import { ShowSpinnerService } from './show-spinner.service';

describe('ShowSpinnerService', () => {
  let service: ShowSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowSpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
