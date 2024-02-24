import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'videoflix-frontend';

  constructor(private router: Router) {
    const item: string | null = localStorage.getItem('rememberme');
    if (item === 'true') {
      this.router.navigate(['home']);
    }
  }

}
