import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Video} from "../models/video";
import {environment} from "../../environments/environment";
import {BackendServiceService} from "../../services/backend-service.service";

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnChanges {
  @Input() randomVideo?: any;
  URL: string = environment.apiUrl;
  videoURL?: string;

  constructor(private backendService: BackendServiceService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.randomVideo) {
      this.videoURL = this.URL + this.randomVideo.original_video + '/';
    }
  }

}
