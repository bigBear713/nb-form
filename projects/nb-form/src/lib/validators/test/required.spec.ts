import { FormControl } from "@angular/forms";
import { NbControlErrTypeEnum } from "../../constants";
import { NbFormValidators } from "../index";

describe('NbFormValidators.required', () => {
  [
    {
      title: 'When required is false',
      params: {
        controlValue: null,
        required: false,
      },
      expect: null
    },
    {
      title: 'When required is undefined and the value of control is null',
      params: {
        controlValue: null,
        required: undefined,
      },
      expect: { [NbControlErrTypeEnum.REQUIRED]: true }
    },
    {
      title: 'When required is true and the value of control is null',
      params: {
        controlValue: null,
        required: true,
      },
      expect: { [NbControlErrTypeEnum.REQUIRED]: true }
    },
    {
      title: 'When required is true and the value of control is string value',
      params: {
        controlValue: 'controlValue',
        required: true,
      },
      expect: null
    },
  ].forEach(item => {
    it(item.title, () => {
      const control = new FormControl(
        item.params.controlValue,
        [NbFormValidators.required(item.params.required)]
      );
      expect(control.errors).toEqual(item.expect);
    });
  });
});