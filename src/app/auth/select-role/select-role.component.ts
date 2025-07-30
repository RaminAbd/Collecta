import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-select-role',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    TranslatePipe,
    NgClass
  ],
  templateUrl: './select-role.component.html',
  styleUrl: './select-role.component.scss'
})
export class SelectRoleComponent {
  selectedRole:string = 'business'

}
