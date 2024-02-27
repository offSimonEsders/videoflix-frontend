import {Component, OnInit} from '@angular/core';
import {HomeHeaderComponent} from "./home-header/home-header.component";
import {BannerComponent} from "./banner/banner.component";
import {BackendServiceService} from "../services/backend-service.service";
import {Video} from "./models/video";
import {VideoInfoComponent} from "./video-info/video-info.component";
import {NgForOf, NgIf} from "@angular/common";
import {VideoElementComponent} from "./video-element/video-element.component";
import {VideoPlayerComponent} from "./video-player/video-player.component";
import {NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {FooterComponent} from "../user-access/footer/footer.component";
import {Serie} from "./models/serie";
import {filter} from "rxjs/operators";
import {Observable} from "rxjs";

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
  }

  ngOnInit() {
    this.loadData();
    const events: Observable<any> = this.router.events.pipe(filter(event => event instanceof NavigationEnd));
    events.subscribe((): void => {
      this.loadData();
    })
  }

  /**
   * Downloads the data from the server specific on the url
   * */
  async loadData(): Promise<void> {
    if (this.router.url === '/home/movies') {
      await this.loadMovies();
    } else if (this.router.url === '/home/series') {
      await this.loadSeries();
    } else {
      await this.getMedia();
    }
    this.getRandomBannerVideo();
  }

  /**
   * Checks if a video is playing. Else it sends the client to the home
   * */
  checkIfVideoToPlay(): void {
    if (this.bannerVideo === undefined && this.router.url === '/home/videoplayer') {
      this.router.navigate(['home']);
    }
  }

  /**
   * Downloads the movie and series data from the server. Turns it to a json and gives it to the variables
   * */
  async getMedia(): Promise<void> {
    const resp: Response | undefined = await this.backendService.getSeriesAndMovies();
    const data = await resp?.json();
    if (data) {
      this.videos = data['movies'];
      this.series = data['series'];
    }
  }

  /**
   * Sets the series to undefined and loads the movie data from the server.
   * */
  async loadMovies(): Promise<void> {
    this.series = undefined;
    const resp: Response | undefined = await this.backendService.getMovies();
    this.videos = await resp?.json();
  }

  /**
   * Sets the movie to undefined and loads the series data from the server.
   * */
  async loadSeries(): Promise<void> {
    this.videos = undefined;
    const resp: Response | undefined = await this.backendService.getSeries();
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

  /**
   * Adds all videos to the videoList
   * */
  addVideosToList(videoList: Video[]): void {
    if (this.videos) {
      for (let video of this.videos) {
        videoList.push(video);
      }
    }
  }

  /**
   * Adds the first video of every series to the videoList
   * */
  addSeriesToList(videoList: Video[]): void {
    if (this.series) {
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

  /**
   * Sets the given video to videoInfo so it can be displayed on the screen
   *
   * @param video
   * */
  setVideoInfo(video: Video | Serie): void {
    this.videoInfo = video;
  }

  /**
   * Sets a video to. Closes the videoInfo and loads the videoplayer
   * */
  setVideoToPlayAndOpenVideoplayer(video: Video): void {
    this.videoToPlay = video;
    this.videoInfo = undefined;
    this.router.navigate(['home/videoplayer']);
  }

  /**
   * Sets the first video of a serie to the videoplayer. If it is not a serie it will be played by the videoplayer
   * */
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
