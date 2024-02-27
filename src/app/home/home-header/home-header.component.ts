import { Component } from '@angular/core';
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

}
