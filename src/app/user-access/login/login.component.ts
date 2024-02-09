import {Component, ElementRef, ViewChild} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ValidationService} from "../../services/validation.service";
import {BackendServiceService} from "../../services/backend-service.service";

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
  remember: boolean = false;
  email: FormControl<string | null> = new FormControl('', [Validators.required, this.validation.validateEmail.bind(this)]);
  password: FormControl<string | null> = new FormControl('', [Validators.minLength(8), Validators.required]);

  loginGroup = new FormGroup({
    email: this.email,
    password: this.password
  });

  constructor(private validation: ValidationService, private backendService: BackendServiceService) {
  }

  /**
   * Toggles remember
   * */
  toggleRemember(): void {
    this.remember = !this.remember;
    this.setRememberme(this.remember)
  }

  /**
   * Validates the result of the validated formcontrol and returns an errormessage for Email
   *
   * @returns {string | undefined}
   * */
  getErrorMessageEmail() {
    if (this.email.hasError('check')) {
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
    if (this.password.hasError('minlength')) {
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
    if (this.loginGroup.invalid || toValidate) {
      this.loginform?.nativeElement.classList.add('form-not-valid');
      return;
    }
    this.loginform?.nativeElement.classList.remove('form-not-valid');
  }

  /**
   * Sets localstorage rememberme to value
   *
   * @param {boolean} value - boolean value localstorage is set to
   * */
  setRememberme(value: boolean): void {
    localStorage.setItem('rememberme', JSON.stringify(value));
  }

  /**
   * Gets rememberme from localstorage and sets remember to the value
   *
   * @returns {boolean} - returns the value from rememberme
   * */
  getRememberme(): boolean {
    const item: string | null = localStorage.getItem('rememberme');
    if (item) {
      this.remember = JSON.parse(item)
      return JSON.parse(item);
    }
    return false;
  }

  async login(email: string, password: string) {
    if(this.loginGroup.valid) {
      const resp: Response | undefined = await this.backendService.login(email, password);
      console.log(await resp?.json())
    }
  }

}
