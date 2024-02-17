import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {Video} from "../models/video";
import {environment} from "../../environments/environment";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent implements OnInit {
  @Input() videoToPlay?: Video;
  @ViewChild('video') video?: ElementRef<HTMLVideoElement>;
  @ViewChild('actionbtns') actionbtns?: ElementRef<HTMLDivElement>;
  videoURL?: string;
  mouseTime: number = this.getMouseTime();

  ngOnInit() {
    this.videoURL = environment.apiUrl + this.videoToPlay?.original_video + '/';
  }

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

  videoPausePlay() {
    if (this.video?.nativeElement.paused) {
      this.video?.nativeElement.play();
      return;
    }
    this.video?.nativeElement.pause();
  }

  skipForwards() {
    if (this.video) {
      this.video.nativeElement.currentTime += 10;
    }
  }

  skipBackwards() {
    if (this.video) {
      this.video.nativeElement.currentTime -= 10;
    }
  }

  mouseMoved() {
    clearTimeout(this.mouseTime);
    if (this.actionbtns) {
      this.actionbtns.nativeElement.style.display = 'flex';
    }
    this.mouseTime = this.getMouseTime();
  }

  getMouseTime() {
    return setTimeout(() => {
      if (this.actionbtns) {
        this.actionbtns.nativeElement.style.display = 'none';
      }
    }, 2000);
  }

  protected readonly clearTimeout = clearTimeout;
}
