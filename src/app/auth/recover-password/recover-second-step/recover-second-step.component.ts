import { Component, inject } from '@angular/core';
import { InputOtpModule } from 'primeng/inputotp';
import { NgIf } from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ApplicationMessageCenterService } from '../../../core/services/ApplicationMessageCenter.service';
import { CompanySignupRequestModel } from '../../shared/models/company-signup-request.model';
import { VerifyCompanyCodeService } from '../../verify-company-code/verify-company-code.service';
import { FormsModule } from '@angular/forms';
import { RecoverSecondStepService } from './recover-second-step.service';

@Component({
  selector: 'app-recover-second-step',
  standalone: true,
  imports: [InputOtpModule, NgIf, RouterLink, TranslatePipe, FormsModule],
  templateUrl: './recover-second-step.component.html',
  styleUrl: './recover-second-step.component.scss',
})
export class RecoverSecondStepComponent {
  private service: RecoverSecondStepService = inject(RecoverSecondStepService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService
  );
  id: any;
  encoded = this.route.snapshot.paramMap.get('req') as string;
  request: { phoneNumber: string; otpCode: string } = {
    phoneNumber: '',
    otpCode: '',
  };
  loading: boolean = false;
  constructor() {
    this.service.component = this;
    this.request = JSON.parse(decodeURIComponent(this.encoded));
    this.service.sendVerificationCode();
  }

  verify() {
    if (this.request.otpCode) {
      this.loading = true;
      const serialized = encodeURIComponent(JSON.stringify(this.request));
      this.router.navigate(['recover-password/password', serialized]);
    } else {
      this.message.showTranslatedWarningMessage('Otp code is not valid!');
    }
  }

  sendCode() {
    this.service.sendVerificationCode();
  }
}
