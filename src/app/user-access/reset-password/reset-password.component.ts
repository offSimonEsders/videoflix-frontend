import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {HeaderComponent} from "../header/header.component";
import {ValidationService} from "../../services/validation.service";
import {BackendServiceService} from "../../services/backend-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgClass,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  show: number = 0;
  password: FormControl<string | null> = new FormControl('', [Validators.required, Validators.minLength(8)]);
  password2: FormControl<string | null> = new FormControl('', [Validators.required, Validators.minLength(8), this.validationService.validatePasswords.bind(this, this.password)]);

  pwFormGroup: FormGroup = new FormGroup({
    password: this.password,
    password2: this.password2
  });

  key: string | null = this.route.snapshot.queryParamMap.get('key');
  showFeedback: boolean = false;

  constructor(private validationService: ValidationService, private backendService: BackendServiceService, private router: Router, private route: ActivatedRoute) {
    if (this.key === null) {
      this.show = 2;
    }
    this.checkKey();
  }

  /**
   * Depending on the error the password2 has it returns a text for the client
   * */
  getErrorMessagePassword() {
    if (this.password2.hasError('minlength')) {
      return 'Dein Passwort sollte mindestens 8 Zeichen lang sein';
    }
    if (this.password2.hasError('check')) {
      return 'Die Passwörter stimmen nicht überein'
    }
    return;
  }

  /**
   * Sends the authkey to the backend and checks if the key exists
   * */
  async checkKey(): Promise<void> {
    if (this.key) {
      const resp: Response | undefined = await this.backendService.checkKey(this.key);
      if (resp?.ok) {
        this.show = 1;
      } else {
        this.show = 2;
      }
    }
  }

  /**
   * Sends the new password to the backend and resets the form
   * */
  async changePassword(): Promise<void> {
    const password: string | null = this.password2.value
    if (password && this.key && this.pwFormGroup.valid) {
      const resp: Response | undefined = await this.backendService.changePassword(this.key, password);
      this.pwFormGroup.reset();
      this.userFeedback(!!(await resp?.ok));
    }
  }

  /**
   * When ok is true it sends the client to the login. Else it shows him an errormessage
   * */
  userFeedback(ok: boolean) {
    if(ok) {
      this.router.navigate(['login']);
    } else {
      this.showFeedback = true;
    }
  }

  hideFeedback(): void {
    this.showFeedback = false;
  }

}
