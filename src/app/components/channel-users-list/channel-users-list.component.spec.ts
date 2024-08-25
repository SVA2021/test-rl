import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelUsersListComponent } from './channel-users-list.component';

describe('ChannelUsersListComponent', () => {
  let component: ChannelUsersListComponent;
  let fixture: ComponentFixture<ChannelUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelUsersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
