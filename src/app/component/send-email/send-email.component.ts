import { Component, OnInit, TRANSLATIONS } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FileUploadService } from '../../services/file-upload.service';
import { EmailMessageModel } from '../../models/email-message.model';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification-service';
import { HttpClient } from '@microsoft/signalr';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
import { NotificationPayload } from '../../models/notification-payload.model';

@Component({
  selector: 'app-send-email',
  standalone: true,
  imports: [ButtonModule, TableModule, CommonModule],
  providers: [NotificationService],
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

  constructor(

    private notificationService: NotificationService,
    private fileUploadService: FileUploadService

  ) { }


  //#region  events

  ngOnInit(): void {

    this.subscription = this.notificationService.notifications$.subscribe(items => {
      this.notifications = items;

      items.forEach(x => {
        console.log('_Email:', x.email);
        console.log('_Succes:', x.isSended);
        console.log('_Mesaj:', x.message);
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

    this.fileUploadService.getEmailDataFromTemplate(file).subscribe({
      next: (emails) => {
        this.emailList = emails;

        if (!this.emailList.some(x => Boolean(x.error?.trim()))) {
          this.hasErrors = false;
        }

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

      const payload = {
        emails: this.emailList,
        connectionId: connectionId
      };

      console.log('Se trimite cererea HTTP la /api/ProcessEmail...', payload);

      await firstValueFrom(this.fileUploadService.sendEmails(payload));

      console.log('Cererea HTTP a fost trimisă. Se așteaptă notificări...');

    } catch (error) {

      console.error('A eșuat întregul proces:', error);
      alert('A apărut o eroare. Verificați consola.');

    } finally {

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




