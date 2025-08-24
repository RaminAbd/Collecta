import { Injectable } from '@angular/core';
import { BaseCrudApiService } from '../../../../../core/services/base-crud.api.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { ApplicationMessageCenterService } from '../../../../../core/services/ApplicationMessageCenter.service';

@Injectable({
  providedIn: 'root',
})
export class InvoicesApiService extends BaseCrudApiService {
  serviceUrl: string = 'Invoices/';

  constructor(http: HttpClient, handler: ApplicationMessageCenterService) {
    super(http, handler);
  }

  Filter(req: any) {
    return this.get(this.serviceUrl + 'Filter', null, req);
  }

  GetSummary(req: any) {
    return this.get(this.serviceUrl + 'get-summary', null, req);
  }

  Pay(req: any) {
    return this.post(this.serviceUrl + 'pay', req);
  }
  PayAll(req: any) {
    return this.post(this.serviceUrl + 'pay-all', req);
  }

  Export(req: any) {
    const headers = new HttpHeaders({
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Type': 'application/json',
    });

    // Convert req object to query parameters
    let params = new HttpParams();
    for (const key in req) {
      if (req.hasOwnProperty(key)) {
        params = params.set(key, req[key]);
      }
    }

    return this.http.get(
      this.BASE_URL + this.serviceUrl + `Export`,
      {
        headers: headers,
        responseType: 'blob',
        params: params
      }
    );
  }
}
