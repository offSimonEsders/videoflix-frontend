import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Video} from "../models/video";
import {NgOptimizedImage, NgStyle} from "@angular/common";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-video-info',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgStyle
  ],
  templateUrl: './video-info.component.html',
  styleUrl: './video-info.component.scss'
})
export class VideoInfoComponent{
  @Input() video?: Video;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() play: EventEmitter<Video> = new EventEmitter<Video>();
  protected readonly NaN = NaN;

  /**
   * Sends an event to the home component to close the video info popup
   * */
  closeVideoInfo(): void {
    this.close.emit(true);
  }

  /**
   * returns the url to the thumbanail
   * */
  getThumbnail(): string {
    return environment.apiUrl + this.video?.thumbnail + '/';
  }

  /**
   * Emits video to the player
   * */
  playVideo(): void {
    this.play.emit(this.video);
  }

}
