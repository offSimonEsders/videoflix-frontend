import {Component, OnInit} from '@angular/core';
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
    this.checkIfVideoToPlay();
    this.router.events.subscribe((event) => this.loadData());
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    if (this.router.url === '/home/movies') {
      await this.loadMovies();
    } else if (this.router.url === '/home/series') {
      await this.loadSeries();
    } else {
      await this.getMedia();
    }
    this.getRandomBannerVideo();
  }

  checkIfVideoToPlay() {
    if (this.bannerVideo === undefined && this.router.url === '/home/videoplayer') {
      this.router.navigate(['home']);
    }
  }

  async getMedia() {
    const resp: Response | undefined = await this.backendService.getSeriesAndMovies();
    const data = await resp?.json();
    if (data) {
      this.videos = data['movies'];
      this.series = data['series'];
    }
  }

  async loadMovies() {
    const resp: Response | undefined = await this.backendService.getMovies();
    this.videos = await resp?.json();
    this.series = undefined;
  }

  async loadSeries() {
    const resp: Response | undefined = await this.backendService.getSeries();
    this.videos = undefined;
    this.series = await resp?.json();
  }

  /**
   * Sets Banner video to random index of the data
   * */
  getRandomBannerVideo(): void {
    let videoList: Video[] = [];
    this.addVideosToList(videoList);
    this.addSeriesToList(videoList);
    if (videoList) {
      const index: number = Math.round((videoList?.length - 1) * Math.random());
      this.bannerVideo = videoList[index];
    }
  }

  addVideosToList(videoList: Video[]): void {
    if (this.videos) {
      for(let video of this.videos) {
        videoList.push(video);
      }
    }
  }

  addSeriesToList(videoList: Video[]): void {
    if(this.series) {
      for (let video of this.series) {
        videoList.push(video.episodes[0]);
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
    if (element.hasOwnProperty('episodes')) {
      const serie: Serie = element as Serie;
      const firstVideo: Video = serie.episodes[0] as Video;
      if (firstVideo) {
        this.setVideoToPlayAndOpenVideoplayer(firstVideo);
      }
    } else {
      this.setVideoToPlayAndOpenVideoplayer(element as Video);
    }
  }

  protected readonly Video = Video;
}
