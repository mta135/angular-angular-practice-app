import { ExchangeRatesModel } from "./api-response-model";

export interface ExchangeSelection {
    LeftSelectedRate: ExchangeRatesModel | null;

    LeftDescription: string;

    RightSelectedRate: ExchangeRatesModel | null;

    RightDescription: string;
}