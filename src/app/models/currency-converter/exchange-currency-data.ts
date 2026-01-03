

export class ExchangeCurrencyData {

    public Provider: Provider[];

    constructor() {
        this.Provider = [];
    }
}


export class Provider {

    public Id: number;

    public Code: string;

    public Name: string;

    public Date: Date;

    public Expire: boolean;

    public Rate: Rates[];

    constructor() {

        this.Id = 0;
        this.Code = "";
        this.Name = "";

        this.Date = new Date();
        this.Expire = false;
        this.Rate = [];
    }
}

export class Rates {

    public Code: string;

    public Name: string;

    public Sell: number;

    public Buy: number;

    constructor() {
        this.Code = "";
        this.Buy = 0;

        this.Sell = 0;
        this.Name = "";
    }
}