import { FormControl } from "@angular/forms";
import { NbControlErrTypeEnum } from "../../constants";
import { NbFormValidators } from "../index";

describe('NbFormValidators.arrLength', () => {
  [
    {
      title: 'when the value of control is null',
      params: { controlValue: null, arrLength: { max: 5, min: 3 } },
      expect: null
    },
    {
      title: 'when the value of control is string value',
      params: { controlValue: 'controlValue', arrLength: { max: 5, min: 3 } },
      expect: null
    },
    {
      title: 'when the arr length > 5 and length limit is { max: 5}',
      params: { controlValue: [1, 2, 3, 4, 5, 6], arrLength: { max: 5 } },
      expect: { [NbControlErrTypeEnum.ARR_MAX_LENGTH]: true }
    },
    {
      title: 'when the arr length > 5 and length limit is { max: 5, min: 3 }',
      params: { controlValue: [1, 2, 3, 4, 5, 6], arrLength: { max: 5, min: 3 } },
      expect: { [NbControlErrTypeEnum.ARR_MAX_LENGTH]: true }
    },
    {
      title: 'when the arr length = 5 and length limit is { max: 5, min: 3 }',
      params: { controlValue: [1, 2, 3, 4, 5], arrLength: { max: 5, min: 3 } },
      expect: null
    },
    {
      title: 'when the arr length = 4 and length limit is { max: 5, min: 3 }',
      params: { controlValue: [1, 2, 3, 4], arrLength: { max: 5, min: 3 } },
      expect: null
    },
    {
      title: 'when the arr length = 3 and length limit is { max: 5, min: 3 }',
      params: { controlValue: [1, 2, 3], arrLength: { max: 5, min: 3 } },
      expect: null
    },
    {
      title: 'when the arr length = 2 and length limit is { max: 5, min: 3 }',
      params: { controlValue: [1, 2], arrLength: { max: 5, min: 3 } },
      expect: { [NbControlErrTypeEnum.ARR_MIN_LENGTH]: true }
    },
    {
      title: 'when the arr length = 2 and length limit is { min: 3 }',
      params: { controlValue: [1, 2], arrLength: { min: 3 } },
      expect: { [NbControlErrTypeEnum.ARR_MIN_LENGTH]: true }
    },
  ].forEach(item => {
    it(item.title, () => {
      const control = new FormControl(
        item.params.controlValue,
        [NbFormValidators.arrLength(item.params.arrLength)]
      );
      expect(control.errors).toEqual(item.expect);
    });
  })
});