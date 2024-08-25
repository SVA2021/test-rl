import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { provideHttpClient } from "@angular/common/http";
import { provideStore } from "@ngrx/store";

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComponent],
      providers: [provideHttpClient(), provideStore()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
