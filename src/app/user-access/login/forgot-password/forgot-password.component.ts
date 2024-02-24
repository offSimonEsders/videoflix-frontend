import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {ValidationService} from "../../../services/validation.service";
import {BackendServiceService} from "../../../services/backend-service.service";

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
  @ViewChild('emailinput') emailinput?: ElementRef;
  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  email: FormControl<string | null> = new FormControl('', [Validators.required, this.validation.validateEmail.bind(this)]);

  constructor(private validation: ValidationService, private backendService: BackendServiceService) {
  }

  getErrorMessageEmail(): string | undefined {
    return this.validation.getErrorMessageEmail(this.email);
  }

  async sendMail() {
    const email: string | null = this.email.value;
    if(email && this.email.valid) {
      const resp = await this.backendService.requestResetPassword(email);
      console.log(resp)
      this.closeEvent.emit(true);
    } else {
      this.emailinput?.nativeElement.focus();
    }

  }

}
