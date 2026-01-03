
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CurrencyData, CurrencyProvider, CurrencyRates } from '../models/currency-converter/currency-converter-data';

@Injectable({
    providedIn: 'root'
})

export class CurrencyProviderDataService {

    private url: string = "https://www.curs.md/ru/json_convertor_provider";

    constructor(private http: HttpClient) { }

    public GetCurrencyProvidersData(): Observable<CurrencyData> {

        return this.http.get<any[]>(this.url).pipe(

            map(raw => {

                let rawData = raw;
                let currencyData: CurrencyData = new CurrencyData();

                debugger;
                for (let i = 0; i < rawData.length; i++) {
                    let item = rawData[i];

                    let provider = new CurrencyProvider();

                    provider.ProviderName = item.activprim;
                    provider.Date = new Date(item.date);
                    provider.Expire = item.expired;

                    if (item.rates) {

                        for (const key in item.rates) {

                            if (item.rates.hasOwnProperty(key)) {
                                const value = item.rates[key];

                                let rate = new CurrencyRates();
                                rate.Name = key;

                                rate.Buy = parseFloat(value.buy);
                                rate.Sell = parseFloat(value.sell);

                                provider.CurrencyRates.push(rate);
                            }
                        }

                        currencyData.CurrencyProviders.push(provider);
                    }
                }

                return currencyData;
            })
        );
    }

}