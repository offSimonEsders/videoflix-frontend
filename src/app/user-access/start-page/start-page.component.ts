import {Component, ElementRef, ViewChild} from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  AbstractControl, Validators,
} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";
import {ValidationService} from "../../services/validation.service";

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf,
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent{
  @ViewChild('emailinput') emailinput?: ElementRef<HTMLInputElement>;
  mailregex: RegExp = /[a-z0-9]+@[a-z]+\.[a-z]/;
  email: FormControl<string | null> = new FormControl('', [this.validation.validateEmail.bind(this), Validators.required]);

  constructor(private router: Router, private validation: ValidationService) {
  }

  /**
   * Checks if email has error and returns error message
   *
   * @returns {string | undefined} - error message or no errormessage
   * */
  getErrorMessageEmail(): string | undefined {
    if (this.email.hasError('check')) {
      return 'Bitte geben Sie eine gültige Email-Adresse ein';
    }
    return;
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
