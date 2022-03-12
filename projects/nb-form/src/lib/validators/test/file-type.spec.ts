import { FormControl } from "@angular/forms";
import { NbControlErrTypeEnum } from "../../constants";
import { NbFormValidators } from "../index";

describe('NbFormValidators.fileType', () => {
  [
    {
      title: 'When the value of control is null',
      params: {
        controlValue: null,
        fileType: ['text/plain', 'image/jpeg'],
      },
      expect: null
    },
    {
      title: 'When the value of control is string value',
      params: {
        controlValue: 'controlValue',
        fileType: ['text/plain', 'image/jpeg'],
      },
      expect: null
    },
    {
      title: 'When the length of file types is 0 ',
      params: {
        controlValue: new File([], 'fileType.txt', { type: 'text/plain' }),
        fileType: [],
      },
      expect: null
    },
    {
      title: 'When control value is a png file',
      params: {
        controlValue: new File([], 'fileType.png', { type: 'image/png' }),
        fileType: ['text/plain', 'image/jpeg'],
      },
      expect: { [NbControlErrTypeEnum.FILE_TYPE]: true }
    },
    {
      title: 'When control value is a jpg file',
      params: {
        controlValue: new File([], 'fileType.jpg', { type: 'image/jpeg' }),
        fileType: ['text/plain', 'image/jpeg'],
      },
      expect: null
    },
    {
      title: 'When control value is a text file',
      params: {
        controlValue: new File([], 'fileType.text', { type: 'text/plain' }),
        fileType: ['text/plain', 'image/jpeg'],
      },
      expect: null
    },
  ].forEach(item => {
    it(item.title, () => {
      const control = new FormControl(
        item.params.controlValue,
        [NbFormValidators.fileType(item.params.fileType)]
      );
      expect(control.errors).toEqual(item.expect);
    });
  });
});