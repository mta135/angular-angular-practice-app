import { inject, Injectable } from "@angular/core";
import { CurrencyDataRepository } from "../data/repository/currency-data-repository";
import { map, Observable } from "rxjs";
import { ExchangeCurrencyData, Provider, Rates } from "../models/currency-converter/exchange-currency-data";
import { ExhcengeServiceDataMapper } from "../common/mapper/currency-converter-mapper/exchange-service-data-mapper";
import { CurrencyProvider, CurrencyRates } from "../models/currency-converter/provider-mode";

@Injectable({
    providedIn: 'root'
})

export class CurrencyDataService {

    private currencyData: ExchangeCurrencyData = new ExchangeCurrencyData();

    constructor(private repo: CurrencyDataRepository) { }

    public loadCurrencyData(): Observable<void> {
        return this.repo.GetCurrencyProvidersRawData().pipe(

            map(raw => {

                let data = new ExchangeCurrencyData();
                let i = 0;

                for (let providerKey in raw) {
                    let providerRawObj = raw[providerKey];

                    let provider = new Provider();
                    provider.Code = providerKey;
                    provider.Name = ExhcengeServiceDataMapper.SetProviderFullName(provider.Code);
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
                            rate.Name = ExhcengeServiceDataMapper.SetCodeFullName(rate.Code);
                            provider.Rate.push(rate);
                        }
                    }
                    data.Provider.push(provider);
                }

                this.currencyData = data;
            })
        );
    }

    public GetProviders(): CurrencyProvider[] {

        return this.currencyData.Provider.map(p => {
            const cp = new CurrencyProvider();
            cp.code = p.Code;
            cp.Name = p.Name;
            return cp;
        });
    }

    public GetCurrencyRates(code: string): CurrencyRates[] {

        const provider = this.currencyData.Provider.find(x => x.Code === code);
        if (!provider) return [];

        return provider.Rate.map(data => {
            const rate = new CurrencyRates();
            rate.Code = data.Code;
            rate.Name = data.Name;
            rate.Sell = data.Sell;
            rate.Buy = data.Buy;
            return rate;
        });
    }

    public GetDashboardRates(code: string): CurrencyRates[] {
        const all = this.GetCurrencyRates(code);
        const targetCodes = ['EUR', 'USD', 'RON', 'GBP', 'UAH'];

        return all.filter(r => targetCodes.includes(r.Code)).sort((a, b) => targetCodes.indexOf(a.Code) - targetCodes.indexOf(b.Code));
    }

    public GetSelectedProvider(code: string): CurrencyProvider {

        const data = this.currencyData.Provider.find(x => x.Code === code);
        const provider = new CurrencyProvider();

        provider.Name = data?.Name ?? "";
        provider.code = data?.Code ?? "";

        return provider;
    }

    public GetRateByCode(providerCode: string, rateCode: string): CurrencyRates {

        const allRates = this.GetCurrencyRates(providerCode);
        return allRates.find(x => x.Code === rateCode) || new CurrencyRates();
    }
}