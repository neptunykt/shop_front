import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[price]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PriceValidatorDirective, multi: true }]
})
export class PriceValidatorDirective implements Validator {

  validate(c: FormControl): ValidationErrors {
    const value = Number(c.value);
    const message = {
      'price': {
        'message': "Значение не должно быть 0"
      }
    }
    console.log('price validator');
    return value != 0 ? null : message;
  }
}