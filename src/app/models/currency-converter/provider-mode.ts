import { ThLargeIcon } from "primeng/icons";

export class CurrencyProvider {
    public Name: string;

    public code: string;

    constructor() {

        this.Name = ""
        this.code = "";
    }
}


export class CurrencyRates {
    public Name: string;

    public Code: string;

    public Sell: number;

    public Buy: number;

    constructor() {
        this.Code = "";
        this.Name = "";

        this.Sell = 0;
        this.Buy = 0;

    }
}