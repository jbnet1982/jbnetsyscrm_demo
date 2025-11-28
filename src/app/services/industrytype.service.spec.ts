import { TestBed } from '@angular/core/testing';

import { IndustrytypeService } from './industrytype.service';

describe('IndustrytypeService', () => {
  let service: IndustrytypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndustrytypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
