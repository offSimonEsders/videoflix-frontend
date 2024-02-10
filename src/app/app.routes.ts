import { Routes } from '@angular/router';
import {StartPageComponent} from "./user-access/start-page/start-page.component";
import {LoginComponent} from "./user-access/login/login.component";
import {RegistrationComponent} from "./user-access/registration/registration.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuardService} from "./services/auth-guard.service";

export const routes: Routes = [
  {path: '', component: StartPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]}
];
