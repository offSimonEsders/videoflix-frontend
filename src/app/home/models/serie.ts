import {Video} from "./video";

export class Serie {
  title: string;
  description: string;
  thumbnail: string;
  episodes: Video[];

  constructor(title: string, description: string, thumbnail: string, episodes: Video[]) {
    this.title = title;
    this.description = description;
    this.thumbnail = thumbnail;
    this.episodes = episodes;
  }

}
