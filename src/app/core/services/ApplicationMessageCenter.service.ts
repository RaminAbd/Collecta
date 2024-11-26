import { Injectable, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ApplicationMessageCenterService {
  constructor(private messageService: MessageService) {}
  handleError(response: any) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: response.error,
      life: 5000,
    });
    return null;
  }
  showSuccessMessage(header: string, message: string) {
    this.messageService.add({
      severity: 'success',
      summary: header,
      detail: message,
    });
  }
  showErrorMessage(header: string, message: string) {
    this.messageService.add({
      severity: 'error',
      summary: header,
      detail: message,
      life: 5000,
    });
  }

  showWarningMessage(header: string, message: string) {
    this.messageService.add({
      severity: 'warn',
      summary: header,
      detail: message,
      life: 5000,
    });
  }
  showInfoMessage(header: string, message: string) {
    this.messageService.add({
      severity: 'info',
      summary: header,
      detail: message,
    });
  }
}
