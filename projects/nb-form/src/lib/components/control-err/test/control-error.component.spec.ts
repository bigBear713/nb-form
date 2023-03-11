import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbControlErrComponent } from '../control-err.component';
import { NbFormTestingModule } from '../../../testing';
import { NbControlErrType, NB_CONTROL_COMMON_ERR_INFO } from '../../../constants';
import { Component, SimpleChange, ElementRef } from '@angular/core';
import { INbControlErrInfo } from '../../../models';
import { AbstractControl, FormControl, UntypedFormControl } from '@angular/forms';
import { NbFormValidators } from '../../../validators';
import { NbFormService } from '../../../services';

describe('NbControlErrComponent', () => {
  describe('used in normal component', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [NbFormTestingModule]
      })
        .compileComponents();
    });

    it('should create', () => {
      const instance = createComponent();
      expect(instance.component).toBeTruthy();
    });

    describe('Verify the UI', () => {
      let fixture: ComponentFixture<NbControlErrComponent>;
      let component: NbControlErrComponent;
      let hostEle: HTMLElement;

      beforeEach(() => {
        const instance = createComponent();
        fixture = instance.fixture;
        component = instance.component;
        hostEle = fixture.debugElement.nativeElement;
      });

      [
        {
          title: 'The control is valid and dirty is false',
          testData: {
            control: new UntypedFormControl(),
            operateControl: (control: AbstractControl) => { },
          },
          expect: {
            infoWrapperExisted: false
          }
        },
        {
          title: 'The control is valid and dirty is true',
          testData: {
            control: new UntypedFormControl(),
            operateControl: (control: AbstractControl) => {
              const service: NbFormService = TestBed.inject(NbFormService);
              service.showAllErrInfo(control);
            },
          },
          expect: {
            infoWrapperExisted: false
          }
        },
        {
          title: 'The control is invalid and dirty is true',
          testData: {
            control: new UntypedFormControl('', [NbFormValidators.required(true)]),
            operateControl: (control: AbstractControl) => {
              const service: NbFormService = TestBed.inject(NbFormService);
              service.showAllErrInfo(control);
            },
          },
          expect: {
            infoWrapperExisted: true
          }
        },
        {
          title: 'The control is invalid and dirty is false',
          testData: {
            control: new UntypedFormControl('', [NbFormValidators.required(true)]),
            operateControl: (control: AbstractControl) => { },
          },
          expect: {
            infoWrapperExisted: false
          }
        },
      ].forEach(item => {
        it(item.title, () => {
          component.control = item.testData.control;
          const changes = {
            control: new SimpleChange(undefined, component.control, false)
          };
          component.ngOnChanges(changes);
          item.testData.operateControl(component.control);

          fixture.detectChanges();

          expect(!!hostEle.querySelector('div')).toEqual(item.expect.infoWrapperExisted);
        });

      });

      it('The control is in initial status, and the dirty is true, status is invalid', () => {
        const control = new UntypedFormControl('', [NbFormValidators.required(true)]);
        control.markAsDirty();

        component.control = control;
        const changes = {
          control: new SimpleChange(undefined, component.control, false)
        };
        component.ngOnChanges(changes);

        fixture.detectChanges();

        expect(hostEle.querySelector('div')).toBeTruthy();
      });

      it('verify the form.showAllErrInfo() function', () => {
        const instance = createComponent();
        const fixture = instance.fixture;
        const component = instance.component;
        component.control = new FormControl<string>('', [NbFormValidators.required(true)]);
        const service: NbFormService = TestBed.inject(NbFormService);

        const changes = {
          control: new SimpleChange(undefined, component.control, false)
        };
        component.ngOnChanges(changes);

        service.showAllErrInfo(component.control);

        fixture.detectChanges();

        const hostEle: HTMLElement = fixture.debugElement.nativeElement;
        expect(hostEle.querySelector('div')).toBeTruthy();
      });
    });


    describe('verify the allErrorInfo', () => {
      const testData: {
        title: string;
        testData: { defaultInfo: INbControlErrInfo | undefined; errInfo: INbControlErrInfo };
        expect: INbControlErrInfo;
      }[] = [
          {
            title: 'There does not have default info',
            testData: {
              defaultInfo: undefined,
              errInfo: { fileType: 'The file type does not support!' }
            },
            expect: { fileType: 'The file type does not support!' }
          },
          {
            title: 'There have default info',
            testData: {
              defaultInfo: { required: 'The filed is required' },
              errInfo: { fileType: 'The file type does not support!' }
            },
            expect: { required: 'The filed is required', fileType: 'The file type does not support!' }
          },
          {
            title: 'The errInfo is undefined',
            testData: {
              defaultInfo: { required: 'The filed is required' },
              errInfo: undefined as any
            },
            expect: { required: 'The filed is required' }
          }
        ];

      testData.forEach(item => {
        describe(item.title, () => {
          let subComponent: NbControlErrComponent;
          let subFixture: ComponentFixture<NbControlErrComponent>;

          beforeEach(async () => {
            await TestBed.configureTestingModule({
              imports: [NbFormTestingModule],
              providers: [
                {
                  provide: NB_CONTROL_COMMON_ERR_INFO,
                  useValue: item.testData.defaultInfo,
                }
              ]
            })
              .compileComponents();
          });

          beforeEach(() => {
            const instance = createComponent();
            subFixture = instance.fixture;
            subComponent = instance.component;
          });

          it(`The allErrorMapping should be ${JSON.stringify(item.expect)}`, () => {
            subComponent.errInfo = item.testData.errInfo;
            const changes = {
              errInfo: new SimpleChange(undefined, item.testData.errInfo, true)
            };
            subComponent.ngOnChanges(changes);

            expect(subComponent.allErrInfo).toEqual(item.expect);
          });
        });
      })
    });
  });

  describe('used in standalone component', () => {
    [
      {
        title: 'imported by standalone component',
        createComp: () => TestBed.createComponent(StandaloneComponent)
      },
      {
        title: 'imported by ngModule',
        createComp: () => TestBed.createComponent(StandaloneComponentWithNgModule)
      }
    ].forEach(item => {
      it(item.title, () => {
        const fixture = item.createComp();
        const component = fixture.componentInstance;
        component.control.markAsDirty();
        fixture.detectChanges();

        expect(component.textContent).toEqual('The field is required!');
      });
    })
  });

});

function createComponent() {
  const fixture = TestBed.createComponent(NbControlErrComponent);
  const component = fixture.componentInstance;
  component.control = new UntypedFormControl();
  fixture.detectChanges();
  return { fixture, component };
}

const StandaloneCompConfig = {
  standalone: true,
  imports: [NbControlErrComponent],
  template: `<nb-control-err [control]="control" [errInfo]="errInfo"></nb-control-err>`,
};

@Component(StandaloneCompConfig)
class StandaloneComponent {
  control = new FormControl<string>('', [NbFormValidators.required(true)]);
  errInfo = { [NbControlErrType.REQUIRED]: 'The field is required!' };

  get textContent() {
    return this.elementRef.nativeElement.textContent?.trim();
  }

  constructor(private elementRef: ElementRef<HTMLElement>) { }
}

@Component({
  ...StandaloneCompConfig,
  imports: [NbFormTestingModule],
})
class StandaloneComponentWithNgModule extends StandaloneComponent { }