import {
  Directive,
  ElementRef,
  Input
} from '@angular/core';
import { toBoolean } from '@angular-mdc/web/common';

import { MDCTextFieldHelperTextFoundation } from '@material/textfield/helper-text';

@Directive({
  selector: '[mdcTextFieldHelperText], mdc-text-field-helper-text',
  exportAs: 'mdcHelperText',
  host: {
    'class': 'mdc-text-field-helper-text',
    '[class.mdc-text-field-helper-text--persistent]': 'persistent',
    '[class.mdc-text-field-helper-text--validation-msg]': 'validation',
    '[attr.aria-hidden]': 'true'
  }
})
export class MdcTextFieldHelperText {
  @Input() id: string;

  @Input()
  get persistent(): boolean { return this._persistent; }
  set persistent(value: boolean) {
    this._persistent = toBoolean(value);
    this._foundation.setPersistent(this.persistent);
  }
  private _persistent: boolean;

  @Input()
  get validation(): boolean { return this._validation; }
  set validation(value: boolean) {
    this._validation = toBoolean(value);
    this._foundation.setValidation(this.validation);
  }
  private _validation: boolean;

  createAdapter() {
    return {
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      hasClass: (className: string) => this._getHostElement().classList.contains(className),
      setAttr: (attr: string, value: string) => this._getHostElement().setAttribute(attr, value),
      removeAttr: (attr: string) => this._getHostElement().removeAttribute(attr),
      setContent: (content: string) => this._getHostElement().textContent = content
    };
  }

  private _foundation: {
    setContent(content: string): void,
    showToScreenReader(): boolean,
    setValidity(inputIsValid: boolean): void,
    setPersistent(isPersistent: boolean): void,
    setValidation(isValidation: boolean): void
  } = new MDCTextFieldHelperTextFoundation(this.createAdapter());

  constructor(public elementRef: ElementRef<HTMLElement>) { }

  /** Sets the content of the helper text field. */
  setContent(content: string): void {
    this._foundation.setContent(content);
  }

  /** Sets the validity of the helper text based on the input validity. */
  setValidity(validity: boolean): void {
    this._foundation.setValidity(validity);
  }

  /** Makes the helper text visible to the screen reader. */
  showToScreenReader(): void {
    this._foundation.showToScreenReader();
  }

  get helperTextFoundation(): any {
    return this._foundation;
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
