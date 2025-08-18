import {Component, inject} from '@angular/core';
import {CompanyProfileService} from "./company-profile.service";
import {CompanyRequestModel} from "./shared/models/company-request.model";
import {FormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";

@Component({
  selector: 'app-company-profile',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    DropdownModule,
    NgIf
  ],
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.scss'
})
export class CompanyProfileComponent {
  private service:CompanyProfileService = inject(CompanyProfileService)
  request:CompanyRequestModel = new CompanyRequestModel();
  isSubmitted: boolean = false;
  sectors:any[]=[
    {name:'Activities', value:1},
    {name:'Education', value:2},
    {name:'Property', value:3},
    {name:'Other', value:4},
  ];
  constructor() {
    this.service.component = this;
    this.service.getCompany()
  }

  getImage(e: any) {
    this.request.logo.fileLoading = true;
    this.service.getFile(e, (resp: any) => {
      this.request.logo = resp.data;
      this.request.logo.fileLoading = false;
      this.request.logo.isValid = true;
      this.request.logo.fakeFile = null;
    });
  }

  getFile(e: any) {
    this.request.extract.fileLoading = true;
    this.service.getFile(e, (resp: any) => {
      this.request.extract = resp.data;
      this.request.extract.fileLoading = false;
      this.request.extract.isValid = true;
      this.request.extract.fakeFile = null;
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
    console.log(this.request);
    this.isSubmitted = true;
    this.service.save()
  }
}
