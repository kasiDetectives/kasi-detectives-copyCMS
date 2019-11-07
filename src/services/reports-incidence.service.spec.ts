import { TestBed } from '@angular/core/testing';

import { ReportsIncidenceService } from './reports-incidence.service';

describe('ReportsIncidenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportsIncidenceService = TestBed.get(ReportsIncidenceService);
    expect(service).toBeTruthy();
  });
});
