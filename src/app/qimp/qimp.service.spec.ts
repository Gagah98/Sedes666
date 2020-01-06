import { TestBed } from '@angular/core/testing';

import { QimpService } from './qimp.service';

describe('QimpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QimpService = TestBed.get(QimpService);
    expect(service).toBeTruthy();
  });
});
