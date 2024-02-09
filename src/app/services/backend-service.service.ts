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

  async login(email: string, password: string) {
    try {
      return await fetch(URL + '/users/login/', {method:'POST', body: JSON.stringify({email: email, password: password})});
    } catch {
      return
    }
  }

}
