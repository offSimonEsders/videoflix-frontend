import {Component} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";
import {CommonModule} from "@angular/common";
import {AbstractControl, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  mailregex: RegExp = /[a-z0-9]+@[a-z]+\.[a-z]/;
  remember: boolean = false;
  email: FormControl<string | null> = new FormControl('', [this.validateEmail.bind(this)]);
  password: FormControl<string | null> = new FormControl('', [Validators.minLength(8)]);

  /**
   * Toggles remember
   * */
  toggleRemember(): void {
    this.remember = !this.remember;
  }

  /**
   * Validates the given Formcontrol
   *
   * @param {AbstractControl} controls - Element to control
   *
   * @returns {{check:true} | null} - to validate the errormessage
   * */
  validateEmail(controls: AbstractControl): {check: true} | null {
    if(!this.mailregex.test(controls.value)) {
      return {check: true};
    }
    return null;
  }

  /**
   * Validates the result of the validated formcontrol and returns an errormessage for Email
   *
   * @returns {string | undefined}
   * */
  getErrorMessageEmail() {
    if(this.email.hasError('check')) {
      return 'Bitte geben Sie eine gültige Email-Adresse ein';
    }
    return;
  }

  /**
   * Validates the result of the validated formcontrol and returns an errormessage for Password
   *
   * @returns {string | undefined}
   * */
  getErrorMessagePassword() {
    if(this.password.hasError('minlength')) {
      return 'Das Passwort sollte mindestens 8 Zeichen fassen';
    }
    return;
  }

}
