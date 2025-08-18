import {Component, Input} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {SkeletonModule} from "primeng/skeleton";
import {TableModule} from "primeng/table";
import {TableComponent} from "../../../../../../shared/components/table/table.component";

@Component({
  selector: 'app-customers-table',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    PrimeTemplate,
    SkeletonModule,
    TableModule,
    NgClass,
    NgStyle
  ],
  templateUrl: './customers-table.component.html',
  styleUrl: './customers-table.component.scss'
})
export class CustomersTableComponent extends TableComponent{
  @Input() tableDescription:string = ''
}
