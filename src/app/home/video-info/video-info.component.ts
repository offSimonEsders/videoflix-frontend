import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Video} from "../models/video";
import {NgFor, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {environment} from "../../environments/environment";
import {Serie} from "../models/serie";
import {EpisodeComponent} from "./episode/episode.component";

@Component({
  selector: 'app-video-info',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgStyle,
    EpisodeComponent,
    NgIf,
    NgFor
  ],
  templateUrl: './video-info.component.html',
  styleUrl: './video-info.component.scss'
})
export class VideoInfoComponent implements OnInit{
  @Input() video?: Video | Serie;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() play: EventEmitter<Video> = new EventEmitter<Video>();
  serie?: Serie;
  protected readonly NaN = NaN;

  ngOnInit() {
    if(this.video?.hasOwnProperty('episodes')) {
      this.serie = this.video as Serie;
    }
  }

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
    if(this.video instanceof Video) {
      this.play.emit(this.video);
    } else {
      this.play.emit(this.video?.episodes[0]);
    }
  }

}
