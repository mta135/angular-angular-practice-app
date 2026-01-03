

export class CurrencyData {

    public CurrencyProviders: CurrencyProvider[];

    constructor() {
        this.CurrencyProviders = [];
    }
}


export class CurrencyProvider {

    public Id: number;

    public ProviderName: string;

    public ProviderFullName: string;

    public Date: Date;

    public Expire: boolean;

    public CurrencyRates: CurrencyRates[];

    constructor() {

        this.Id = 0;
        this.ProviderName = "";
        this.ProviderFullName = "";

        this.Date = new Date();
        this.Expire = false;
        this.CurrencyRates = [];
    }
}

export class CurrencyRates {

    public Name: string;

    public FullName: string;

    public Sell: number;

    public Bay: number;

    constructor() {
        this.Name = "";
        this.Bay = 0;

        this.Sell = 0;
        this.FullName = "";
    }
}