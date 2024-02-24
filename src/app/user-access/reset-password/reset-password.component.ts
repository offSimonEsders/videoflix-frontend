import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {HeaderComponent} from "../header/header.component";
import {ValidationService} from "../../services/validation.service";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgClass,
    ReactiveFormsModule,
    HeaderComponent
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  password: FormControl<string | null> = new FormControl('', [Validators.required, Validators.minLength(8)]);
  password2: FormControl<string | null> = new FormControl('', [Validators.required, Validators.minLength(8), this.validationService.validatePasswords.bind(this, this.password)]);

  pwFormGroup: FormGroup = new FormGroup({
    password: this.password,
    password2: this.password2
  })

  constructor(private validationService: ValidationService) {
  }

  getErrorMessagePassword() {
    if(this.password2.hasError('minlength')) {
      return 'Dein Passwort sollte mindestens 8 Zeichen lang sein';
    }
    if(this.password2.hasError('check')) {
      return 'Die Passwörter stimmen nicht überein'
    }
    return;
  }

}
