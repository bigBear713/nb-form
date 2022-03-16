import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbControlErrComponent } from './control-err.component';
import { NbFormTestingModule } from '../../testing';
import { NbControlErrTypeEnum, NB_CONTROL_COMMON_ERR_MAPPING_TOKEN } from '../../constants';
import { ChangeDetectorRef, SimpleChange } from '@angular/core';
import { INbControlErrMapping } from '../../models';
import { AbstractControl, FormControl } from '@angular/forms';
import { NbFormValidators } from '../../validators';
import { NbFormService } from '../../services';

describe('NbControlErrComponent', () => {

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
          control: new FormControl(),
          operateControl: (control: AbstractControl) => { },
        },
        expect: {
          infoWrapperExisted: false
        }
      },
      {
        title: 'The control is valid and dirty is true',
        testData: {
          control: new FormControl(),
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
          control: new FormControl('', [NbFormValidators.required(true)]),
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
          control: new FormControl('', [NbFormValidators.required(true)]),
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

    it('verify the form.showAllErrInfo() function', () => {
      const instance = createComponent();
      const fixture = instance.fixture;
      const component = instance.component;
      component.control = new FormControl('', [NbFormValidators.required(true)]);
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


  describe('verify the allErrorMapping', () => {
    const testData: {
      title: string;
      testData: { defaultMapping: INbControlErrMapping | undefined; errMapping: INbControlErrMapping };
      expect: INbControlErrMapping;
    }[] = [
        {
          title: 'There does not have default mapping',
          testData: {
            defaultMapping: undefined,
            errMapping: { fileType: 'The file type does not support!' }
          },
          expect: { fileType: 'The file type does not support!' }
        },
        {
          title: 'There have default mapping',
          testData: {
            defaultMapping: { required: 'The filed is required' },
            errMapping: { fileType: 'The file type does not support!' }
          },
          expect: { required: 'The filed is required', fileType: 'The file type does not support!' }
        },
        {
          title: 'The errMapping is undefined',
          testData: {
            defaultMapping: { required: 'The filed is required' },
            errMapping: undefined as any
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
                provide: NB_CONTROL_COMMON_ERR_MAPPING_TOKEN,
                useValue: item.testData.defaultMapping,
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
          subComponent.errMapping = item.testData.errMapping;
          const changes = {
            errMapping: new SimpleChange(undefined, item.testData.errMapping, true)
          };
          subComponent.ngOnChanges(changes);

          expect(subComponent.allErrMapping).toEqual(item.expect);
        });
      });
    })
  });

});

function createComponent() {
  const fixture = TestBed.createComponent(NbControlErrComponent);
  const component = fixture.componentInstance;
  component.control = new FormControl();
  fixture.detectChanges();
  return { fixture, component };
}
