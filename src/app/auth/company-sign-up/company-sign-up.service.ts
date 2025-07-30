import { Injectable } from '@angular/core';
import { ApplicationMessageCenterService } from '../../core/services/ApplicationMessageCenter.service';
import { CompanySignUpComponent } from './company-sign-up.component';
import { CompanySignupRequestModel } from '../shared/models/company-signup-request.model';
import { AuthApiService } from '../shared/services/auth.api.service';

@Injectable({
  providedIn: 'root',
})
export class CompanySignUpService {
  component: CompanySignUpComponent;
  constructor(
    private message: ApplicationMessageCenterService,
    private service: AuthApiService
  ) {}

  validate(req: CompanySignupRequestModel) {
    let result = true;
    if (
      !req.companyName ||
      !req.companyId ||
      !req.phoneNumber ||
      !req.password
    ) {
      this.message.showTranslatedWarningMessage('Fill all fields');
      result = false;
    } else {
      if (req.password !== req.confirmPassword) {
        result = false;
        this.message.showTranslatedWarningMessage('Password mismatch');
      }
    }

    return result;
  }

  exists(req:CompanySignupRequestModel) {
    this.service.Exists(req.phoneNumber).subscribe(resp => {
      if(!resp.data.exists){
        this.component.redirectToCode(req)
      }
      else{
        this.message.showTranslatedWarningMessage('Account already exists');
      }
    })
  }
}
