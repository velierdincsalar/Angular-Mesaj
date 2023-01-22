/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MytoastService } from './mytoast.service';

describe('Service: Mytoast', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MytoastService]
    });
  });

  it('should ...', inject([MytoastService], (service: MytoastService) => {
    expect(service).toBeTruthy();
  }));
});
