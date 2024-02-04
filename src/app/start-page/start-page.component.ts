import {Component, ElementRef, ViewChild} from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent{
  @ViewChild('emailinput') emailinput?: ElementRef<HTMLInputElement>;
  mailregex: RegExp = /[a-z0-9]+@[a-z]+\.[a-z]/;
  email: FormControl<string | null> = new FormControl('', [this.validateEmail.bind(this)]);

  constructor(private router: Router) {
  }

  /**
   * Validates if email matches to mailregex
   *
   * @param {FormControl} control - Field to validate
   * */
  validateEmail(control: AbstractControl): { check: true } | null {
    if (!this.mailregex.test(control.value)) {
      return {check: true};
    }
    return null;
  }

  /**
   * Checks if email has error and returns error message
   *
   * @returns {string | undefined} - error message or no errormessage
   * */
  getErrorMessagePassword(): 'Enter a valid email' | undefined {
    if (this.email.hasError('check')) {
      return 'Enter a valid email';
    }
    return
  }

  /**
   * Navigates to register or focuses emailinput
   *
   * @param {Event} event - Click event
   * */
  toRegister(event: Event): void {
    event.preventDefault();
    if(this.email.valid) {
      this.router.navigate(['/registration/']);
      return;
    }
    this.emailinput?.nativeElement.focus();
  }

}
