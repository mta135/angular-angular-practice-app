
import { ExchangeCurrencyData, Provider, Rates } from "../../models/currency-converter/exchange-currency-data";
import { ExhcengeServiceDataMapper } from "../../common/mapper/currency-converter-mapper/exchange-service-data-mapper";
import { Injectable } from "@angular/core";

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class CurrencyDataRepository {

    private url: string = "https://www.curs.md/ru/json_convertor_provider";

    constructor(private http: HttpClient) { }

    GetCurrencyProvidersRawData(): Observable<any> {
        return this.http.get<any>(this.url);
    }


}