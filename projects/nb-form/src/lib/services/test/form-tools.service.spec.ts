import { TestBed } from '@angular/core/testing';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { NbAbstractControl } from '../../models';
import { NbFormTestingModule } from '../../testing';
import { NbFormToolsService } from '../form-tools.service';

describe('Service: FormTools', () => {
  let service: NbFormToolsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NbFormTestingModule],
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      doFn: (item: NbAbstractControl) => {},
    };
    spyOn(fnObj, 'doFn').and.callThrough();

    const control = new UntypedFormControl();
    const form = new UntypedFormArray([control]);
    service.doFormArrayFn(form, fnObj.doFn);

    expect(fnObj.doFn).toHaveBeenCalledTimes(form.length);
    expect(fnObj.doFn).toHaveBeenCalledWith(control);
  });

  it('#doFormGroupFn()', () => {
    const fnObj = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      doFn: (item: NbAbstractControl) => {},
    };
    spyOn(fnObj, 'doFn').and.callThrough();

    const control = new UntypedFormControl();
    const form = new UntypedFormGroup({
      control,
    });
    service.doFormGroupFn(form, fnObj.doFn);

    expect(fnObj.doFn).toHaveBeenCalledTimes(Object.keys(form.controls).length);
    expect(fnObj.doFn).toHaveBeenCalledWith(control);
  });
});
