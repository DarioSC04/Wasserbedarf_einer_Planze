import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErgebnisSeitePage } from './ergebnis-seite.page';

describe('ErgebnisSeitePage', () => {
  let component: ErgebnisSeitePage;
  let fixture: ComponentFixture<ErgebnisSeitePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ErgebnisSeitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
