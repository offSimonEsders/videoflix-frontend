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

  /**
   * Sends a new Videoflixuser to the backend. The backend the response if it was successfully
   *
   * @param {Videoflixuser} user
   * */
  async register(user: Videoflixuser) {
    try {
      return await fetch(URL + '/users/register/', {method: 'POST', body: JSON.stringify(user)});
    } catch {
      return
    }
  }

  /**
   * Sends the data to the backend and returns the response
   *
   * @param email
   * @param password
   * */
  async login(email: string, password: string): Promise<Response | undefined> {
    try {
      return await fetch(URL + '/users/login/', {
        method: 'POST',
        body: JSON.stringify({email: email, password: password})
      });
    } catch {
      return;
    }
  }

  /**
   * Sends a delete request to the backend where the auth token from the user gets deleted so the user has be logged in again
   * */
  async logout(): Promise<Response | undefined> {
    const authtoken: string | null = localStorage.getItem('authtoken')
    try {
      return await fetch(URL + '/users/logout/', {
        method: 'DELETE',
        headers: {Authorization: `Token ${authtoken}`},
        body: JSON.stringify({token: authtoken})
      });
    } catch {
      return;
    }
  }

  async checkToken(): Promise<Response | undefined> {
    const authtoken: string | null = localStorage.getItem('authtoken');
    try {
      return await fetch(URL + '/users/checktoken/', {method: 'POST', headers: {Authorization: `Token ${authtoken}`}});
    } catch {
      return;
    }
  }

}
