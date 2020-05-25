import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueFinishComponent } from './league-finish.component';

describe('LeagueFinishComponent', () => {
  let component: LeagueFinishComponent;
  let fixture: ComponentFixture<LeagueFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
