import {Component, Input} from '@angular/core';
import {Video} from "../models/video";

@Component({
  selector: 'app-video-info',
  standalone: true,
  imports: [],
  templateUrl: './video-info.component.html',
  styleUrl: './video-info.component.scss'
})
export class VideoInfoComponent {
  @Input() video?: Video;
}
