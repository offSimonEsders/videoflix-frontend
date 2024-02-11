import {Component, Input} from '@angular/core';
import {HomeHeaderComponent} from "./home-header/home-header.component";
import {BannerComponent} from "./banner/banner.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeHeaderComponent,
    BannerComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
