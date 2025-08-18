import {FileModel} from "../../../../../core/models/File.model";
import {CompanyContactPersonModel} from "./company-contact-person.model";

export class CompanyRequestModel {
  id: string;
  phoneNumber: string;
  companyName: string;
  companyId: string;
  logo: FileModel = new FileModel();
  extract:FileModel = new FileModel();
  businessSector: number;
  businessType: number;
  contactPerson: CompanyContactPersonModel = new CompanyContactPersonModel();
  verified: boolean;
  instagramLink?: any;
  whatsAppNumber?: any;
  facebookLink?: any;
  telegramLink?: any;
  businessEmail?: any;
}
