import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {BackendServiceService} from "../../services/backend-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-header',
  standalone: true,
  imports: [],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.scss'
})
export class HomeHeaderComponent {
  @ViewChild('nav') nav?: ElementRef;

  constructor(private backendService: BackendServiceService, private router: Router) {
  }

  /**
   * Sends the authkey to the backend so the session can be ended
   * */
  logout() {
    this.backendService.logout();
    localStorage.clear();
    this.router.navigate([''])
  }

  navigateHome(): void {
    this.router.navigate(['home']);
  }

  navigateMovies(): void {
    this.router.navigate(['home/movies']);
  }

  navigateSeries(): void {
    this.router.navigate(['home/series']);
  }

  toggleMenu() {
    if (this.nav) {
      if (window.innerWidth <= 600) {
        if (this.nav?.nativeElement.style.display === 'flex') {
          this.nav.nativeElement.style.display = 'none';
        } else {
          this.nav.nativeElement.style.display = 'flex';
        }
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  showNav(): void {
    if (this.nav && window.innerWidth > 600 && this.nav.nativeElement.style.display === 'none') {
      this.nav.nativeElement.style.display = 'flex';
    }
  }

}
