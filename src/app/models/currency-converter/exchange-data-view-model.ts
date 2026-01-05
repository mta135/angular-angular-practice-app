import { CurrencyProvider, CurrencyRates } from "./provider-mode";

export class ExchangeDataViewMode {

    public Providers: CurrencyProvider[];
    public CurrencyRates: CurrencyRates[];

    public DashBoardRates: CurrencyRates[] | undefined;

    public SelectedProvider: CurrencyProvider | null = null;


    public Euro: number;
    public USD: number;

    public GBP: number;

    public RON: number;

    public UAH: number;

    constructor() {
        this.Providers = [];
        this.CurrencyRates = [];
        this.SelectedProvider = null;

        this.DashBoardRates = [];

        this.Euro = 0;
        this.USD = 0;
        this.GBP = 0;
        this.RON = 0;
        this.UAH = 0;

    }





}