import {Component, Input, OnInit} from '@angular/core';
import {HomeHeaderComponent} from "./home-header/home-header.component";
import {BannerComponent} from "./banner/banner.component";
import {BackendServiceService} from "../services/backend-service.service";
import {Video} from "./models/video";
import {VideoInfoComponent} from "./video-info/video-info.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeHeaderComponent,
    BannerComponent,
    VideoInfoComponent,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  data?: Video[];
  bannerVideo?: Video;
  videoInfo: Video | undefined = undefined;

  constructor(private backendService: BackendServiceService) {
  }

  async ngOnInit() {
    const resp: Response | undefined = await this.backendService.getContentData();
    this.data = await resp?.json();
    console.log(this.data)
    this.getRandomBannerVideo();
  }

  /**
   * Sets Banner video to random index of the data
   * */
  getRandomBannerVideo(): void {
    if(this.data) {
      const index: number = Math.round(this.data.length * Math.random());
      if(this.data.length > 1 && index > 0) {
        this.bannerVideo = this.data[index];
      } else {
        this.bannerVideo = this.data[0];
      }
    }
  }

  /**
   * Sets videoInfo to undefined to hide the popup
   * */
  closeVideoInfo(): void {
    this.videoInfo = undefined;
  }

}
