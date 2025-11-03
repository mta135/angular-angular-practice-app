import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FileUploadService } from '../../services/file-upload.service';
import { EmailMessageModel } from '../../models/email-message.model';
import { CommonModule } from '@angular/common';








@Component({
  selector: 'app-send-email',
  standalone: true,
  imports: [ButtonModule, TableModule, CommonModule],
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})



export class SendEmailComponent {

  constructor(private fileUploadService: FileUploadService) { }
  emailList: EmailMessageModel[] = [];

  selectedFile: File | null = null;
  loading = false;


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


  public myRowClass(status: string) {
    debugger
    if (status.toLowerCase() === 'succes') {
      return 'greenBkg';

    }
    else {
      return 'redBkg';
    }

  }

}




