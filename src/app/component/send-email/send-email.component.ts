import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FileUploadService } from '../../services/file-upload.service';
import { EmailMessageModel } from '../../models/email-message.model';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification-service';
import { HttpClient } from '@microsoft/signalr';
import { firstValueFrom, Observable } from 'rxjs';








@Component({
  selector: 'app-send-email',
  standalone: true,
  imports: [ButtonModule, TableModule, CommonModule],
  providers: [NotificationService],
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})



export class SendEmailComponent implements OnInit {

  constructor(

    private notificationService: NotificationService,
    private fileUploadService: FileUploadService

  ) { }


  notifications$: Observable<string[]> | undefined;
  emailsToProcess = ['test1@example.com', 'test2@example.com',
    'test3@example.com', 'test1@example.com', 'test2@example.com', 'test3@example.com', 'test1@example.com', 'test2@example.com', 'test3@example.com',
    'test1@example.com', 'test2@example.com', 'test3@example.com'];

  emailList: EmailMessageModel[] = [];

  selectedFile: File | null = null;
  loading = false;
  isSending = false;


  //#region  events

  ngOnInit(): void {
    this.notifications$ = this.notificationService.notifications$;
  }

  // ngOnDestroy(): void {
  //   this.notificationService.stopConnection();
  // }

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


    this.loading = true;
    this.fileUploadService.getEmailDataFromTemplate(file).subscribe({

      next: (emails) => {

        this.emailList = emails;
        this.loading = false;
        console.log(' Lista emailuri:', emails);

      },
      error: (err) => {

        console.error('Eroare upload:', err);
        this.loading = false;
      }
    });

  }


  async processEmails(): Promise<void> {

    if (this.isSending) return;
    this.isSending = true;

    try {
      const connectionId = await this.notificationService.initializeConnection();

      if (!connectionId) {
        throw new Error("Nu s-a putut obține ID-ul de conexiune SignalR.");
      }
      console.log('Conexiune stabilită. ID:', connectionId);


      const payload = {
        emails: this.emailsToProcess,
        connectionId: connectionId
      };

      console.log('Se trimite cererea HTTP la /api/ProcessEmail...', payload);

      await firstValueFrom(this.fileUploadService.sendEmails(payload));

      console.log('Cererea HTTP a fost trimisă. Se așteaptă notificări...');

    } catch (error) {

      console.error('A eșuat întregul proces:', error);
      alert('A apărut o eroare. Verificați consola.');

    } finally {

      this.isSending = false;

    }
  }


  public myRowClass(status: string) {

    if (status) {

      if (status.toLowerCase() === 'succes') {
        return 'greenBkg';
      }
      else {
        return 'redBkg';
      }
    }

    return '';
  }

}




