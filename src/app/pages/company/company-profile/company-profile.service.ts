import { inject, Injectable } from '@angular/core';
import { CompaniesApiService } from '../../../auth/shared/services/companies.api.service';
import { CompanyProfileComponent } from './company-profile.component';
import { StorageService } from '../../../core/services/storage.service';
import { BlobService } from '../../../core/services/blob.service';
import { ApplicationMessageCenterService } from '../../../core/services/ApplicationMessageCenter.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyProfileService {
  private service: CompaniesApiService = inject(CompaniesApiService);
  private storage: StorageService = inject(StorageService);
  private blob: BlobService = inject(BlobService);
  private message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService
  );
  component: CompanyProfileComponent;
  constructor() {}

  getCompany() {
    let st = this.storage.getObject('authResponse');
    this.service.GetById(this.service.serviceUrl, st.id).then((resp: any) => {
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

  update() {
    this.service
      .Edit(this.service.serviceUrl, this.component.request)
      .then((resp: any) => {
        this.message.showTranslatedSuccessMessage(
          'Profile updated successfully.'
        );
        this.getCompany();
      });
  }

  save() {
    if (this.isValid()) this.update();
    else this.message.showTranslatedWarningMessage('Fields are not valid.');
  }

  private isValid() {
    let result = true;
    if (
      !this.component.request.companyName ||
      !this.component.request.businessEmail ||
      !this.component.request.businessSector ||
      !this.component.request.logo.fileUrl ||
      !this.component.request.extract.fileUrl ||
      !this.component.request.contactPerson.firstName ||
      !this.component.request.contactPerson.lastName ||
      !this.component.request.contactPerson.email ||
      !this.component.request.contactPerson.phoneNumber ||
      !this.component.request.contactPerson.personalId ||
      !this.component.request.contactPerson.position
    )
      result = false;
    return result;
  }
}
