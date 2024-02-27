import {Component, Input} from '@angular/core';
import {Video} from "../../models/video";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-episode',
  standalone: true,
  imports: [],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.scss'
})
export class EpisodeComponent {
  @Input() episode?: Video;
  URL = environment.apiUrl;

  getThumbnailUrl() {
    if(this.episode) {
      return this.URL + this.episode.thumbnail + '/';
    }
    return;
  }

}
