import { Component } from '@angular/core';
import {HeaderComponent} from "../../user-access/header/header.component";

@Component({
  selector: 'app-dsgvo',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './dsgvo.component.html',
  styleUrl: './dsgvo.component.scss'
})
export class DSGVOComponent {

}
