import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public router: Router) {
  }

  toLogin(): void {
    this.router.navigate(['/login/']);
  }

  toStartpage(): void {
    this.router.navigate(['']);
  }
}
