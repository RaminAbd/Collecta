import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomersUpsertService } from './customers-upsert.service';
import { CustomersRequestModel } from '../../models/customers-request.model';
import { FormsModule } from '@angular/forms';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { forkJoin } from 'rxjs';
import {
  ProvidedServicesResponseModel
} from "../../../../provided-services/shared/models/provided-services-response.model";
import {DropdownModule} from "primeng/dropdown";
import {SubscriptionModel} from "../../models/subscription.model";

@Component({
  selector: 'app-customers-upsert',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink, NgClass, NgForOf, DropdownModule],
  templateUrl: './customers-upsert.component.html',
  styleUrl: './customers-upsert.component.scss',
})
export class CustomersUpsertComponent {
  private service: CustomersUpsertService = inject(CustomersUpsertService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  request: CustomersRequestModel = new CustomersRequestModel();
  id = this.route.snapshot.paramMap.get('id') as string;
  isSubmitted: boolean = false;
  providedServices:ProvidedServicesResponseModel[];
  constructor() {
    this.service.component = this;
    this.service.getAllProvidedServices()

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

  async getDoc(e: any) {
    this.request.document.fileLoading = true;

    const files = e.target.files;
    if (!files || files.length === 0) {
      this.request.document.fileLoading = false;
      return;
    }

    const uploadPromises = [];
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      fd.append('file', files[i]);
      uploadPromises.push(this.service.blob.UploadFile(fd).toPromise()); // convert Observable to Promise
    }

    try {
      const responses = await Promise.all(uploadPromises);
      responses.forEach((resp: any) => {
        this.request.documents.push(resp.data);
      });
    } finally {
      this.request.document.fileLoading = false; // ✅ always stop after last
      this.request.document.fakeFile = null;
    }
  }

  removeDoc(i: number) {
    this.request.documents.splice(i, 1);
  }

  save() {
    this.isSubmitted = true;
    this.service.save();
  }

  addSubscription() {
    this.request.subscriptions.push(new SubscriptionModel())
  }
}
