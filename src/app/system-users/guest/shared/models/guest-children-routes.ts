import { Route } from '@angular/router';
import {HomeComponent} from "../../../../pages/landing/home/home.component";
import {SubscribeComponent} from "../../../../pages/landing/subscribe/subscribe.component";
import {AboutUsComponent} from "../../../../pages/landing/about-us/about-us.component";
import {ServicesComponent} from "../../../../pages/landing/services/services.component";
import {ContactComponent} from "../../../../pages/landing/contact/contact.component";

export class GuestChildrenRoutes {
  static children: Route[] = [
    { path: 'home', component: HomeComponent },
    { path: 'subscribe', component: SubscribeComponent },
    { path: 'about', component: AboutUsComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'contact', component: ContactComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
  ];
}
