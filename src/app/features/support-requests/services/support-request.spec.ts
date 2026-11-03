import { TestBed } from '@angular/core/testing';

import { SupportRequest } from './support-request';

describe('SupportRequest', () => {
  let service: SupportRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportRequest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
