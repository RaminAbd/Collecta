import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {SubscribeComponent} from "./pages/subscribe/subscribe.component";
import {AboutUsComponent} from "./pages/about-us/about-us.component";
import {ServicesComponent} from "./pages/services/services.component";
import {ContactComponent} from "./pages/contact/contact.component";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/main/main.component').then((m) => m.MainComponent),
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'subscribe', component: SubscribeComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'contact', component: ContactComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];
