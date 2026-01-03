
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CurrencyData } from '../models/currency-converter/currency-converter-data';

@Injectable({
    providedIn: 'root'
})
export class CurrencyConverterDataService {

    private url: string = "https://www.curs.md/ru/json_convertor_provider";

    constructor(private http: HttpClient) { }




    public GetCurrencyProvidersData(): Observable<CurrencyData> {

        return this.http.get<CurrencyData>(this.url).pipe(

            map(raw => {

                debugger;

                let currencyData: CurrencyData = new CurrencyData();
                var value = raw;

                return currencyData;

            })




        );
    }

}