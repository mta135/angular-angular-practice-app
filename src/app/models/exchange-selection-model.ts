import { ExchangeRatesModel } from "./api-response-model";

export interface ExchangeSelection {
    LeftSelectedRate: ExchangeRatesModel | null;

    LeftExchangeRateLabel: string;

    RightSelectedRate: ExchangeRatesModel | null;

    RightExchangeRateLabel: string;

    InputLeftValue: string;

    InputRightValue: string;
}