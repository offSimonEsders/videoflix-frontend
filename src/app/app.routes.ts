import { Routes } from '@angular/router';
import {StartPageComponent} from "./user-access/start-page/start-page.component";
import {LoginComponent} from "./user-access/login/login.component";

export const routes: Routes = [
  {path: '', component: StartPageComponent},
  {path: 'login', component: LoginComponent}
];
