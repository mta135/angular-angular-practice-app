import { ExchangeCurrencyData } from "../../../models/currency-converter/exchange-currency-data";

export class CurrencyServiceDataMapper {

    private CurrencyData: ExchangeCurrencyData

    constructor(currencyData: ExchangeCurrencyData) {
        this.CurrencyData = currencyData

    }
}