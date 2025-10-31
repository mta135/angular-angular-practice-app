import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FileUploadService } from '../../services/file-upload.service';
import { EmailMessageModel } from '../../models/email-message.model';




export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];



@Component({
  selector: 'app-send-email',
  standalone: true,
  imports: [ButtonModule, TableModule],
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})



export class SendEmailComponent {

  constructor(private fileUploadService: FileUploadService) { }
  emailList: EmailMessageModel[] = [];

  dataSource = ELEMENT_DATA;
  selectedFile: File | null = null;
  loading = false;


  onFileSelected(event: any): void {
    debugger
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
}




