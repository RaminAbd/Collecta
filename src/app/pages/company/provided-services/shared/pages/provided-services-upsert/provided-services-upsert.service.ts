import { inject, Injectable } from '@angular/core';
import { ProvidedServicesApiService } from '../../services/provided-services.api.service';
import { ApplicationMessageCenterService } from '../../../../../../core/services/ApplicationMessageCenter.service';
import { Router } from '@angular/router';
import { ProvidedServicesUpsertComponent } from './provided-services-upsert.component';
import { BlobService } from '../../../../../../core/services/blob.service';
import {StorageService} from "../../../../../../core/services/storage.service";

@Injectable({
  providedIn: 'root',
})
export class ProvidedServicesUpsertService {
  private service: ProvidedServicesApiService = inject(
    ProvidedServicesApiService
  );
  private message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService
  );
  private router: Router = inject(Router);
  private blob: BlobService = inject(BlobService);
  private storage: StorageService = inject(StorageService);
  component: ProvidedServicesUpsertComponent;

  constructor() {}

  getItem() {
    this.service
      .GetById(this.service.serviceUrl, this.component.id)
      .then((resp: any) => {
        this.component.request = resp.data;
      });
  }

  getFile(e: any, fileHandler: any) {
    const files = e.target.files;
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      fd.append('file', files[i]);
      this.blob.UploadFile(fd).subscribe((resp: any) => {
        fileHandler(resp);
      });
    }
  }

  save() {
    let st = this.storage.getObject('authResponse')
    this.component.request.companyId = st.id
    if (this.isValid())
      this.component.id === 'create' ? this.create() : this.update();
  }

  private create() {
    this.service
      .Create(this.service.serviceUrl, this.component.request)
      .then((resp: any) => {
        console.log(resp);
        if (resp.succeeded) {
          this.message.showSuccessMessage('Successfully created!');
          this.router.navigate(['/main/company/services']);
        }
      });
  }

  private update() {
    this.service
      .Edit(this.service.serviceUrl, this.component.request)
      .then((resp: any) => {
        if (resp.succeeded) {
          this.message.showSuccessMessage('Successfully updated!');
          this.router.navigate(['/main/company/services']);
        }
      });
  }

  private isValid() {
    let result = true;
    if (
      !this.component.request.price ||
      !this.component.request.unit ||
      !this.component.request.name ||
      !this.component.request.reminderInDays ||
      !this.component.request.image.fileUrl
    )
      result = false;

    return result;
  }
}
