import { inject, Injectable } from '@angular/core';
import { VerifyCompanyCodeComponent } from './verify-company-code.component';
import { CompaniesApiService } from '../shared/services/companies.api.service';
import { SignInService } from '../sign-in/sign-in.service';
import { AuthApiService } from '../shared/services/auth.api.service';
import { ApplicationMessageCenterService } from '../../core/services/ApplicationMessageCenter.service';
import { VerificationApiService } from '../shared/services/verification.api.service';

@Injectable({
  providedIn: 'root',
})
export class VerifyCompanyCodeService {
  component: VerifyCompanyCodeComponent;
  private service: CompaniesApiService = inject(CompaniesApiService);
  private verificationService: VerificationApiService = inject(
    VerificationApiService
  );
  private signInService: SignInService = inject(SignInService);
  private apiService: AuthApiService = inject(AuthApiService);
  private message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService
  );
  constructor() {}

  sendVerificationCode() {
    let req = {
      phoneNumber: this.component.request.phoneNumber,
    };
    this.verificationService.SendVerification(req).subscribe((resp) => {});
  }

  signup() {
    let req = structuredClone(this.component.request);
    req.otpCode = Number(req.otpCode);
    console.log(req);
    this.service.Signup(req).subscribe((resp) => {
      console.log(resp);
      if (resp) {
        if (resp.succeeded) {
          this.signin();
        }
      }
    });
  }

  signin() {
    let req = {
      username: this.component.request.companyId,
      password: this.component.request.password,
      remember: true,
    };
    this.apiService.SignIn(req).subscribe((resp: any) => {
      this.component.loading = false;
      if (!resp.succeeded) {
        this.message.showErrorMessage(resp.error);
      } else {
        this.signInService.setToStorage(resp.data, req);
        this.signInService.navigateByRole(resp.data);
      }
    });
  }
}
