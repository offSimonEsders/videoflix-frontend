import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {ValidationService} from "../../../services/validation.service";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  email: FormControl<string | null> = new FormControl('', [Validators.required, this.validation.validateEmail.bind(this)]);

  constructor(private validation: ValidationService) {
  }

  getErrorMessageEmail(): string | undefined {
    return this.validation.getErrorMessageEmail(this.email);
  }

}
