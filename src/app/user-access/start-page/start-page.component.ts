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
import {BackendServiceService} from "../../services/backend-service.service";

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
  email: FormControl<string | null> = new FormControl('', [Validators.email, Validators.required]);

  constructor(private router: Router, private validation: ValidationService) {
  }

  getErrorMessageEmail(): string | undefined{
    return this.validation.getErrorMessageEmail(this.email);
  }

  /**
   * Navigates to register or focuses emailinput
   *
   * @param {Event} event - Click event
   * */
  toRegister(event: Event): void {
    event.preventDefault();
    if(this.email.valid) {
      localStorage.setItem('email', JSON.stringify(this.email.value))
      this.router.navigate(['/registration/']);
      return;
    }
    this.emailinput?.nativeElement.focus();
  }

}
