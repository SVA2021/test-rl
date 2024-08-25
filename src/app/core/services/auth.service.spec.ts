import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be authenticated', () => {
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should be authenticated', () => {
    service.setUser({
      id: '123',
      username: 'test',
      password: 'test',
      is_online: true
    });
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should not be authenticated', () => {
    service.setUser(null);
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should not be authenticated', () => {
    service.setUser({
      id: '123',
      username: 'test',
      password: 'test',
      is_online: false
    });
    service.logout();
    expect(service.isAuthenticated()).toBe(false);
  });
});
