import { FormControl } from "@angular/forms";
import { NbControlErrTypeEnum } from "../../constants";
import { NbFormValidators } from "../index";

describe('NbFormValidators.repeated', () => {
  [
    {
      title: 'When the values of controls all are null',
      params: {
        controlValue: null,
        compareControl: new FormControl(null),
      },
      expect: null
    },
    {
      title: 'When the values of controls all are some string value',
      params: {
        controlValue: 'controlValue',
        compareControl: new FormControl('controlValue'),
      },
      expect: null
    },
  ].forEach(item => {
    it(item.title, () => {
      const control = new FormControl(
        item.params.controlValue,
        [NbFormValidators.repeated(item.params.compareControl)]
      );
      expect(control.errors).toEqual(item.expect);
    });
  });

  [
    {
      title: 'When the controls all do not have any errors, the value of target control is string value, and the value of compare control is null.',
      params: {
        getTargetControl: (compare: FormControl) => new FormControl('controlValue', [NbFormValidators.repeated(compare)]),
        compareControl: new FormControl(null),
      },
      expect: {
        target: { [NbControlErrTypeEnum.REPEATED]: true },
        compare: { [NbControlErrTypeEnum.REPEATED]: true },
      }
    },
    {
      title: 'When the compare controls has one required error, the value of target control is string value, and the value of compare control is null.',
      params: {
        getTargetControl: (compare: FormControl) => new FormControl('controlValue', [NbFormValidators.repeated(compare)]),
        compareControl: new FormControl(null, [NbFormValidators.required(true)]),
      },
      expect: {
        target: { [NbControlErrTypeEnum.REPEATED]: true },
        compare: { [NbControlErrTypeEnum.REPEATED]: true },
      }
    },

  ].forEach(item => {
    it(item.title, () => {
      const control = item.params.getTargetControl(item.params.compareControl);
      expect(control.errors).toEqual(item.expect.target);
      expect(item.params.compareControl.errors).toEqual(item.expect.compare);
    });
  });

  it('The target value is string value, and compare value is null, they are required', () => {
    const compareControl = new FormControl(null, [NbFormValidators.required(true)]);
    const control = new FormControl('control', [NbFormValidators.required(true), NbFormValidators.repeated(compareControl)]);

    expect(control.errors).toEqual({ [NbControlErrTypeEnum.REPEATED]: true });
    expect(compareControl.errors).toEqual({ [NbControlErrTypeEnum.REPEATED]: true });

    control.setValue(null);
    expect(control.errors).toEqual({ [NbControlErrTypeEnum.REQUIRED]: true });
    expect(compareControl.errors).toEqual({ [NbControlErrTypeEnum.REQUIRED]: true });
  });
});
