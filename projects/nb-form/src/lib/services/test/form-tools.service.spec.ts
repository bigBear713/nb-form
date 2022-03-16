import { TestBed, inject } from '@angular/core/testing';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { NbAbstractControl } from '../../models';
import { NbFormTestingModule } from '../../testing';
import { NbFormToolsService } from '../form-tools.service';

describe('Service: FormTools', () => {
  let service: NbFormToolsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NbFormTestingModule]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(NbFormToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#doFormArrayFn()', () => {
    const fnObj = {
      doFn: (item: NbAbstractControl) => { }
    };
    spyOn(fnObj, 'doFn').and.callThrough();

    const control = new FormControl();
    const form = new FormArray([control]);
    service.doFormArrayFn(form, fnObj.doFn);

    expect(fnObj.doFn).toHaveBeenCalledTimes(form.length);
    expect(fnObj.doFn).toHaveBeenCalledWith(control);
  });

  it('#doFormGroupFn()', () => {
    const fnObj = {
      doFn: (item: NbAbstractControl) => { }
    };
    spyOn(fnObj, 'doFn').and.callThrough();

    const control = new FormControl();
    const form = new FormGroup({
      control,
    });
    service.doFormGroupFn(form, fnObj.doFn);

    expect(fnObj.doFn).toHaveBeenCalledTimes(Object.keys(form.controls).length);
    expect(fnObj.doFn).toHaveBeenCalledWith(control);
  });


});
