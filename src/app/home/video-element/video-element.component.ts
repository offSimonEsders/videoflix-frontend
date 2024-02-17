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

  /**
   * Returns the url to the thumbnail
   * */
  getThumbnail(): string {
    return environment.apiUrl + this.video?.thumbnail + '/';
  }

}
