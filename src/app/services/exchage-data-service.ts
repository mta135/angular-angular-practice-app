
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ExchangeCurrencyData, Provider, Rates } from '../models/currency-converter/exchange-currency-data';
import { it } from 'node:test';
import { ExchangeDescriptionsEnum } from '../enums/currencty-converter/exchange-descriptions-enum';

@Injectable({
    providedIn: 'root'
})

export class CurrencyDataService {

    private url: string = "https://www.curs.md/ru/json_convertor_provider";

    constructor(private http: HttpClient) { }

    public GetCurrencyProvidersData(): Observable<ExchangeCurrencyData> {

        return this.http.get<any[]>(this.url).pipe(

            map(raw => {

                let currencyData: ExchangeCurrencyData = new ExchangeCurrencyData();

                let i = 0;
                for (let providerKey in raw) {

                    let providerRawObj = raw[providerKey];

                    let provider = new Provider();
                    provider.Code = providerKey;
                    provider.Name = ExchangeDescriptionsEnum.SetProviderFullName(provider.Code);

                    provider.Date = new Date(providerRawObj.date);
                    provider.Expire = providerRawObj.expired;
                    provider.Id = i++;

                    let ratesObj = providerRawObj.rates;

                    if (ratesObj) {

                        for (let currencyCode in ratesObj) {

                            let rateValues = ratesObj[currencyCode];

                            let rate = new Rates();

                            rate.Code = currencyCode;
                            rate.Buy = parseFloat(rateValues.buy);
                            rate.Sell = parseFloat(rateValues.sell);

                            rate.Name = ExchangeDescriptionsEnum.SetCodeFullName(rate.Code);

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