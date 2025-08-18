import {Component, Input} from '@angular/core';
import {TableComponent} from "../../../../../../shared/components/table/table.component";
import {TableModule} from "primeng/table";
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {SkeletonModule} from "primeng/skeleton";

@Component({
  selector: 'app-provided-services-table',
  standalone: true,
  imports: [
    TableModule,
    NgIf,
    NgStyle,
    SkeletonModule,
    NgForOf,
    NgClass
  ],
  templateUrl: './provided-services-table.component.html',
  styleUrl: './provided-services-table.component.scss'
})
export class ProvidedServicesTableComponent extends TableComponent{
  @Input() tableDescription:string = ''
}
