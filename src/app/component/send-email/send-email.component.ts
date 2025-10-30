import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';




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

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  selectedFile: File | null = null;


  onFileSelected(event: any): void {
    debugger
    const file: File = event.target.files[0];

    if (file) {
      this.selectedFile = file;
    }
  }


  onUpload(): void {
    if (!this.selectedFile) {
      return; // Nu face nimic dacă nu e selectat niciun fișier
    }

    // 1. Creăm un obiect FormData
    // Acesta este formatul standard pentru trimiterea de fișiere
    const formData = new FormData();

    // 2. Adăugăm fișierul la FormData
    // Primul parametru ('file') este cheia pe care serverul o va căuta.
    // Asigură-te că aceasta corespunde cu ceea ce așteaptă API-ul tău.
    formData.append('file', this.selectedFile, this.selectedFile.name);

    // 3. Trimitem cererea POST către server


  }
}


