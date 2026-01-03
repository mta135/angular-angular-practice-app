
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CurrencyData, CurrencyProvider, CurrencyRates } from '../models/currency-converter/currency-converter-data';
import { it } from 'node:test';

@Injectable({
    providedIn: 'root'
})

export class CurrencyDataService {

    private url: string = "https://www.curs.md/ru/json_convertor_provider";

    constructor(private http: HttpClient) { }

    public GetCurrencyProvidersData(): Observable<CurrencyData> {

        return this.http.get<any[]>(this.url).pipe(

            map(raw => {

                let currencyData: CurrencyData = new CurrencyData();

                for (let providerKey in raw) {

                    let providerRawObj = raw[providerKey];

                    let provider = new CurrencyProvider();
                    provider.ProviderName = providerKey;

                    provider.Date = new Date(providerRawObj.date);
                    provider.Expire = providerRawObj.expired;

                    let ratesObj = providerRawObj.rates;

                    if (ratesObj) {

                        for (let currencyCode in ratesObj) {

                            let rateValues = ratesObj[currencyCode];

                            let rate = new CurrencyRates();

                            rate.Name = currencyCode;
                            rate.Buy = parseFloat(rateValues.buy);
                            rate.Sell = parseFloat(rateValues.sell);

                            provider.CurrencyRates.push(rate);
                        }
                    }

                    currencyData.CurrencyProviders.push(provider);
                }
                return currencyData;
            })
        );

    }

}