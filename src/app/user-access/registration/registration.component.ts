import {Component, ElementRef, ViewChild} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {ValidationService} from "../../services/validation.service";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  @ViewChild('registrationform') registrationform?: ElementRef;
  email: FormControl<string | null> = new FormControl('', [Validators.required, this.validation.validateEmail.bind(this)]);
  password1: FormControl<string | null> = new FormControl('', [Validators.required, Validators.minLength(8)]);
  password2: FormControl<string | null> = new FormControl('', [Validators.required, Validators.minLength(8), this.validation.validatePasswords.bind(this, this.password1)]);

  registrationGroup: FormGroup = new FormGroup({
    email: this.email,
    password1: this.password1,
    password2: this.password2
  })

  constructor(private validation: ValidationService) {
    this.getEmail();
  }

  /**
   * Gets the email from localstorage and if there is an email it sets it to this.email value
   * */
  getEmail(): void {
    const email: string | null = localStorage.getItem('email');
    if (email) {
      this.email.setValue(JSON.parse(email));
    }
  }

  /**
   * Gives back an errormessage or null
   *
   * @returns {string | undefined}
   * */
  getErrorMessageEmail(): string | undefined {
    if (this.email.hasError('check')) {
      return 'Bitte geben Sie eine gültige Email-Adresse ein';
    }
    return;
  }

  /**
   * Gives back an errormessage or null
   *
   * @returns {string | undefined}
   * */
  getErrorMessagePassword(): string | void {
    if (this.password2.hasError('check')) {
      return 'Passwörter müssen übereinstimmen'
    } else if (this.password2.hasError('minlength')) {
      return 'Ihr Passwort sollte mindestens 8 Zeichen fassen';
    }
  }

  formUserfeedback() {
    if (this.registrationGroup.invalid) {
      this.registrationform?.nativeElement.classList.add('registration-failed');
      return;
    }
    this.registrationform?.nativeElement.classList.remove('registration-failed');
  }

  protected readonly localStorage = localStorage;
}
