import { FileModel } from '../../../../../core/models/File.model';
import { SubscriptionModel } from './subscription.model';

export class CustomersRequestModel {
  id: string;
  documents: FileModel[] = [];
  document: FileModel = new FileModel();
  subscriptions: SubscriptionModel[] = [];
  companyId: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  state: number;
  personalId: string;
  email: string;
  additionalPhoneNumber: string;
  instagramLink: string;
  whatsAppNumber: string;
  facebookLink: string;
  telegramLink: string;
  image: FileModel = new FileModel();
  preferredLanguage: string;
}
