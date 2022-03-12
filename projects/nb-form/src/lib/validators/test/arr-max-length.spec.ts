import { FormControl } from "@angular/forms";
import { NbControlErrTypeEnum } from "../../constants";
import { NbFormValidators } from "../index";

describe('NbFormValidators.arrMaxLength', () => {
  [
    {
      title: 'when the value of control is null',
      params: { controlValue: null, maxLength: 5 },
      expect: null
    },
    {
      title: 'when the value of control is string value',
      params: { controlValue: 'controlValue', maxLength: 5 },
      expect: null
    },
    {
      title: 'when the arr length < 5',
      params: { controlValue: [1, 2, 3], maxLength: 5 },
      expect: null
    },
    {
      title: 'when the arr length = 5',
      params: { controlValue: [1, 2, 3, 4, 5], maxLength: 5 },
      expect: null
    },
    {
      title: 'when the arr length > 5',
      params: { controlValue: [1, 2, 3, 4, 5, 6, 7], maxLength: 5 },
      expect: { [NbControlErrTypeEnum.ARR_MAX_LENGTH]: true }
    },
  ].forEach(item => {
    it(item.title, () => {
      const control = new FormControl(
        item.params.controlValue,
        [NbFormValidators.arrMaxLength(item.params.maxLength)]
      );
      expect(control.errors).toEqual(item.expect);
    });
  })
});