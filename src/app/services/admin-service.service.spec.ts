/// <reference types="jasmine" />
import { TestBed } from '@angular/core/testing';

import { ProjectVisitsService } from './admin-service.service';

describe('ProjectVisitsService', () => {
  let service: ProjectVisitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectVisitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
