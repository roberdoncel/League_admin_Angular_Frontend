import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueStartComponent } from './league-start.component';

describe('LeagueStartComponent', () => {
  let component: LeagueStartComponent;
  let fixture: ComponentFixture<LeagueStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
