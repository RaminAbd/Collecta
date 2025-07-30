import { Injectable, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root',
})
export class ApplicationMessageCenterService {
  constructor(private messageService: MessageService, private  translate:TranslateService) {}
  handleError(response: any) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: response.error,
      life: 5000,
    });
    return null;
  }
  showSuccessMessage( message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }
  showErrorMessage( message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 5000,
    });
  }

  showWarningMessage(message: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warning',
      detail: message,
      life: 5000,
    });
  }
  showInfoMessage(message: string) {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: message,
    });
  }

  showTranslatedErrorMessage(messageKey: string) {
    var translatedString = this.translate.instant(messageKey);
    var translatedHeader = this.translate.instant('Error');
    this.showErrorMessage( translatedString);
  }

  showTranslatedSuccessMessage(messageKey: string) {
    var translatedString = this.translate.instant(messageKey);
    var translatedHeader = this.translate.instant('Success');
    this.showSuccessMessage(translatedString);
  }

  showTranslatedWarningMessage(messageKey: string) {
    var translatedString = this.translate.instant(messageKey);
    var translatedHeader = this.translate.instant('Warning');
    this.showWarningMessage(translatedString);
  }

  showTranslatedInfoMessage(messageKey: string) {
    var translatedString = this.translate.instant(messageKey);
    var translatedHeader = this.translate.instant('Info');
    this.showInfoMessage( translatedString);
  }
}
