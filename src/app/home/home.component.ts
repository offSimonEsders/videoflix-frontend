import {Component, Input, OnInit} from '@angular/core';
import {HomeHeaderComponent} from "./home-header/home-header.component";
import {BannerComponent} from "./banner/banner.component";
import {BackendServiceService} from "../services/backend-service.service";
import {Video} from "./models/video";
import {VideoInfoComponent} from "./video-info/video-info.component";
import {NgForOf, NgIf} from "@angular/common";
import {VideoElementComponent} from "./video-element/video-element.component";
import {VideoPlayerComponent} from "./video-player/video-player.component";
import {Router, RouterOutlet} from "@angular/router";
import {FooterComponent} from "../user-access/footer/footer.component";
import {Serie} from "./models/serie";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeHeaderComponent,
    BannerComponent,
    VideoInfoComponent,
    NgIf,
    VideoElementComponent,
    NgForOf,
    VideoPlayerComponent,
    RouterOutlet,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  videos?: Video[];
  series?: any;
  bannerVideo?: Video;
  videoInfo?: Video | Serie = undefined;
  videoToPlay?: Video = undefined;

  constructor(private backendService: BackendServiceService, public router: Router) {
    if(this.bannerVideo === undefined) {
      this.router.navigate(['home']);
    }
  }

  async ngOnInit() {
    await this.getMedia();
    this.getRandomBannerVideo();
  }

  async getMedia() {
    const resp: Response | undefined = await this.backendService.getSeriesAndMovies();
    const data = await resp?.json();
    if(data) {
      this.videos = data['movies'];
      this.series = data['series'];
      console.log(data)
    }
  }

  /**
   * Sets Banner video to random index of the data
   * */
  getRandomBannerVideo(): void {
    if(this.videos) {
      const index: number = Math.round((this.videos.length - 1) * Math.random());
      if(index) {
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

  setVideoInfo(video: Video | Serie): void {
    this.videoInfo = video;
  }

  setVideoToPlayAndOpenVideoplayer(video: Video): void {
    this.videoToPlay = video;
    this.videoInfo = undefined;
    this.router.navigate(['home/videoplayer']);
  }

  playFirstVideoOfSerie(element: Serie | Video): void {
    if(element.hasOwnProperty('episodes')) {
      const serie: Serie = element as Serie;
      const firstVideo: Video = serie.episodes[0] as Video;
      if(firstVideo) {
        this.setVideoToPlayAndOpenVideoplayer(firstVideo);
      }
    } else {
      this.setVideoToPlayAndOpenVideoplayer(element as Video);
    }
  }

}
