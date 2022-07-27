import { UntypedFormControl } from "@angular/forms";
import { NbControlErrTypeEnum } from "../../constants";
import { NbFormValidators } from "../index";

describe('NbFormValidators.equal', () => {
  [
    {
      title: 'When the values of controls all are null',
      params: {
        controlValue: null,
        comparedControl: new UntypedFormControl(null),
      },
      expect: null
    },
    {
      title: 'When the values of controls all are some string value',
      params: {
        controlValue: 'controlValue',
        comparedControl: new UntypedFormControl('controlValue'),
      },
      expect: null
    },
  ].forEach(item => {
    it(item.title, () => {
      const control = new UntypedFormControl(
        item.params.controlValue,
        [NbFormValidators.equal(item.params.comparedControl)]
      );
      expect(control.errors).toEqual(item.expect);
    });
  });

  [
    {
      title: 'When the controls all do not have any errors, the value of target control is string value, and the value of compared control is null.',
      params: {
        getTargetControl: (compared: UntypedFormControl) => new UntypedFormControl('controlValue', [NbFormValidators.equal(compared)]),
        comparedControl: new UntypedFormControl(null),
      },
      expect: {
        target: { [NbControlErrTypeEnum.EQUAL]: true },
      }
    },
    {
      title: 'When the compared controls has one required error, the value of target control is string value, and the value of compared control is null.',
      params: {
        getTargetControl: (compared: UntypedFormControl) => new UntypedFormControl('controlValue', [NbFormValidators.equal(compared)]),
        comparedControl: new UntypedFormControl(null, [NbFormValidators.required(true)]),
      },
      expect: {
        target: { [NbControlErrTypeEnum.EQUAL]: true },
      }
    },

  ].forEach(item => {
    it(item.title, () => {
      const control = item.params.getTargetControl(item.params.comparedControl);
      expect(control.errors).toEqual(item.expect.target);
    });
  });

  it('The target value is string value, and compared value is null, they are required', () => {
    const comparedControl = new UntypedFormControl(null, [NbFormValidators.required(true,)]);
    const control = new UntypedFormControl('control', [NbFormValidators.required(true), NbFormValidators.equal(comparedControl, true)]);

    expect(control.errors).toEqual({ [NbControlErrTypeEnum.EQUAL]: true });

    control.setValue(null);
    expect(control.errors).toEqual({ [NbControlErrTypeEnum.REQUIRED]: true });
  });

  it('The error will be displayed when compared control is dirty', () => {
    const comparedControl = new UntypedFormControl();
    const targetControl = new UntypedFormControl('', [NbFormValidators.equal(comparedControl, false)]);
    expect(targetControl.errors).toEqual(null);

    comparedControl.markAsDirty();
    targetControl.updateValueAndValidity();
    expect(targetControl.errors).toEqual({ [NbControlErrTypeEnum.EQUAL]: true });
  });

  it('The error will be displayed when the immediatelyErr param of validator has been set as true', () => {
    const comparedControl = new UntypedFormControl();
    const targetControl = new UntypedFormControl('', [NbFormValidators.equal(comparedControl, false)]);
    expect(targetControl.errors).toEqual(null);

    comparedControl.markAsDirty();
    targetControl.updateValueAndValidity();
    expect(targetControl.errors).toEqual({ [NbControlErrTypeEnum.EQUAL]: true });
  });
});
