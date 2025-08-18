import { Component, inject } from '@angular/core';
import { ProvidedServicesUpsertService } from './provided-services-upsert.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ProvidedServicesRequestModel} from "../../models/provided-services-request.model";
import {NgClass, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";

@Component({
  selector: 'app-provided-services-upsert',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    DropdownModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './provided-services-upsert.component.html',
  styleUrl: './provided-services-upsert.component.scss',
})
export class ProvidedServicesUpsertComponent {
  private service: ProvidedServicesUpsertService = inject(
    ProvidedServicesUpsertService
  );
  private route: ActivatedRoute = inject(ActivatedRoute);
  request: ProvidedServicesRequestModel = new ProvidedServicesRequestModel();
  id = this.route.snapshot.paramMap.get('id') as string;
  isSubmitted: boolean = false;
  constructor() {
    this.service.component = this;
    if (this.id !== 'create') this.service.getItem();
  }

  getFile(e: any) {
    this.request.image.fileLoading = true;
    this.service.getFile(e, (resp: any) => {
      this.request.image = resp.data;
      this.request.image.fileLoading = false;
      this.request.image.isValid = true;
      this.request.image.fakeFile = null;
    });
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

  save() {
    this.isSubmitted = true;
    this.service.save();
  }
}
