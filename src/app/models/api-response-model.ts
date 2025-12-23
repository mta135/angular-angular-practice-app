

export interface ApiResponseModel {

    result: string;

    base_code: string;

    time_last_update_utc: string;

    time_next_update_utc: string;

    rates: ExchangeRatesModel[];
}

export interface ExchangeRatesModel {
    Code: string;

    Value: number;
}