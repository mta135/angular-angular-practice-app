import { CurrencyProvider, CurrencyRates } from "./provider-mode";

export class ExchangeDataViewMode {

    public Providers: CurrencyProvider[];
    public CurrencyRates: CurrencyRates[];

    public SelectedProvider: CurrencyProvider | null = null;

    constructor() {
        this.Providers = [];
        this.CurrencyRates = [];
        this.SelectedProvider = null;

    }





}