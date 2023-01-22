/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FbservisService } from './fbservis.service';

describe('Service: Fbservis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FbservisService]
    });
  });

  it('should ...', inject([FbservisService], (service: FbservisService) => {
    expect(service).toBeTruthy();
  }));
});
