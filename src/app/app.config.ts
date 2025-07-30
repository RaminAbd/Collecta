import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {LanguageService} from "./core/services/language.service";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TokenInterceptor} from "./core/interceptors/token.interceptor";
import {RefreshTokenInterceptor} from "./core/interceptors/refresh-token.interceptor";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'i18n/', '.json');
}

export function initializeApp(
  languageService: LanguageService,
): () => Promise<any> {
  return () => languageService.setLangs().toPromise();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    DialogService,
    ConfirmationService,
    MessageService,
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ]),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [LanguageService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true,
    },
  ],
};
