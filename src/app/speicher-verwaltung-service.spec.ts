import { TestBed } from '@angular/core/testing';

import { SpeicherVerwaltungService } from './speicher-verwaltung-service';

describe('SpeicherVerwaltungService', () => {
  let service: SpeicherVerwaltungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeicherVerwaltungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
