import {Injectable} from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() {
  }

  /**
   * Validates the given Formcontrol
   *
   * @param {AbstractControl} controls - Element to control
   *
   * @returns {{check:true} | null} - to validate the errormessage
   * */
  validateEmail(controls: AbstractControl): { check: true } | null {
    const mailregex: RegExp = /[a-z0-9]+@[a-z]+\.[a-z]/;
    const toCheck = controls.value
    if (toCheck && !mailregex.test(toCheck)) {
      return {check: true};
    }
    return null;
  }

  /**
   * Checks if the given values are the same
   *
   * @param {AbstractControl} controls1 - value 1
   * @param {AbstractControl} controls2 - value 2
   *
   * @returns {{check:true}|null} - used to get errormaessage
   * */
  validatePasswords(controls1: AbstractControl, controls2: AbstractControl): { check: true } | null {
    const toCheck1 = controls1.value;
    const toCheck2 = controls2.value;
    if (toCheck1 !== toCheck2) {
      return {check: true};
    }
    return null;
  }

  /**
   * Validates the result of the validated formcontrol and returns an errormessage for Email
   *
   * @returns {string | undefined}
   * */
  getErrorMessageEmail(control: FormControl) {
    if (control.hasError('email')) {
      return 'Bitte geben Sie eine gültige Email-Adresse ein';
    }
    return;
  }

}
