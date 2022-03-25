import { TestBed } from '@angular/core/testing';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { NbFormTestingModule } from '../../testing';
import { NbFormValidators } from '../../validators';
import { NbFormToolsService } from '../form-tools.service';
import { NbFormService } from '../form.service';

describe('NbFormService', () => {
  let service: NbFormService;
  let formTools: NbFormToolsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NbFormTestingModule]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(NbFormService);
    formTools = TestBed.inject(NbFormToolsService);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  describe('#getValidatorsFromControlConfig()', () => {
    beforeEach(() => {
      spyOn(NbFormValidators, 'required').and.callThrough();
      spyOn(NbFormValidators, 'arrLength').and.callThrough();
      spyOn(NbFormValidators, 'fileSize').and.callThrough();
      spyOn(NbFormValidators, 'fileType').and.callThrough();
      spyOn(NbFormValidators, 'whitespace').and.callThrough();

      spyOn(Validators, 'max').and.callThrough();
      spyOn(Validators, 'min').and.callThrough();
      spyOn(Validators, 'maxLength').and.callThrough();
      spyOn(Validators, 'minLength').and.callThrough();
      spyOn(Validators, 'pattern').and.callThrough();
    });

    [
      {
        title: 'get all validators',
        params: {
          required: true,
          max: 10,
          min: 1,
          maxLength: 10,
          minLength: 1,
          arrMaxLength: 10,
          arrMinLength: 1,
          maxFileSize: 10,
          minFileSize: 1,
          fileType: ['text/plain'],
          pattern: /d+/,
          whitespace: true
        },
        expect: {
          validatorsLength: 12,
          callTimes: {
            required: 1,
            max: 1,
            min: 1,
            maxLength: 1,
            minLength: 1,
            arrLength: 2,
            fileSize: 2,
            fileType: 1,
            pattern: 1,
            whitespace: 1,
          }
        }
      },
      {
        title: 'the config value are all undefined',
        params: {
          required: undefined,
          max: undefined,
          min: undefined,
          maxLength: undefined,
          minLength: undefined,
          arrMaxLength: undefined,
          arrMinLength: undefined,
          maxFileSize: undefined,
          minFileSize: undefined,
          fileType: undefined,
          pattern: undefined,
          whitespace: undefined,
        },
        expect: {
          validatorsLength: 2,
          callTimes: {
            required: 1,
            max: 0,
            min: 0,
            maxLength: 0,
            minLength: 0,
            arrLength: 0,
            fileSize: 0,
            fileType: 0,
            pattern: 0,
            whitespace: 1,
          }
        }
      },
      {
        title: 'get empty validators',
        params: {},
        expect: {
          validatorsLength: 0,
          callTimes: {
            required: 0,
            max: 0,
            min: 0,
            maxLength: 0,
            minLength: 0,
            arrLength: 0,
            fileSize: 0,
            fileType: 0,
            pattern: 0,
            whitespace: 0,
          }
        }
      },
      {
        title: 'the config key is a special key',
        params: {
          repeatPwd: true
        },
        expect: {
          validatorsLength: 0,
          callTimes: {
            required: 0,
            max: 0,
            min: 0,
            maxLength: 0,
            minLength: 0,
            arrLength: 0,
            fileSize: 0,
            fileType: 0,
            pattern: 0,
            whitespace: 0,
          }
        }
      }
    ].forEach(item => {
      it(item.title, () => {
        const result = service.getValidatorsFromControlConfig(item.params);
        expect(result.length).toEqual(item.expect.validatorsLength);

        expect(NbFormValidators.required).toHaveBeenCalledTimes(item.expect.callTimes.required);
        expect(NbFormValidators.arrLength).toHaveBeenCalledTimes(item.expect.callTimes.arrLength);
        expect(NbFormValidators.fileSize).toHaveBeenCalledTimes(item.expect.callTimes.fileSize);
        expect(NbFormValidators.fileType).toHaveBeenCalledTimes(item.expect.callTimes.fileType);
        expect(NbFormValidators.whitespace).toHaveBeenCalledTimes(item.expect.callTimes.whitespace);
        expect(Validators.max).toHaveBeenCalledTimes(item.expect.callTimes.max);
        expect(Validators.min).toHaveBeenCalledTimes(item.expect.callTimes.min);
        expect(Validators.maxLength).toHaveBeenCalledTimes(item.expect.callTimes.maxLength);
        expect(Validators.minLength).toHaveBeenCalledTimes(item.expect.callTimes.minLength);
        expect(Validators.pattern).toHaveBeenCalledTimes(item.expect.callTimes.pattern);
      });
    });
  });

  describe('#markAllAsDirty() and #updateAllValueAndValidity()', () => {
    [
      {
        title: 'mark undefined as dirty with options',
        params: {
          target: undefined,
          opts: { onlySelf: false, emitEvent: true }
        },
        expectCallTimes: { doFormArrayFn: 0, doFormGroupFn: 0, }
      },
      {
        title: 'mark formControl as dirty with options',
        params: {
          target: new FormControl(),
          opts: { onlySelf: false, emitEvent: true }
        },
        expectCallTimes: { doFormArrayFn: 0, doFormGroupFn: 0, }
      },
      {
        title: 'mark formControl as dirty without options',
        params: {
          target: new FormControl(),
          opts: undefined
        },
        expectCallTimes: { doFormArrayFn: 0, doFormGroupFn: 0, }
      },
      {
        title: 'mark formArray as dirty with options',
        params: {
          target: new FormArray([new FormControl()]),
          opts: { onlySelf: false, emitEvent: true }
        },
        expectCallTimes: { doFormArrayFn: 1, doFormGroupFn: 0, }
      },
      {
        title: 'mark formArray as dirty without options',
        params: {
          target: new FormArray([new FormControl()]),
          opts: undefined
        },
        expectCallTimes: { doFormArrayFn: 1, doFormGroupFn: 0, }
      },
      {
        title: 'mark formGroup as dirty with options',
        params: {
          target: new FormGroup({ control: new FormControl() }),
          opts: { onlySelf: false, emitEvent: true }
        },
        expectCallTimes: { doFormArrayFn: 0, doFormGroupFn: 1, }
      },
      {
        title: 'mark formGroup as dirty without options',
        params: {
          target: new FormGroup({ control: new FormControl() }),
          opts: undefined
        },
        expectCallTimes: { doFormArrayFn: 0, doFormGroupFn: 1, }
      }
    ].forEach(item => {
      it(`#markAllAsDirty() - ${item.title}`, () => {
        spyOn(formTools, 'doFormArrayFn').and.callThrough();
        spyOn(formTools, 'doFormGroupFn').and.callThrough();
        item.params.target && spyOn(item.params.target, 'markAsDirty');

        service.markAllAsDirty(item.params.target, item.params.opts);

        item.params.target && expect(item.params.target.markAsDirty).toHaveBeenCalledWith(item.params.opts);
        expect(formTools.doFormArrayFn).toHaveBeenCalledTimes(item.expectCallTimes.doFormArrayFn);
        expect(formTools.doFormGroupFn).toHaveBeenCalledTimes(item.expectCallTimes.doFormGroupFn);
      });

      it(`#updateAllValueAndValidity() - ${item.title}`, () => {
        spyOn(formTools, 'doFormArrayFn').and.callThrough();
        spyOn(formTools, 'doFormGroupFn').and.callThrough();

        service.updateAllValueAndValidity(item.params.target, item.params.opts);

        expect(formTools.doFormArrayFn).toHaveBeenCalledTimes(item.expectCallTimes.doFormArrayFn);
        expect(formTools.doFormGroupFn).toHaveBeenCalledTimes(item.expectCallTimes.doFormGroupFn);
      });
    });
  });

  describe('#showAllErrInfo()', () => {
    [
      {
        title: 'when the control is undefined',
        params: {
          target: undefined, opts: { onlySelf: false, emitEvent: true }
        },
      },
      {
        title: 'when the control is formControl with options',
        params: {
          target: new FormControl(), opts: { onlySelf: false, emitEvent: true }
        },
      },
      {
        title: 'when the control is formControl without options',
        params: {
          target: new FormControl(), opts: undefined
        },
      },
      {
        title: 'when the control is formArray with options',
        params: {
          target: new FormArray([new FormControl()]), opts: { onlySelf: false, emitEvent: true }
        },
      },
      {
        title: 'when the control is formArray without options',
        params: {
          target: new FormArray([new FormControl()]), opts: undefined
        },
      },
      {
        title: 'when the control is formGroup with options',
        params: {
          target: new FormGroup({ control: new FormControl() }), opts: { onlySelf: false, emitEvent: true }
        },
      },
      {
        title: 'when the control is formArray without options',
        params: {
          target: new FormGroup({ control: new FormControl() }), opts: undefined
        },
      }
    ].forEach(item => {
      it(item.title, () => {
        spyOn(service, 'markAllAsDirty').and.callThrough();
        spyOn(service, 'updateAllValueAndValidity').and.callThrough();
        item.params.target && spyOn(item.params.target, 'markAllAsTouched').and.callThrough();

        service.showAllErrInfo(item.params.target, item.params.opts);

        item.params.target && expect(item.params.target.markAllAsTouched).toHaveBeenCalled();
        expect(service.markAllAsDirty).toHaveBeenCalledWith(item.params.target, item.params.opts);
        expect(service.updateAllValueAndValidity).toHaveBeenCalledWith(item.params.target, item.params.opts);
      });
    });
  });

  describe('#updateEqualControlsValidities()', () => {
    let controls: { target: AbstractControl; compared: AbstractControl };

    beforeEach(() => {
      const target = new FormControl('', [NbFormValidators.required(true)]);
      const compared = new FormControl('', [NbFormValidators.required(true)]);
      controls = { target, compared };
      spyOn(controls.target, 'updateValueAndValidity').and.callThrough();
      spyOn(controls.compared, 'updateValueAndValidity').and.callThrough();
    });

    it('unsubscribe via return value', () => {
      const subscription = service.updateEqualControlsValidities(controls);
      expect(subscription).toBeTruthy();

      controls.target.setValue(1);
      // because when updating control's value, updateValueAndValidity function will auto be call, 
      // so here is 3 
      expect(controls.target.updateValueAndValidity).toHaveBeenCalledTimes(3);
      expect(controls.compared.updateValueAndValidity).toHaveBeenCalledTimes(2);

      subscription.unsubscribe();
      controls.target.setValue('');
      expect(controls.target.updateValueAndValidity).toHaveBeenCalledTimes(4);
      expect(controls.compared.updateValueAndValidity).toHaveBeenCalledTimes(2);
    });

    it('unsubscribe via destroy$ param', () => {
      const destroy$ = new Subject<void>();
      service.updateEqualControlsValidities(controls, destroy$);

      controls.target.setValue(1);
      expect(controls.target.updateValueAndValidity).toHaveBeenCalledTimes(3);
      expect(controls.compared.updateValueAndValidity).toHaveBeenCalledTimes(2);

      destroy$.next();
      destroy$.complete();
      controls.target.setValue('');
      expect(controls.target.updateValueAndValidity).toHaveBeenCalledTimes(4);
      expect(controls.compared.updateValueAndValidity).toHaveBeenCalledTimes(2);
    });
  });

});
