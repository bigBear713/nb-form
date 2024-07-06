import { UntypedFormControl } from '@angular/forms';
import { NbControlErrType } from '../../constants';
import { NbFormValidators } from '../index';

describe('NbFormValidators.required', () => {
  [
    {
      title: 'When required is false',
      params: {
        controlValue: null,
        required: false,
      },
      expect: null,
    },
    {
      title: 'When required is undefined and the value of control is null',
      params: {
        controlValue: null,
        required: undefined,
      },
      expect: { [NbControlErrType.REQUIRED]: true },
    },
    {
      title: 'When required is true and the value of control is null',
      params: {
        controlValue: null,
        required: true,
      },
      expect: { [NbControlErrType.REQUIRED]: true },
    },
    {
      title: 'When required is true and the value of control is string value',
      params: {
        controlValue: 'controlValue',
        required: true,
      },
      expect: null,
    },
  ].forEach(item => {
    it(item.title, () => {
      const control = new UntypedFormControl(item.params.controlValue, [
        NbFormValidators.required(item.params.required),
      ]);
      expect(control.errors).toEqual(item.expect);
    });
  });
});
