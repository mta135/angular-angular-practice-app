import { Component, NgZone, OnInit, TRANSLATIONS } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FileUploadService } from '../../services/file-upload.service';
import { EmailMessageModel } from '../../models/email/email-message.model';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification-service';
import { HttpClient } from '@microsoft/signalr';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
import { NotificationPayload } from '../../models/email/notification-payload.model';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressBarModel } from '../../common/shared/progress-bar-model';
import { EmailProcessRequest } from '../../models/email/email-process-request-model';
import { Dialog } from 'primeng/dialog';
import { FileStatusDirective, ValidationStatus } from '../../directive/file-status.directive';

@Component({
  selector: 'app-send-email',
  standalone: true,
  imports: [ButtonModule, TableModule, CommonModule, ProgressBarModule, Dialog, FileStatusDirective],
  providers: [NotificationService, Dialog],
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})

export class SendEmailComponent implements OnInit {

  emailList: EmailMessageModel[] = [];

  selectedFile: File | null = null;

  hasErrors: boolean = true;

  notifications$: Observable<string[]> | undefined;

  subscription?: Subscription;

  notifications: NotificationPayload[] = [];

  visible: boolean = false;

  myFileStatus: ValidationStatus | null = null;

  public progressbar = new ProgressBarModel();
  constructor(

    private notificationService: NotificationService,
    private fileUploadService: FileUploadService,

  ) { }

  //#region  events

  ngOnInit(): void {

    this.subscription = this.notificationService.notifications$.subscribe(items => {
      debugger;

      this.notifications = items;
      this.progressbar.resetReceivedStatuses();

      items.forEach(item => {
        const row = this.emailList.find(x => x.rowCount === item.rowCount);
        if (row) {

          row.status = item.isSended ? 'Succes' : 'Eroare';
          this.progressbar.increment();
        }
      });

    });
  }

  //#endregion

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.selectedFile = file;
      this.getEmailDataFromTemplate(file);

      event.target.value = null;
    }
  }

  private getEmailDataFromTemplate(file: File): void {

    if (this.emailList.length > 0) {
      this.emailList = [];
    }

    this.progressbar.reset();

    this.fileUploadService.getEmailDataFromTemplate(file).subscribe({
      next: (emails) => {
        this.emailList = emails;

        if (!this.emailList.some(x => Boolean(x.error?.trim()))) {
          this.hasErrors = false;
        }

        this.myFileStatus = {
          isValid: true,
          successText: !this.hasErrors ? 'Fișierul a fost încărcat cu succes și este valid.' : undefined
        };

        this.visible = true;
        this.progressbar.TotalEmails = this.emailList.length;
        console.log(' Lista emailuri:', emails);
      },
      error: (err) => {
        console.error('Eroare upload:', err);
      }
    });
  }

  async processEmails(): Promise<void> {

    try {
      const connectionId = await this.notificationService.initializeConnection();

      if (!connectionId) {
        throw new Error("Nu s-a putut obține ID-ul de conexiune SignalR.");
      }

      console.log('Conexiune stabilită. ID:', connectionId);

      let requestObject = new EmailProcessRequest(this.emailList, connectionId);
      console.log('Se trimite cererea HTTP la /api/ProcessEmail...', requestObject);

      await firstValueFrom(this.fileUploadService.sendEmails(requestObject));

      console.log('Cererea HTTP a fost trimisă. Se așteaptă notificări...');

    } catch (error) {

      console.error('A eșuat întregul proces:', error);
      alert('A apărut o eroare. Verificați consola.');

    } finally {
      this.notificationService.stopConnection();
    }
  }

  public myRowClass(error: string, status: string) {

    let rowCollor: string = '';

    if (status) {
      if (status.toLowerCase() === 'succes') {
        rowCollor = 'greenBkg';
      }
      else {
        rowCollor = 'redBkg';
      }
    }

    if (error) {
      rowCollor = 'redBkg';
    }

    return rowCollor;
  }

}




