
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { EmailMessageModel } from '../models/email-message.model';
import { ApiResponseModel as CurrencyFullDataApiResponseModel } from '../models/api-response-model';
import { ExchangeRatesModel } from '../models/exchange-rates-model';

@Injectable({
    providedIn: 'root'
})

export class CurrencyService {

    private baseUrl = 'https://open.er-api.com/v6/latest';

    constructor(private http: HttpClient) { }

    GetFullData(): Observable<CurrencyFullDataApiResponseModel> {
        return this.http.get<CurrencyFullDataApiResponseModel>(this.baseUrl).pipe(

            map(raw => {

                const formattedRates: ExchangeRatesModel[] = [];
                for (const key in raw.rates) {

                    let rateObject = {} as ExchangeRatesModel;

                    rateObject.Code = key;
                    rateObject.Value = +raw.rates[key];

                    formattedRates.push(rateObject);
                }

                let apiResponse: CurrencyFullDataApiResponseModel = {

                    result: raw.result,
                    base_code: raw.base_code,
                    time_last_update_utc: raw.time_last_update_utc,
                    time_next_update_utc: raw.time_next_update_utc,
                    rates: formattedRates
                }

                return apiResponse;
            })
        );
    }
}