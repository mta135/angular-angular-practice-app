export class CurrencyDescription {

    public CurrencyDescriptionDetails: DescriptionDetails;

    constructor() {
        this.CurrencyDescriptionDetails = new DescriptionDetails();
    }
}

export class DescriptionDetails {
    public Name: string
    public Details: Map<string, string>;
    constructor() {

        this.Name = '';
        this.Details = new Map<string, string>();
    }
}