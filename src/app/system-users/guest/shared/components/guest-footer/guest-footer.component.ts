import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-guest-footer',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './guest-footer.component.html',
  styleUrl: './guest-footer.component.scss'
})
export class GuestFooterComponent {

}
