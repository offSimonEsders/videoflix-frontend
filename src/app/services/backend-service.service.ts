import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {Videoflixuser} from "../modules/videoflixuser";
const URL: string = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  constructor() {
  }

  async register(user: Videoflixuser) {
    try {
      return await fetch(URL + '/users/register/', {method:'POST', body: JSON.stringify(user)});
    } catch {
      return
    }
  }

}
