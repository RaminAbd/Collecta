import { Routes } from '@angular/router';
import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {GuestChildrenRoutes} from "./system-users/guest/shared/models/guest-children-routes";
import {SelectRoleComponent} from "./auth/select-role/select-role.component";
import {CompanySignUpComponent} from "./auth/company-sign-up/company-sign-up.component";
import {VerifyCompanyCodeComponent} from "./auth/verify-company-code/verify-company-code.component";
import {RecoverFirstStepComponent} from "./auth/recover-password/recover-first-step/recover-first-step.component";
import {RecoverSecondStepComponent} from "./auth/recover-password/recover-second-step/recover-second-step.component";
import {RecoverThirdStepComponent} from "./auth/recover-password/recover-third-step/recover-third-step.component";

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent, data: { title: 'Sign in' } },
  { path: 'select-role', component: SelectRoleComponent, data: { title: 'Select role' } },
  { path: 'sign-up/business', component: CompanySignUpComponent, data: { title: 'Sign Up' } },
  { path: 'sign-up/business/:req', component: VerifyCompanyCodeComponent, data: { title: 'Sign Up' } },
  { path: 'recover-password/phone', component: RecoverFirstStepComponent, data: { title: 'Recover' } },
  { path: 'recover-password/code/:req', component: RecoverSecondStepComponent, data: { title: 'Recover' } },
  { path: 'recover-password/password/:req', component: RecoverThirdStepComponent, data: { title: 'Recover' } },

  {
    path: '',
    loadComponent: () =>
      import('./system-users/guest/guest.component').then(
        (m) => m.GuestComponent,
      ),
    children: GuestChildrenRoutes.children,
  },
];
