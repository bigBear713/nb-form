import { FormControl } from "@angular/forms";
import { NbControlErrTypeEnum } from "../../constants";
import { NbFormValidators } from "../index";

describe('NbFormValidators.arrMinLength', () => {
  [
    {
      title: 'when the value of control is null',
      params: { controlValue: null, minLength: 5 },
      expect: null
    },
    {
      title: 'when the value of control is string value',
      params: { controlValue: 'controlValue', minLength: 5 },
      expect: null
    },
    {
      title: 'when the arr length < 5',
      params: { controlValue: [1, 2, 3], minLength: 5 },
      expect: { [NbControlErrTypeEnum.ARR_MIN_LENGTH]: true }
    },
    {
      title: 'when the arr length = 5',
      params: { controlValue: [1, 2, 3, 4, 5], minLength: 5 },
      expect: null
    },
    {
      title: 'when the arr length > 5',
      params: { controlValue: [1, 2, 3, 4, 5, 6, 7], minLength: 5 },
      expect: null
    },
  ].forEach(item => {
    it(item.title, () => {
      const control = new FormControl(
        item.params.controlValue,
        [NbFormValidators.arrMinLength(item.params.minLength)]
      );
      expect(control.errors).toEqual(item.expect);
    });
  })
});