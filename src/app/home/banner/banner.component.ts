import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Video} from "../models/video";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnChanges {
  @Input() randomVideo?: Video;
  @Output() videoToInfo: EventEmitter<Video> = new EventEmitter<Video>();
  @Output() playVideo: EventEmitter<Video> = new EventEmitter<Video>();
  URL: string = environment.apiUrl;
  videoURL?: string;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.randomVideo) {
      this.videoURL = this.URL + this.randomVideo.original_video + '/';
    }
  }

  /**
   * Emits the given video to home to play it in the Videoplayer
   * */
  sendVideoToPlay(): void {
    this.playVideo.emit(this.randomVideo);
  }

}
