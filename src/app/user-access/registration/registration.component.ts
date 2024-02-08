import {Component, ElementRef, ViewChild} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {ValidationService} from "../../services/validation.service";
import {BackendServiceService} from "../../services/backend-service.service";
import {Videoflixuser} from "../../modules/videoflixuser";

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
  username: FormControl<string | null> = new FormControl('', [Validators.minLength(6), Validators.required])
  email: FormControl<string | null> = new FormControl('', [Validators.required, this.validation.validateEmail.bind(this)]);
  password1: FormControl<string | null> = new FormControl('', [Validators.required, Validators.minLength(8)]);
  password2: FormControl<string | null> = new FormControl('', [Validators.required, Validators.minLength(8), this.validation.validatePasswords.bind(this, this.password1)]);

  registrationGroup: FormGroup = new FormGroup({
    username: this.username,
    email: this.email,
    password1: this.password1,
    password2: this.password2
  })

  constructor(private validation: ValidationService, private backendservice: BackendServiceService) {
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

  getErrorMessageUsername(): string | undefined {
    if(this.username.hasError('minlength')){
      return 'Dein Nutzername sollte mindestens 6 Zeichen fassen';
    }
    return;
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

  /**
   * Checks if the data is valid.
   * If the data is valid it calls createUserAndCallRegister
   * */
  registerNewUser(): void {
    this.formUserfeedback();
    if(this.registrationGroup.valid) {
      this.registrationGroup.disable();
      this.createUserAndCallRegister();
      this.registrationGroup.reset();
      this.registrationGroup.enable();
    }
  }

  /**
   * Shows feedback if the formdata is invalid
   * */
  formUserfeedback(): void {
    if (this.registrationGroup.invalid) {
      this.registrationform?.nativeElement.classList.add('registration-failed');
      return;
    }
    this.registrationform?.nativeElement.classList.remove('registration-failed');
  }

  /**
   * Gets data from form creates a new Videoflixuser with the data and makes a post to the backend
   * */
  async createUserAndCallRegister(): Promise<void> {
    const username: string | null = this.username.value;
    const email: string | null = this.email.value;
    const password: string | null = this.password2.value;
    if(username && email && password) {
      const newUser: Videoflixuser = new Videoflixuser(username, email, password);
      const resp: Response | undefined = await this.backendservice.register(newUser);
    }
  }

  protected readonly localStorage: Storage = localStorage;
}
