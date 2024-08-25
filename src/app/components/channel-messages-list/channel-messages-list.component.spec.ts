import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelMessagesListComponent } from './channel-messages-list.component';
import { provideStore } from "@ngrx/store";
import { provideHttpClient } from "@angular/common/http";

describe('ChannelMessagesListComponent', () => {
  let component: ChannelMessagesListComponent;
  let fixture: ComponentFixture<ChannelMessagesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelMessagesListComponent],
      providers: [provideStore(), provideHttpClient()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelMessagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
