import { ApiResponseModel } from "./api-response-model";

export class CurrencyDescription {

    public Code: string

    public Name: string

    public Symbol: string

    constructor() {
        this.Code = '';
        this.Name = '';
        this.Symbol = '';
    }
}

export interface FullCurrencyData {
    exchangeData: ApiResponseModel;
    descriptions: CurrencyDescription[];
}