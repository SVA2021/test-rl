import { TestBed } from '@angular/core/testing';

import { ChannelsApiService } from './channels-api.service';
import { provideHttpClient } from "@angular/common/http";

describe('ChannelsApiService', () => {
  let service: ChannelsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(ChannelsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
