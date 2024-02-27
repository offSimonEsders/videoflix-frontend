import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Video} from "../models/video";
import {NgStyle} from "@angular/common";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-video-element',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './video-element.component.html',
  styleUrl: './video-element.component.scss'
})
export class VideoElementComponent {
  @Input() video?: Video;
  @Output() videoToInfo: EventEmitter<Video> = new EventEmitter<Video>();
  @Output() playVideo: EventEmitter<Video> = new EventEmitter<Video>();

  /**
   * Returns the url to the thumbnail
   * */
  getThumbnail(): string {
    return environment.apiUrl + this.video?.thumbnail + '/';
  }

  /**
   * Checks if event target contains the class info-button. If not it emits the video to the home compoenent which opens the videoplayer
   *
   * @param {Event} event
   * */
  sendVideoToPlay(event: Event): void {
    const eventTarget: HTMLElement = event.target as unknown as HTMLElement;
    if (!eventTarget.classList.contains('info-button')) {
      this.playVideo.emit(this.video);
    }
  }

}
