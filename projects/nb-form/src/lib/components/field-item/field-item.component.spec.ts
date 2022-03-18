import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { IControlErrInfo } from '../../models';
import { NbFormTestingModule } from '../../testing';
import { NbFieldItemComponent } from './field-item.component';

@Component({
  template: `
    <nb-field-item [control]="control" 
                   [errInfo]="errInfo" 
                   [required]="required">
    <ng-container field-label>fieldLabel</ng-container> 
    <input>              
    </nb-field-item>
  `
})
class UIComponent {
  control!: FormControl;
  errInfo!: IControlErrInfo;
  required: boolean = true;
}

describe('NbFieldItemComponent', () => {
  let component: NbFieldItemComponent;
  let fixture: ComponentFixture<NbFieldItemComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [NbFormTestingModule],
      declarations: [UIComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NbFieldItemComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();
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
      uiComponent.control = new FormControl();
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
    });

    it('verify the field label content', () => {
      const fieldLabelEle: HTMLElement | null = uiHostEle.querySelector('.field-label');
      const labelNode: ChildNode | undefined = fieldLabelEle?.childNodes.item(2);
      expect(labelNode?.textContent?.trim()).toEqual('fieldLabel');
    });

    it('verify the field content', () => {
      const fieldContentEle: HTMLElement | null = uiHostEle.querySelector('.field-content');
      expect(fieldContentEle?.querySelector('input')).toBeTruthy();
    })

    it('verify the control error', () => {
      const fieldContentEle: HTMLElement | null = uiHostEle.querySelector('.field-content');
      expect(fieldContentEle?.querySelector('nb-control-err')).toBeTruthy();
    })
  });
});
