import { ExchangeCurrencyData, Provider } from "../../../models/currency-converter/exchange-currency-data";
import { CurrencyProvider } from "../../../models/currency-converter/provider-mode";

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
}