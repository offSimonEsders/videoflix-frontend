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

  /**
   * Sends the authtoken to the backend. The backend responses if the authtoken is valid
   * */
  async checkToken(): Promise<Response | undefined> {
    const authtoken: string | null = localStorage.getItem('authtoken');
    try {
      return await fetch(URL + '/users/checktoken/', {method: 'POST', headers: {Authorization: `Token ${authtoken}`}});
    } catch {
      return;
    }
  }

  async checkVerifyToken(token: string) {
    try {
      return await fetch(URL + '/users/checkverifytoken/', {method: 'POST', body: JSON.stringify({token: token})});
    } catch {
      return;
    }
  }

  /**
   * Sends verify token to the backend and gets if user if verified or verifies him
   * */
  async verifyUser(token: string): Promise<Response | undefined> {
    try {
      return await fetch(URL + '/users/verifyuser/', {method: 'POST', body: JSON.stringify({token: token})});
    } catch {
      return;
    }
  }

  /**
   * Downloads all movie data and returns it
   * */
  async getMovies(): Promise<Response | undefined> {
    const authtoken: string | null = localStorage.getItem('authtoken');
    try {
      return await fetch(URL + '/movies/', {method: 'GET', headers: {Authorization: `Token ${authtoken}`}});
    } catch {
      return;
    }
  }

  /**
   * Downloads all series data and returns it
   * */
  async getSeries() {
    const authtoken: string | null = localStorage.getItem('authtoken');
    try {
      return await fetch(URL + '/series/', {method: 'GET', headers: {Authorization: `Token ${authtoken}`}});
    } catch {
      return;
    }
  }

  /**
   * Downloads all series and movie data and returns it
   * */
  async getSeriesAndMovies() {
    const authtoken: string | null = localStorage.getItem('authtoken');
    try {
      return await fetch(URL + '/moviesandseries/', {method: 'GET', headers: {Authorization: `Token ${authtoken}`}});
    } catch {
      return;
    }
  }

  async requestResetPassword(email: string): Promise<Response | undefined> {
    try {
      return await fetch(URL + '/users/requestresetpassword/', {
        method: 'POST',
        body: JSON.stringify({email: email})
      });
    } catch {
      return;
    }
  }

  async checkKey(key: string): Promise<Response | undefined> {
    try {
      return await fetch(URL + '/users/checkresetcode/', {method: 'POST', body: JSON.stringify({token: key})});
    } catch {
      return;
    }
  }

  async changePassword(resetcode:string, password: string): Promise<Response | undefined> {
    try {
      return await fetch(URL + '/users/changepassword/', {method: 'POST', body: JSON.stringify({token: resetcode, password: password})});
    } catch {
      return;
    }
  }

}
