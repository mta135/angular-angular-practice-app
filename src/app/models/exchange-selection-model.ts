import { ExchangeRatesModel } from "./api-response-model";

export interface ExchangeSelection {
    LeftSelectedRate: ExchangeRatesModel | null;

    RightSelectedRate: ExchangeRatesModel | null;
}