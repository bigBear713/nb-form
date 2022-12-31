import { UntypedFormControl } from "@angular/forms";
import { NbControlErrType } from "../../constants";
import { NbFormValidators } from "../index";

const testData = {
  '3': '123',
  '10': '0123456789',
  '20': '01234567890123456789',
  '26': 'abcdefghijklmnopqrstuvwxyz',
};

describe('NbFormValidators.fileSize', () => {
  [
    {
      title: 'When the value of control is null',
      params: {
        controlValue: null,
        fileSize: { max: 100, min: 10 },
      },
      expect: null
    },
    {
      title: 'When the value of control is string value',
      params: {
        controlValue: 'controlValue',
        fileSize: { max: 100, min: 10 },
      },
      expect: null
    },
    {
      title: 'When the file size < 10b',
      params: {
        controlValue: new File([testData['3']], 'filesize.txt'),
        fileSize: { max: 20, min: 10 },
      },
      expect: { [NbControlErrType.FILE_MIN_SIZE]: true }
    },
    {
      title: 'When the file size < 10b, and only set the min size limit',
      params: {
        controlValue: new File([testData['3']], 'filesize.txt'),
        fileSize: { min: 10 },
      },
      expect: { [NbControlErrType.FILE_MIN_SIZE]: true }
    },
    {
      title: 'When the file size = 10b',
      params: {
        controlValue: new File([testData['10']], 'filesize.txt'),
        fileSize: { minSize: 10 },
      },
      expect: null
    },
    {
      title: 'When the file size > 10b',
      params: {
        controlValue: new File([testData['20']], 'filesize.txt'),
        fileSize: { minSize: 10 },
      },
      expect: null
    },
    {
      title: 'When the file size > 20b',
      params: {
        controlValue: new File([testData['26']], 'filesize.txt'),
        fileSize: { max: 20, min: 10 },
      },
      expect: { [NbControlErrType.FILE_MAX_SIZE]: true }
    },
    {
      title: 'When the file size > 20b, and only set the max size limit',
      params: {
        controlValue: new File([testData['26']], 'filesize.txt'),
        fileSize: { max: 20 },
      },
      expect: { [NbControlErrType.FILE_MAX_SIZE]: true }
    },
    {
      title: 'When the file size = 20b',
      params: {
        controlValue: new File([testData['20']], 'filesize.txt'),
        fileSize: { max: 20 },
      },
      expect: null
    },
    {
      title: 'When the file size < 20b',
      params: {
        controlValue: new File([testData['10']], 'filesize.txt'),
        fileSize: { max: 20 },
      },
      expect: null
    },
  ].forEach(item => {
    it(item.title, () => {
      const control = new UntypedFormControl(
        item.params.controlValue,
        [NbFormValidators.fileSize(item.params.fileSize)]
      );
      expect(control.errors).toEqual(item.expect);
    });
  });
});