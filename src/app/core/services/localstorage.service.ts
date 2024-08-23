import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  get(key: string) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) || '') : null;
  }

  set(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }

  exists(key: string) {
    return (
      localStorage.getItem(key) !== null && localStorage.getItem(key) !== undefined && localStorage.getItem(key) !== ''
    );
  }
}
