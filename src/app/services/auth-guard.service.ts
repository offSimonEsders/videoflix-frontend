import {Injectable} from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {Observable} from "rxjs";
import {BackendServiceService} from "./backend-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private backendService: BackendServiceService, private router: Router) {
  }

  /**
   * Returns if user authtoken is valid
   * */
  async canActivate(): Promise<boolean> {
    const resp: Response | undefined = await this.backendService.checkToken();
    if(resp?.ok) {
      return true;
    }
    return this.router.navigate(['login'])
  }

}
