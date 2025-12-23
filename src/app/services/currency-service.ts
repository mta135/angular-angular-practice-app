
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailMessageModel } from '../models/email-message.model';
import { ApiResponseModel } from '../models/api-response-model';

@Injectable({
    providedIn: 'root'
})

export class CurrencyService {

    private baseUrl = 'https://open.er-api.com/v6/latest';

    constructor(private http: HttpClient) { }

    GetCurrencyResponse(): Observable<ApiResponseModel> {
        return this.http.get<ApiResponseModel>(`${this.baseUrl}`);
    }

}