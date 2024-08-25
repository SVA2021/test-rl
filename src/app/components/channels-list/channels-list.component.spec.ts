import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsListComponent } from './channels-list.component';
import { provideStore } from "@ngrx/store";
import { provideHttpClient } from "@angular/common/http";

describe('ChannelsListComponent', () => {
  let component: ChannelsListComponent;
  let fixture: ComponentFixture<ChannelsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelsListComponent],
      providers: [provideStore(), provideHttpClient()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
