import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoSeitePage } from './info-seite.page';

describe('InfoSeitePage', () => {
  let component: InfoSeitePage;
  let fixture: ComponentFixture<InfoSeitePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSeitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
