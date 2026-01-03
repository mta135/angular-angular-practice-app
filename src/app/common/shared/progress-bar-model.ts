export class ProgressBarModel {

    private _totalEmails;
    private _receivedStatuses;

    constructor() {
        this._totalEmails = 0;
        this._receivedStatuses = 0;
    }

    public get TotalEmails() {
        return this._totalEmails;
    }

    public set TotalEmails(value: number) {
        this._totalEmails = value;
    }

    public increment(): void {
        this._receivedStatuses += 1;
    }

    public get UpdatedProgressValue(): number {
        if (this._totalEmails === 0)
            return 0;

        let percent = Math.round((this._receivedStatuses / this._totalEmails) * 100);
        return Math.round(percent);
    }

    public reset(): void {
        this._totalEmails = 0;
        this._receivedStatuses = 0;
    }

    public resetReceivedStatuses(): void {
        this._receivedStatuses = 0;
    }
}

