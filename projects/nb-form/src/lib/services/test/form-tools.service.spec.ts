/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FormToolsService } from '../form-tools.service';

describe('Service: FormTools', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormToolsService]
    });
  });

  it('should ...', inject([FormToolsService], (service: FormToolsService) => {
    expect(service).toBeTruthy();
  }));
});
