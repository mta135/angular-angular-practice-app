export class CurrencyDescription {

    public CurrencyDescriptionDetails: DescriptionDetails;

    constructor() {
        this.CurrencyDescriptionDetails = new DescriptionDetails();
    }
}

export class DescriptionDetails {
    public Code: string

    public Name: string

    public Symbol: string

    constructor() {
        this.Code = '';
        this.Name = '';
        this.Symbol = '';
    }
}