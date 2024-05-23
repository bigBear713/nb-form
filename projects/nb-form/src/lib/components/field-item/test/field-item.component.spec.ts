import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, UntypedFormControl } from '@angular/forms';
import { NbControlErrType } from '../../../constants';
import { INbControlErrInfo } from '../../../models';
import { NbFormTestingModule } from '../../../testing';
import { NbFormValidators } from '../../../validators';
import { NbFieldItemComponent } from '../field-item.component';

@Component({
  template: `
    <nb-field-item [control]="control" [errInfo]="errInfo" [required]="required">
      <ng-container field-label>fieldLabel</ng-container>
      <input />
    </nb-field-item>
  `,
})
class UIComponent {
  control!: UntypedFormControl;
  errInfo!: INbControlErrInfo;
  required: boolean | undefined = true;
}

describe('NbFieldItemComponent', () => {
  describe('used in normal component', () => {
    let component: NbFieldItemComponent;
    let fixture: ComponentFixture<NbFieldItemComponent>;

    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [NbFormTestingModule],
        declarations: [UIComponent],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(NbFieldItemComponent);
      component = fixture.componentInstance;
      component.control = new UntypedFormControl();
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('verify the UI', () => {
      let uiFixture: ComponentFixture<UIComponent>;
      let uiComponent: UIComponent;
      let uiHostEle: HTMLElement;

      beforeEach(() => {
        uiFixture = TestBed.createComponent(UIComponent);
        uiComponent = uiFixture.componentInstance;
        uiComponent.control = new UntypedFormControl();
        uiFixture.detectChanges();
        uiHostEle = uiFixture.debugElement.nativeElement;
      });

      it('verify the required icon', () => {
        uiComponent.required = false;
        uiFixture.detectChanges();
        expect(uiHostEle.querySelector('.label-required')).toBeFalsy();

        uiComponent.required = true;
        uiFixture.detectChanges();
        expect(uiHostEle.querySelector('.label-required')).toBeTruthy();

        uiComponent.required = undefined;
        uiFixture.detectChanges();
        expect(uiHostEle.querySelector('.label-required')).toBeFalsy();
      });

      it('verify the field label content', () => {
        const fieldLabelEle: HTMLElement | null = uiHostEle.querySelector('.field-label');
        const labelNode: ChildNode | undefined = fieldLabelEle?.childNodes.item(2);
        expect(labelNode?.textContent?.trim()).toEqual('fieldLabel');
      });

      it('verify the field content', () => {
        const fieldContentEle: HTMLElement | null = uiHostEle.querySelector('.field-content');
        expect(fieldContentEle?.querySelector('input')).toBeTruthy();
      });

      it('verify the control error', () => {
        const fieldContentEle: HTMLElement | null = uiHostEle.querySelector('.field-content');
        expect(fieldContentEle?.querySelector('nb-control-err')).toBeTruthy();
      });
    });
  });

  describe('used in standalone component', () => {
    [
      {
        title: 'imported by standalone component',
        createComp: () => TestBed.createComponent(StandaloneComponent),
      },
      {
        title: 'imported by ngModule',
        createComp: () => TestBed.createComponent(StandaloneComponentWithNgModule),
      },
    ].forEach(item => {
      it(item.title, () => {
        const fixture = item.createComp();
        const component = fixture.componentInstance;
        component.control.markAsDirty();
        fixture.detectChanges();

        expect(component.textContent).toEqual('The field is required!');
      });
    });
  });
});

const StandaloneCompConfig = {
  standalone: true,
  imports: [NbFieldItemComponent],
  template: `<nb-field-item [control]="control" [errInfo]="errInfo"></nb-field-item>`,
};

@Component(StandaloneCompConfig)
class StandaloneComponent {
  control = new FormControl<string>('', [NbFormValidators.required(true)]);
  errInfo = { [NbControlErrType.REQUIRED]: 'The field is required!' };

  get textContent() {
    return this.elementRef.nativeElement.textContent?.trim();
  }

  constructor(private elementRef: ElementRef<HTMLElement>) {}
}

@Component({
  ...StandaloneCompConfig,
  imports: [NbFormTestingModule],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
class StandaloneComponentWithNgModule extends StandaloneComponent {}
