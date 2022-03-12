import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbControlErrComponent } from './control-err.component';
import { NbFormTestingModule } from '../../testing';
import { NbControlErrTypeEnum, NB_CONTROL_DEFAULT_ERR_MAPPING_TOKEN } from '../../constants';
import { ChangeDetectorRef, SimpleChange } from '@angular/core';
import { INbControlErrMapping } from '../../models';
import { FormControl } from '@angular/forms';
import { NbFormValidators } from '../../validators';

describe('NbControlErrComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NbFormTestingModule]
    })
      .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NbControlErrComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
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
        title: 'The touched is false, the errors is null',
        testData: {
          getControl: () => {
            const control = new FormControl();
            return control;
          },
        },
        expect: {
          infoWrapperExisted: false
        }
      },
      {
        title: 'The touched is true, the errors is null',
        testData: {
          getControl: () => {
            const control = new FormControl();
            control.markAsTouched();
            return control;
          },
        },
        expect: {
          infoWrapperExisted: false
        }
      },
      {
        title: 'The touched is false, there is a error',
        testData: {
          getControl: () => {
            const control = new FormControl('', [NbFormValidators.required(true)]);
            return control;
          },
        },
        expect: {
          infoWrapperExisted: false
        }
      },
      {
        title: 'The touched is true, there is a error',
        testData: {
          getControl: () => {
            const control = new FormControl('', [NbFormValidators.required(true)]);
            control.markAsTouched();
            return control;
          },
        },
        expect: {
          infoWrapperExisted: true
        }
      },
    ].forEach(item => {
      it(item.title, () => {
        component.control = item.testData.getControl();
        component.errMapping = { [NbControlErrTypeEnum.REQUIRED]: 'This field is required!' };

        fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();
        fixture.detectChanges();

        expect(!!hostEle.querySelector('div')).toEqual(item.expect.infoWrapperExisted);
      });
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
                provide: NB_CONTROL_DEFAULT_ERR_MAPPING_TOKEN,
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
  fixture.detectChanges();
  return { fixture, component };
}
