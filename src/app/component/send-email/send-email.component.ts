import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-send-email',
  imports: [MatCardModule],
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.scss'
})
export class SendEmailComponent {


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


