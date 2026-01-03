import { ExchangeCurrencyData } from "../../../models/currency-converter/currency-converter-data";

export class CurrencyServiceDataMapper {

    private CurrencyData: ExchangeCurrencyData

    constructor(currencyData: ExchangeCurrencyData) {
        this.CurrencyData = currencyData

    }
}