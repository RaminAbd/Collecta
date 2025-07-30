import { Routes } from '@angular/router';
import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {GuestChildrenRoutes} from "./system-users/guest/shared/models/guest-children-routes";
import {SelectRoleComponent} from "./auth/select-role/select-role.component";
import {CompanySignUpComponent} from "./auth/company-sign-up/company-sign-up.component";
import {VerifyCompanyCodeComponent} from "./auth/verify-company-code/verify-company-code.component";

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent, data: { title: 'Sign in' } },
  { path: 'select-role', component: SelectRoleComponent, data: { title: 'Select role' } },
  { path: 'sign-up/business', component: CompanySignUpComponent, data: { title: 'Sign Up' } },
  { path: 'sign-up/business/:req', component: VerifyCompanyCodeComponent, data: { title: 'Sign Up' } },
  {
    path: '',
    loadComponent: () =>
      import('./system-users/guest/guest.component').then(
        (m) => m.GuestComponent,
      ),
    children: GuestChildrenRoutes.children,
  },
];
