import {Component, Input, OnInit} from '@angular/core';
import {HomeHeaderComponent} from "./home-header/home-header.component";
import {BannerComponent} from "./banner/banner.component";
import {BackendServiceService} from "../services/backend-service.service";
import {Video} from "./models/video";
import {VideoInfoComponent} from "./video-info/video-info.component";
import {NgForOf, NgIf} from "@angular/common";
import {VideoElementComponent} from "./video-element/video-element.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeHeaderComponent,
    BannerComponent,
    VideoInfoComponent,
    NgIf,
    VideoElementComponent,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  videos?: Video[];
  bannerVideo?: Video;
  videoInfo: Video | undefined = undefined;

  constructor(private backendService: BackendServiceService) {
  }

  async ngOnInit() {
    const resp: Response | undefined = await this.backendService.getContentData();
    this.videos = await resp?.json();
    console.log(this.videos)
    this.getRandomBannerVideo();
  }

  /**
   * Sets Banner video to random index of the data
   * */
  getRandomBannerVideo(): void {
    if(this.videos) {
      const index: number = Math.round(this.videos.length * Math.random());
      if(this.videos.length > 1 && index > 0) {
        this.bannerVideo = this.videos[index];
      } else {
        this.bannerVideo = this.videos[0];
      }
    }
  }

  /**
   * Sets videoInfo to undefined to hide the popup
   * */
  closeVideoInfo(): void {
    this.videoInfo = undefined;
  }

  setVideoInfo(video: Video): void {
    this.videoInfo = video;
  }

}
