import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../core/services/base.api.service';
import { HttpClient } from '@angular/common/http';
import { ApplicationMessageCenterService } from '../../../core/services/ApplicationMessageCenter.service';

@Injectable({
  providedIn: 'root',
})
export class VerificationApiService extends BaseApiService {
  serviceUrl = 'OtpCodes/';
  constructor(http: HttpClient, handler: ApplicationMessageCenterService) {
    super(http, handler);
  }
  SendVerification(req: any) {
    return this.post(this.serviceUrl + 'send', req);
  }
}
