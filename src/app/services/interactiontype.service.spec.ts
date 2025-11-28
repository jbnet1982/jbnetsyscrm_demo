import { TestBed } from '@angular/core/testing';

import { InteractiontypeService } from './interactiontype.service';

describe('InteractiontypeService', () => {
  let service: InteractiontypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteractiontypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
