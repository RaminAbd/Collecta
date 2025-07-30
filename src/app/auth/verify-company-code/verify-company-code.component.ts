import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CompanySignupRequestModel } from '../shared/models/company-signup-request.model';
import { VerifyCompanyCodeService } from './verify-company-code.service';
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';
import { ApplicationMessageCenterService } from '../../core/services/ApplicationMessageCenter.service';

@Component({
  selector: 'app-verify-company-code',
  standalone: true,
  imports: [
    NgIf,
    PaginatorModule,
    ReactiveFormsModule,
    RouterLink,
    TranslatePipe,
    InputOtpModule,
    FormsModule,
  ],
  templateUrl: './verify-company-code.component.html',
  styleUrl: './verify-company-code.component.scss',
})
export class VerifyCompanyCodeComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService
  );
  private service: VerifyCompanyCodeService = inject(VerifyCompanyCodeService);
  id: any;
  encoded = this.route.snapshot.paramMap.get('req') as string;
  request: CompanySignupRequestModel = new CompanySignupRequestModel();
  loading: boolean = false;
  constructor() {
    this.request = JSON.parse(decodeURIComponent(this.encoded));
    this.service.component = this;
  }

  verify() {
    if (this.request.otpCode) {
      this.service.signup()
    } else {
      this.message.showTranslatedWarningMessage('Otp code is not valid!');
    }
  }
}
