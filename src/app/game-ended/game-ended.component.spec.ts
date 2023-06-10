import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameEndedComponent } from './game-ended.component';

describe('GameEndedComponent', () => {
  let component: GameEndedComponent;
  let fixture: ComponentFixture<GameEndedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameEndedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameEndedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
