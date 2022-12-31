import { UntypedFormControl } from "@angular/forms";
import { NbControlErrType } from "../../constants";
import { NbFormValidators } from "../index";

describe('NbFormValidators.whitespace', () => {
  [
    {
      title: 'When the value of control is null',
      params: {
        controlValue: null,
        canWhitespace: false,
      },
      expect: null
    },
    {
      title: 'When the value of control is number',
      params: {
        controlValue: 123,
        canWhitespace: false,
      },
      expect: null
    },
    {
      title: 'When canWhitespace is undefined',
      params: {
        controlValue: '    ',
        canWhitespace: undefined,
      },
      expect: null
    },
    {
      title: 'When canWhitespace is true',
      params: {
        controlValue: '    ',
        canWhitespace: true,
      },
      expect: null
    },
    {
      title: 'When the value of control is all whitespace and canWhitespace is false',
      params: {
        controlValue: '    ',
        canWhitespace: false,
      },
      expect: { [NbControlErrType.WHITESPACE]: true }
    },
    {
      title: 'When the value of control is not all whitespace and canWhitespace is false',
      params: {
        controlValue: '    controlValue',
        canWhitespace: false,
      },
      expect: null
    },
  ].forEach(item => {
    it(item.title, () => {
      const control = new UntypedFormControl(
        item.params.controlValue,
        [NbFormValidators.whitespace(item.params.canWhitespace)]
      );
      expect(control.errors).toEqual(item.expect);
    });
  });
});