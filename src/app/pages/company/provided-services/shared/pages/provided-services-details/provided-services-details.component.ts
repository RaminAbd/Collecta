import {Component, inject} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ProvidedServicesUpsertService} from "../provided-services-upsert/provided-services-upsert.service";
import {ProvidedServicesRequestModel} from "../../models/provided-services-request.model";
import {ProvidedServicesDetailsService} from "./provided-services-details.service";

@Component({
  selector: 'app-provided-services-details',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    NgIf,
    RouterLink,
    NgClass
  ],
  templateUrl: './provided-services-details.component.html',
  styleUrl: './provided-services-details.component.scss'
})
export class ProvidedServicesDetailsComponent {
  private service: ProvidedServicesDetailsService = inject(
    ProvidedServicesDetailsService
  );
  private route: ActivatedRoute = inject(ActivatedRoute);
  request: ProvidedServicesRequestModel = new ProvidedServicesRequestModel();
  id = this.route.snapshot.paramMap.get('id') as string;
  isSubmitted: boolean = false;
  collectionTypes:any[]=[
    {name:'Type 1', value:1},
    {name:'Type 2', value:2},
    {name:'Type 3', value:3},
  ]
  constructor() {
    this.service.component = this;
    this.service.getItem();
  }

  getFileName(fileName: string): string {
    if (fileName) {
      if (fileName.length > 30) {
        return this.changeFileName(fileName);
      } else {
        return fileName;
      }
    } else {
      return '';
    }
  }

  changeFileName(name: string) {
    return (
      name.substring(0, 10) +
      '...' +
      name.substring(name.length - 5, name.length)
    );
  }

  activate(){
    this.service.activate();
  }
  deactivate(){
    this.service.deactivate();
  }
}
