
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { ApiResponseModel as ApiResponseModel, ExchangeRatesModel } from '../models/api-response-model';


@Injectable({
    providedIn: 'root'
})

export class CurrencyService {

    private baseUrl = 'https://open.er-api.com/v6/latest';
    private descUrl = 'https://restcountries.com/v3.1/all?fields=currencies';

    constructor(private http: HttpClient) { }

    GetFullData(): Observable<ApiResponseModel> {
        return this.http.get<ApiResponseModel>(this.baseUrl).pipe(

            map(raw => {

                const formattedRates: ExchangeRatesModel[] = [];
                for (const key in raw.rates) {

                    let rateObject = {} as ExchangeRatesModel;

                    rateObject.Code = key;
                    rateObject.Value = +raw.rates[key];

                    formattedRates.push(rateObject);
                }

                let apiResponse: ApiResponseModel = {

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


    GetCurrencyDetails(): Observable<any> {

        return this.http.get<any>(this.descUrl).pipe(
            map(raw => {
                debugger;

                for (let item of raw) {
                    var values = Object.values(item);
                    console.log(values);
                }
            })
        );

    }
}