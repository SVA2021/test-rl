import { TestBed } from '@angular/core/testing';

import { UsersApiService } from './users-api.service';
import { provideHttpClient } from '@angular/common/http';

describe('UsersApiService', () => {
  let service: UsersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(UsersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
