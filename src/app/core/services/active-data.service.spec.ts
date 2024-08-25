import { TestBed } from '@angular/core/testing';

import { ActiveDataService } from './active-data.service';

describe('ActiveDataService', () => {
  let service: ActiveDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
