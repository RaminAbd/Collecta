import {Component, ElementRef, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgIf} from "@angular/common";
import {animate, state, style, transition, trigger} from "@angular/animations";
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
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
export class HeaderComponent implements OnInit {
  isOpen: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
  }

  toggleMenu() {
    if(this.isOpen){
      this.isOpen = false;
    }
    else{
      this.isOpen = true;
    }
  }
}
