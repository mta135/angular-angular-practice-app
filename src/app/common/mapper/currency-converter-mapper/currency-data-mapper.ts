import { ExchangeCurrencyData, Provider } from "../../../models/currency-converter/exchange-currency-data";
import { CurrencyProvider, CurrencyRates } from "../../../models/currency-converter/provider-mode";

export class CurrencyServiceDataMapper {

    private currencyData: ExchangeCurrencyData

    constructor(currencyData: ExchangeCurrencyData) {
        this.currencyData = currencyData
    }

    public GetProviders(): CurrencyProvider[] {

        let currencyProviders: CurrencyProvider[] = [];

        for (let data of this.currencyData.Provider) {
            let provider = new CurrencyProvider();

            provider.Name = data.Name;
            provider.code = data.Code

            currencyProviders.push(provider);
        }

        return currencyProviders;
    }

    public GetCurrencyRates(code: string): CurrencyRates[] {

        let provider = this.currencyData.Provider.find(x => x.Code == code);
        let rates = provider?.Rate || [];
        let currencyRate: CurrencyRates[] = [];

        for (let data of rates) {
            let rate = new CurrencyRates();

            rate.Code = data.Code;
            rate.Name = data.Name;
            rate.Sell = data.Sell;
            rate.Buy = data.Buy

            currencyRate.push(rate);
        }

        return currencyRate;
    }

    public GetInitialData(defaultBank: string) {
        return {
            allProviders: this.GetProviders(),
            defaultRates: this.GetCurrencyRates(defaultBank)
        };
    }


    public GetSelectedProvider(code: string): CurrencyProvider {

        const data = this.currencyData.Provider.find(x => x.Code === code);

        let currencyProvider = new CurrencyProvider();

        currencyProvider.Name = data?.Name ?? "";
        currencyProvider.code = data?.Code ?? "";

        return currencyProvider;
    }


    public GetDashboardRates(code: string): CurrencyRates[] {

        let allCurrencyRate = this.GetCurrencyRates(code);
        const targetCodes = ['EUR', 'USD', 'RON', 'GBP', 'UAH'];

        let rates = allCurrencyRate.filter(rate => targetCodes.includes(rate.Code));

        return rates;
    }


}