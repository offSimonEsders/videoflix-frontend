import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {BackendServiceService} from "../../services/backend-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    NgIf
  ],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss'
})
export class VerifyComponent implements OnInit {
  verified: boolean | undefined = undefined;
  feedback: string | undefined;
  token: string | null = this.route.snapshot.queryParamMap.get('key');
  showFeedback: boolean = false;

  constructor(private backendService: BackendServiceService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.checkIfVerificationCodeIsValid();
  }

  async checkIfVerificationCodeIsValid(): Promise<void> {
    if (this.token) {
      const resp = await this.backendService.checkVerifyToken(this.token);
      if (resp?.status === 208 || resp?.status === 400) {
        const respj = await resp.json();
        this.verified = true;
        this.feedback = respj.response;
      } else {
        this.verified = false;
      }
    } else {
    }
  }

  async verifyUser() {
    if (this.token) {
      const resp = await this.backendService.verifyUser(this.token);
      if(resp?.ok) {
        this.router.navigate(['login']);
      }
      this.showFeedback = true;
    }
  }

}
