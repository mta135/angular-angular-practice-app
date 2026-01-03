
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Data, Provider, Rates } from '../models/currency-converter/currency-converter-data';
import { it } from 'node:test';
import { CurrencyMapper } from '../common/mapper/currency-converter-mapper/curremcy-mapper';

@Injectable({
    providedIn: 'root'
})

export class CurrencyDataService {

    private url: string = "https://www.curs.md/ru/json_convertor_provider";

    constructor(private http: HttpClient) { }

    public GetCurrencyProvidersData(): Observable<Data> {

        return this.http.get<any[]>(this.url).pipe(

            map(raw => {

                let currencyData: Data = new Data();

                for (let providerKey in raw) {

                    let providerRawObj = raw[providerKey];

                    let provider = new Provider();
                    provider.Name = providerKey;

                    provider.Date = new Date(providerRawObj.date);
                    provider.Expire = providerRawObj.expired;

                    let ratesObj = providerRawObj.rates;

                    if (ratesObj) {

                        for (let currencyCode in ratesObj) {

                            let rateValues = ratesObj[currencyCode];

                            let rate = new Rates();

                            rate.Code = currencyCode;
                            rate.Buy = parseFloat(rateValues.buy);
                            rate.Sell = parseFloat(rateValues.sell);

                            rate.Name = CurrencyMapper.SetCodeFullName(rate.Code);

                            provider.Rate.push(rate);
                        }
                    }

                    currencyData.Provider.push(provider);
                }
                return currencyData;
            })
        );

    }

}