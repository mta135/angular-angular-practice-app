
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { ApiResponseModel as ApiResponseModel, ExchangeRatesModel } from '../models/api-response-model';
import { CurrencyDescription, DescriptionDetails } from '../models/currency-description-model';


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


    GetCurrencyDescription(): Observable<CurrencyDescription[]> {
        return this.http.get<any[]>(this.descUrl).pipe(
            map(raw => {

                let currencyDescriptions: CurrencyDescription[] = [];
                debugger

                for (let i = 0; i < raw.length; i++) {

                    let item = raw[i];
                    if (item.currencies) {
                        let keys = Object.keys(item.currencies);

                        for (let j = 0; j < keys.length; j++) {

                            let code = keys[j];
                            let data = item.currencies[code];

                            let description = new CurrencyDescription();
                            let descriptionDetail = new DescriptionDetails();

                            descriptionDetail.Name = code;

                            descriptionDetail.Details.set('name', data.name);
                            descriptionDetail.Details.set('symbol', data.symbol);

                            description.CurrencyDescriptionDetails = descriptionDetail;

                            currencyDescriptions.push(description);
                        }
                    }
                }
                return currencyDescriptions;
            })
        );
    }
}