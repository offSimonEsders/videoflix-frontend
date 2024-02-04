import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";
import {CommonModule} from "@angular/common";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

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
  @ViewChild('loginform') loginform?: ElementRef;
  mailregex: RegExp = /[a-z0-9]+@[a-z]+\.[a-z]/;
  remember: boolean = false;
  email: FormControl<string | null> = new FormControl('', [this.validateEmail.bind(this), Validators.required]);
  password: FormControl<string | null> = new FormControl('', [Validators.minLength(8), Validators.required]);

  loginGroup = new FormGroup({
    email: this.email,
    password: this.password
  });

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

  /**
   * Adds userfeedback to the form or removes it
   *
   * @param {boolean} toValidate - to show userfeedback after failed login
   * */
  formUserFeedback(toValidate: undefined | boolean = undefined): void {
    if(this.loginGroup.invalid || toValidate) {
      this.loginform?.nativeElement.classList.add('form-not-valid');
      return;
    }
    this.loginform?.nativeElement.classList.remove('form-not-valid');
  }

}
