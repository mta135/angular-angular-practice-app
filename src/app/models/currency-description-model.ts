import { ApiResponseModel } from "./api-response-model";

export class CurrencyDescription {

    public Code: string

    public Description: string

    public Symbol: string

    constructor() {
        this.Code = '';
        this.Description = '';
        this.Symbol = '';
    }
}

export interface FullCurrencyData {
    exchangeData: ApiResponseModel;
    descriptions: CurrencyDescription[];
}