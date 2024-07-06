import { Component, ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NbCommonTestingModule, NbValueTypeService } from '@bigbear713/nb-common';
import { of } from 'rxjs';
import { NbControlErrType } from '../../constants';
import { INbControlErrInfo } from '../../models';
import { NbErrInfoPipe } from '../err-info.pipe';

describe('NbErrInfoPipe', () => {
  describe('used in normal case', () => {
    let pipe: NbErrInfoPipe;
    let valueType: NbValueTypeService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [NbCommonTestingModule],
      }).compileComponents();
    });

    beforeEach(() => {
      pipe = new NbErrInfoPipe();
      valueType = TestBed.inject(NbValueTypeService);
    });

    it('create an instance', () => {
      expect(pipe).toBeTruthy();
    });

    describe('#transform()', () => {
      [
        {
          title: 'the errors and errMapping all are undefined',
          params: {
            errors: undefined,
            errMapping: undefined,
          },
          expect: { isString: true, isObservable: false },
        },
        {
          title: 'the errors has a required err and the errMapping is undefined',
          params: {
            errors: { [NbControlErrType.REQUIRED]: true },
            errMapping: undefined,
          },
          expect: { isString: true, isObservable: false },
        },
        {
          title: 'the errors has a required err and the errMapping has a string value',
          params: {
            errors: { [NbControlErrType.REQUIRED]: true },
            errMapping: { [NbControlErrType.REQUIRED]: 'This field is required!' },
          },
          expect: { isString: true, isObservable: false },
        },
        {
          title: 'the errors has a required err and the errMapping has a observable value',
          params: {
            errors: { [NbControlErrType.REQUIRED]: true },
            errMapping: { [NbControlErrType.REQUIRED]: of('This field is required!') },
          },
          expect: { isString: false, isObservable: true },
        },
      ].forEach(item => {
        it(item.title, () => {
          const result = pipe.transform(item.params.errors, item.params.errMapping);
          expect(valueType.isString(result)).toEqual(item.expect.isString);
          expect(valueType.isObservable(result)).toEqual(item.expect.isObservable);
        });
      });
    });
  });

  describe('used in standalone component', () => {
    [
      {
        title: 'imported by standalone component',
        createComp: () => TestBed.createComponent(StandaloneComponent),
      },
    ].forEach(item => {
      it(item.title, () => {
        const fixture = item.createComp();
        const component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component.textContent).toEqual('The field is required!');
      });
    });
  });
});

const StandaloneCompConfig = {
  standalone: true,
  imports: [NbErrInfoPipe],
  template: `{{errors|nbErrInfo:errInfo}}`,
};

@Component(StandaloneCompConfig)
class StandaloneComponent {
  errors = { [NbControlErrType.REQUIRED]: true };
  errInfo: INbControlErrInfo = { [NbControlErrType.REQUIRED]: 'The field is required!' };

  get textContent() {
    return this.elementRef.nativeElement.textContent?.trim();
  }

  constructor(private elementRef: ElementRef<HTMLDivElement>) {}
}
