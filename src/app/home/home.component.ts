import {Component, Input, OnInit} from '@angular/core';
import {HomeHeaderComponent} from "./home-header/home-header.component";
import {BannerComponent} from "./banner/banner.component";
import {BackendServiceService} from "../services/backend-service.service";
import {Video} from "./models/video";

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
export class HomeComponent implements OnInit {
  data?: Video[];
  bannerVideo?: Video;

  constructor(private backendService: BackendServiceService) {
  }

  async ngOnInit() {
    const resp: Response | undefined = await this.backendService.getContentData();
    this.data = await resp?.json();
    console.log(this.data)
    this.getRandomBannerVideo();
  }

  getRandomBannerVideo() {
    if(this.data) {
      const index: number = Math.round(this.data.length * Math.random());
      this.bannerVideo = this.data[0];
      console.log(this.bannerVideo)
    }
  }

}
