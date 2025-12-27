import { ExchangeRatesModel } from "./api-response-model";

export interface ExchangeSelection {
    LeftSelectedRate: ExchangeRatesModel | null;

    LeftExchangeRate: string;

    RightSelectedRate: ExchangeRatesModel | null;

    RightExchangeRate: string;

    InputLeftValue: string;

    InputRightValue: string;
}