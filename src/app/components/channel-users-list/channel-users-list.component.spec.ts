import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelUsersListComponent } from './channel-users-list.component';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';

describe('ChannelUsersListComponent', () => {
  let component: ChannelUsersListComponent;
  let fixture: ComponentFixture<ChannelUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelUsersListComponent],
      providers: [provideStore(), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChannelUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
