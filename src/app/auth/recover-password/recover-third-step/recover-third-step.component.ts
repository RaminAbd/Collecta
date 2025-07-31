import { Component, inject } from '@angular/core';
import { InputOtpModule } from 'primeng/inputotp';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { RecoverSecondStepService } from '../recover-second-step/recover-second-step.service';
import { ApplicationMessageCenterService } from '../../../core/services/ApplicationMessageCenter.service';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RecoverThirdStepService } from './recover-third-step.service';

@Component({
  selector: 'app-recover-third-step',
  standalone: true,
  imports: [
    InputOtpModule,
    NgIf,
    RouterLink,
    TranslatePipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './recover-third-step.component.html',
  styleUrl: './recover-third-step.component.scss',
})
export class RecoverThirdStepComponent {
  private service: RecoverThirdStepService = inject(RecoverThirdStepService);
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
  passVisible: boolean = false;
  repeatVisible: boolean = false;
  isSubmitted: boolean = false;
  private fb: FormBuilder = inject(FormBuilder);
  requestForm = this.fb.group({
    password: ['', [Validators.required, Validators.pattern(/^.{6,}$/)]],
    confirmPassword: ['', [Validators.required, Validators.pattern(/^.{6,}$/)]],
  });

  constructor() {
    this.service.component = this;
    this.request = JSON.parse(decodeURIComponent(this.encoded));
  }
  Action() {
    console.log(this.requestForm, this.request);
    this.service.recover()
  }
}
