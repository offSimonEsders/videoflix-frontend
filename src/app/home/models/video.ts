export class Video {
  description: string;
  id?: number;
  original_video: string;
  thumbnail: string;
  title: string;
  video_480p: string;
  video_720p: string;

  constructor(description: string, original_video: string, thumbnail: string, title: string, video_480p: string, video_720p: string) {
    this.description = description;
    this.original_video = original_video;
    this.thumbnail = thumbnail;
    this.title = title;
    this.video_480p = video_480p;
    this.video_720p = video_720p;
  }

}
