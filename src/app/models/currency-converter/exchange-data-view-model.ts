import { CurrencyProvider, CurrencyRates } from "./provider-mode";

export class ExchangeDataViewMode {

    public Providers: CurrencyProvider[];
    public CurrencyRates: CurrencyRates[];

    public DashBoardRates: CurrencyRates[] | undefined;

    public SelectedProvider: CurrencyProvider | null = null;

    public LeftSelectedRate: CurrencyRates;

    public RightSelectedRate: CurrencyRates;

    public SelectedProviderLabel: string;

    public LeftInputRate: string;

    public RigthInputRate: string

    public IsDisabled: boolean;


    constructor() {
        this.Providers = [];
        this.CurrencyRates = [];

        this.SelectedProvider = null;
        this.DashBoardRates = [];

        this.LeftSelectedRate = new CurrencyRates();

        this.RightSelectedRate = new CurrencyRates();

        this.SelectedProviderLabel = "";

        this.IsDisabled = false;

        this.LeftInputRate = "";
        this.RigthInputRate = "";
    }





}