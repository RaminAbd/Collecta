import {Component, inject} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {ToastModule} from "primeng/toast";
import { AppTranslateService } from './core/services/app-translate.service';
import {Title} from "@angular/platform-browser";
import {filter, map, mergeMap} from "rxjs";
import {TranslatePipe} from "@ngx-translate/core";
import {NgClass} from "@angular/common";
import {ConfirmDialog, ConfirmDialogModule} from "primeng/confirmdialog";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, TranslatePipe, NgClass,  ConfirmDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private appTranslate: AppTranslateService = inject(AppTranslateService);
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private titleService: Title = inject(Title);
  constructor() {
    this.appTranslate.registerLanguages();

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap((route) => route.data),
      )
      .subscribe((data) => {
        const title = data['title'] || 'Collecta';
        this.titleService.setTitle(title);
      });
  }
}
