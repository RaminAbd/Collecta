import { FileModel } from '../../../../../core/models/File.model';

export class ProvidedServicesRequestModel {
  id: string;
  companyId: string;
  name: string;
  image: FileModel = new FileModel();
  price: number;
  active: boolean;
  unit: string;
  reminderInDays: number;
}
