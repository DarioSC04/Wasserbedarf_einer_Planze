import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatenbankSeitePage } from './datenbank-seite.page';

describe('DatenbankSeitePage', () => {
  let component: DatenbankSeitePage;
  let fixture: ComponentFixture<DatenbankSeitePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DatenbankSeitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
