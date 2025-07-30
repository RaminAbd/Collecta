import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {GuestHeaderComponent} from "./shared/components/guest-header/guest-header.component";
import {GuestFooterComponent} from "./shared/components/guest-footer/guest-footer.component";

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [
    RouterOutlet,
    GuestHeaderComponent,
    GuestFooterComponent
  ],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.scss'
})
export class GuestComponent {

}
