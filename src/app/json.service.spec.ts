import { TestBed } from '@angular/core/testing';

import { jsonService } from './json.service';

describe('JsonService', () => {
  let service: jsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(jsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
