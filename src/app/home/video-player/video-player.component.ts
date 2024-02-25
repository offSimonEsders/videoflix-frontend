import {AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {Video} from "../models/video";
import {environment} from "../../environments/environment";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent implements AfterViewInit {
  @Input() videoToPlay?: Video;
  @ViewChild('video') video?: ElementRef<HTMLVideoElement>;
  @ViewChild('actionbtns') actionbtns?: ElementRef<HTMLDivElement>;
  videoURL?: string;
  mouseTime: number = this.getMouseTime();
  showSettings: boolean = false;

  constructor(private router: Router) {
  }

  ngAfterViewInit() {
    this.changeToOriginal()
  }

  /**
   * Checks if spezific key is pressed and calls a function
   *
   * @param {KeyboardEvent} keyboardEvent
   * */
  @HostListener('document:keydown', ['$event'])
  getKeyEvents(keyboardEvent: KeyboardEvent): void {
    const code: string = keyboardEvent.code
    switch (code) {
      case 'Space':
        this.videoPausePlay();
        break;
      case 'ArrowRight':
        this.skipForwards();
        break;
      case 'ArrowLeft':
        this.skipBackwards();
        break;
    }
  }

  /**
   * Checks if video is paused. If it is paused it is set to play else it is set to pause
   * */
  videoPausePlay(): void {
    if (this.video?.nativeElement.paused) {
      this.video?.nativeElement.play();
      return;
    }
    this.video?.nativeElement.pause();
  }

  /**
   * Sets the currentTime of the Video += 10 seconds
   * */
  skipForwards(): void {
    if (this.video) {
      this.video.nativeElement.currentTime += 10;
    }
  }

  /**
   * Sets the currentTime of the Video -= 10 seconds
   * */
  skipBackwards(): void {
    if (this.video) {
      this.video.nativeElement.currentTime -= 10;
    }
  }

  /**
   * Clears the mouseTime sets the actionsbtns to display flex and starts the mouseTime again
   * */
  mouseMoved(): void {
    clearTimeout(this.mouseTime);
    if (this.actionbtns) {
      this.actionbtns.nativeElement.style.display = 'flex';
    }
    this.mouseTime = this.getMouseTime();
  }

  /**
   * Returns a Timeout after which the actionbtns are set to display none
   * */
  getMouseTime(): number {
    return setTimeout((): void => {
      if (this.actionbtns) {
        this.actionbtns.nativeElement.style.display = 'none';
      }
    }, 2000);
  }

  /**
   * Sends the client back to the home component
   * */
  backToHome() {
    this.router.navigate(['home']);
  }

  toggleSettings() {
    this.showSettings = !this.showSettings;
  }

  hideSettings(event: Event) {
    const eventElement = event.target as unknown as HTMLElement;
    if(!eventElement.classList.contains('settings')) {
      this.showSettings = false;
    }
  }

  changeQuality(link: string) {
    return environment.apiUrl + link + '/';
  }

  changeSRC(link: string | undefined) {
    if(link && this.video) {
      this.video.nativeElement.src = this.changeQuality(link);
    }
  }

  changeToOriginal() {
    const link: string | undefined = this.videoToPlay?.original_video;
    this.changeSRC(link);
  }

  changeTo720() {
    const link: string | undefined = this.videoToPlay?.video_720p;
    this.changeSRC(link);
  }

  changeTo480() {
    const link: string | undefined = this.videoToPlay?.video_480p;
    this.changeSRC(link);
  }

  protected readonly clearTimeout = clearTimeout;
}
