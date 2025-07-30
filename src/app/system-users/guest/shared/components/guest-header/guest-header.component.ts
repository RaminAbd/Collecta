import {Component, ElementRef} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-guest-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './guest-header.component.html',
  styleUrl: './guest-header.component.scss',
  animations: [
    trigger('menuExpand', [
      state('open', style({
        height: '*', // Fully expanded
        visibility: 'visible'
      })),
      state('closed', style({
        height: '0px', // Collapsed
        visibility: 'hidden'
      })),
      transition('open <=> closed', [
        animate('500ms ease-in-out') // Animate height change
      ]),
    ])
  ]
})
export class GuestHeaderComponent {
  isOpen: boolean = false;

  constructor(private el: ElementRef) {}

  toggleMenu() {
    if(this.isOpen){
      this.isOpen = false;
    }
    else{
      this.isOpen = true;
    }
  }
}
