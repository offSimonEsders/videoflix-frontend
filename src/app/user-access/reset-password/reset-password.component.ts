import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {HeaderComponent} from "../header/header.component";
import {ValidationService} from "../../services/validation.service";
import {BackendServiceService} from "../../services/backend-service.service";
import {ActivatedRoute, Router} from "@angular/router";

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
  show: number = 0;
  password: FormControl<string | null> = new FormControl('', [Validators.required, Validators.minLength(8)]);
  password2: FormControl<string | null> = new FormControl('', [Validators.required, Validators.minLength(8), this.validationService.validatePasswords.bind(this, this.password)]);

  pwFormGroup: FormGroup = new FormGroup({
    password: this.password,
    password2: this.password2
  });

  key: string | null = this.route.snapshot.queryParamMap.get('key');

  constructor(private validationService: ValidationService, private backendService: BackendServiceService, private router: Router, private route: ActivatedRoute) {
    if(this.key === null) {
      this.show = 2;
    }
    this.checkKey();
  }

  getErrorMessagePassword() {
    if (this.password2.hasError('minlength')) {
      return 'Dein Passwort sollte mindestens 8 Zeichen lang sein';
    }
    if (this.password2.hasError('check')) {
      return 'Die Passwörter stimmen nicht überein'
    }
    return;
  }

  async checkKey() {
    if(this.key) {
      const resp = await this.backendService.checkKey(this.key);
      if(resp?.ok) {
        this.show = 1;
      } else {
        this.show = 2;
      }
    }
  }

}
