import { Injectable } from '@angular/core';
import {BaseCrudApiService} from "../../../../../core/services/base-crud.api.service";
import {ApplicationMessageCenterService} from "../../../../../core/services/ApplicationMessageCenter.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProvidedServicesApiService  extends BaseCrudApiService {
  serviceUrl: string = 'ProvidedServices/';

  constructor(http: HttpClient, handler: ApplicationMessageCenterService) {
    super(http, handler);
  }

  getAllByCompanyId(companyId:string){
    return this.get(this.serviceUrl + 'getAll/', companyId).toPromise()
  }

  Activate(req:any){
    return this.post(this.serviceUrl + 'activate', req).toPromise()
  }
  Deactivate(req:any){
    return this.post(this.serviceUrl + 'deactivate', req).toPromise()
  }
}
