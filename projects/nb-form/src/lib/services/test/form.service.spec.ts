import { TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';
import { NbFormTestingModule } from '../../testing';
import { NbFormValidators } from '../../validators';
import { NbFormService } from '../form.service';

describe('NbFormService', () => {
  let service: NbFormService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NbFormTestingModule]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(NbFormService);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  describe('#getValidatorsFromControlConfig()', () => {
    beforeEach(() => {
      spyOn(NbFormValidators, 'required').and.callThrough();
      spyOn(NbFormValidators, 'arrMaxLength').and.callThrough();
      spyOn(NbFormValidators, 'arrMinLength').and.callThrough();
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
            arrMaxLength: 1,
            arrMinLength: 1,
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
            arrMaxLength: 0,
            arrMinLength: 0,
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
            arrMaxLength: 0,
            arrMinLength: 0,
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
            arrMaxLength: 0,
            arrMinLength: 0,
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
        expect(NbFormValidators.arrMaxLength).toHaveBeenCalledTimes(item.expect.callTimes.arrMaxLength);
        expect(NbFormValidators.arrMinLength).toHaveBeenCalledTimes(item.expect.callTimes.arrMinLength);
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

});
