import { TestBed } from '@angular/core/testing';

import { LocalstorageService } from './localstorage.service';

describe('LocalstorageService', () => {
  let service: LocalstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get value', () => {
    service.set('key', 'value');
    expect(service.get('key')).toBe('value');
  });

  it('should remove value', () => {
    service.set('key', 'value');
    service.remove('key');
    expect(service.get('key')).toBeNull();
  });

  it('should clear all values', () => {
    service.set('key1', 'value1');
    service.set('key2', 'value2');
    service.clear();
    expect(service.get('key1')).toBeNull();
    expect(service.get('key2')).toBeNull();
  });
});
