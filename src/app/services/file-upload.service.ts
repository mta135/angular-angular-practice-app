import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailMessageModel } from '../models/email/email-message.model';

@Injectable({
    providedIn: 'root'
})

export class FileUploadService {

    private readonly apiUrl = 'https://localhost:7147/api/FileUpload/Upload';

    constructor(private http: HttpClient) { }

    getEmailDataFromTemplate(file: File): Observable<EmailMessageModel[]> {

        const formData = new FormData();
        formData.append('file', file, file.name);

        return this.http.post<EmailMessageModel[]>(this.apiUrl, formData);
    }

    private processEmailUrl = 'https://localhost:7147/api/ProcessEmail';

    sendEmails(data: any): Observable<any> {
        return this.http.post(this.processEmailUrl, data);
    }


}