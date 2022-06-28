import { TestBed } from '@angular/core/testing';

import { FlyDataService } from './fly-data.service';

describe('FlyDataService', () => {
  let service: FlyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
